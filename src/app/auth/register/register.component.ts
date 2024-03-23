import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {hashPassword} from "../../shared/helpers.service";
import {AuthService} from "../auth.service";
import {catchError, Subject, takeUntil, tap, throwError} from "rxjs";
import {UserRegisterRequest} from "../models";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  registerForm!: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initRegisterForm();
  }

  private initRegisterForm(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, this.forbiddenUsernameCharactersValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required] // Add the validator here
    }, {validators: this.passwordMatchValidator});
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      try {
        const hashedPassword = await hashPassword(this.registerForm.value.password);
        const payloadBody: UserRegisterRequest = {
          username: this.registerForm.value.username,
          password: hashedPassword,
          email: this.registerForm.value.email,
        }
        this.authService.register(payloadBody).pipe(
          takeUntil(this.destroy$),
          catchError((error) => {
            // Handle error
            console.error('An error occurred:', error);
            return throwError(error); // Rethrow the error to be caught by the subscriber
          })
        ).subscribe();
      } catch (error) {
        console.error('Error registering user:', error);
        throw new Error('Registration failed');
      }
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  getPasswordStrength(): string {
    // Logic to calculate password strength
    // You can use a library like zxcvbn for this
    // For simplicity, let's assume a fixed strength level for now
    const strengthLevel = 3; // 0: Weak, 1: Fair, 2: Good, 3: Strong
    return ['Weak', 'Fair', 'Good', 'Strong'][strengthLevel];
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl) => {
    const password = control.get('password');
    const repeatPassword = control.get('repeatPassword');
    if (password && repeatPassword && repeatPassword.value) {
      if (password.value !== repeatPassword.value) {
        repeatPassword.setErrors({passwordMismatch: true});
      } else {
        repeatPassword.setErrors(null);
      }
    }

    return null;
  };

  forbiddenUsernameCharactersValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbiddenCharacters = /[@#$%^&*()_+={}[\]:;<>?,./\\|'`~]/;
      if (forbiddenCharacters.test(control.value)) {
        return {forbiddenCharacters: true};
      }
      return null;
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}

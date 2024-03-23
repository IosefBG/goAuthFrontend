import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {hashPassword} from "../../shared/helpers.service";
import {UserLoginRequest} from "../models";
import {catchError, Subject, takeUntil, throwError} from "rxjs";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  loginForm!: FormGroup;
  hide = true; // Initially hide the password

  constructor(private fb: FormBuilder, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  private initLoginForm(): void {
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const hashedPassword = await hashPassword(this.loginForm.value.password);
        const payloadBody: UserLoginRequest = {
          identifier: this.loginForm.value.identifier,
          password: hashedPassword,
        }
        this.authService.login(payloadBody).pipe(
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
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

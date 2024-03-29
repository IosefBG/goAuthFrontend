import {Component, OnDestroy, OnInit} from '@angular/core';
import {StateService} from "../../state.service";
import {ToastService} from "../../toast.service";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";
import {catchError, Subject, takeUntil, tap, throwError} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  loading: boolean = false;

  navLinks: { path: string, displayName: string }[] = [
    {path: '/home', displayName: 'Home'},
    {path: '/resumeMaker', displayName: 'Resume Maker'},
  ];
  isLoggedIn: boolean = false;

  constructor(private stateService: StateService, private toastService: ToastService, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.stateService.loading$.subscribe(loading => this.loading = loading);
    this.stateService.loggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.toastService.showToast('success', 'Te-ai logat cu succes!')
        this.isLoggedIn = loggedIn || localStorage.getItem(environment.STORAGE_TOKEN) !== null
        this.router.navigate(['/profile']);
      }
      this.isLoggedIn = loggedIn || localStorage.getItem(environment.STORAGE_TOKEN) !== null
    });
  }

  logout() {
    this.authService.logout().pipe(
      takeUntil(this.destroy$),
      tap((response: any) => {
        if (response.status === 200) {
          localStorage.removeItem(environment.STORAGE_TOKEN)
          localStorage.removeItem(environment.STORAGE_USER_DATA)
          this.isLoggedIn = false
          this.toastService.showToast('success', 'Te-ai delogat cu succes!')
          this.router.navigate(['/login']);
        }
      }),
      catchError((error) => {
        // Handle error
        this.toastService.showToast('error', JSON.stringify(error))
        return throwError(error); // Rethrow the error to be caught by the subscriber
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

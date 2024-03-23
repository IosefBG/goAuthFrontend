import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  private loggedIn: boolean | null = null;

  constructor() {
    // Set initial value of loggedIn
    // this.setLoggedIn(false);
  }

  setLoading(loading: boolean) {
    this.loadingSubject.next(loading);
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn;
    this.loggedInSubject.next(loggedIn);
  }

  isLoggedIn(): boolean | null {
    return this.loggedIn;
  }

}

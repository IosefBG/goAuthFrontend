import {Component, OnInit} from '@angular/core';
import {StateService} from "../../state.service";
import {ToastService} from "../../toast.service";
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loading: boolean = false;

  navLinks: { path: string, displayName: string }[] = [
    {path: '/home', displayName: 'Home'},
  ];
  isLoggedIn: boolean = false;

  constructor(private stateService: StateService, private toastService: ToastService, private router: Router) {
  }

  ngOnInit() {
    this.stateService.loading$.subscribe(loading => this.loading = loading);
    this.stateService.loggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.toastService.showToast('success', 'Te-ai logat cu succes!')
        this.router.navigate(['/profile']);
      }
      this.isLoggedIn = loggedIn || localStorage.getItem(`${environment.STORAGE_ITEM_NAME}token`) !== null
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {MatTableDataSource} from "@angular/material/table";
import {AuthService} from "../auth.service";
import {SessionsResponse} from "../models";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  sessions: MatTableDataSource<any> = new MatTableDataSource<any>(); // MatTableDataSource for sessions data
  displayedColumns = ['number', 'IPAddress', 'location', 'remove']; // Columns to display in the table

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.getSessions().subscribe((response) => {
      if (response.status === 200 && response.body) {
        this.sessions = new MatTableDataSource<SessionsResponse>(response.body);
      }
    });
    const userData = localStorage.getItem(`${environment.STORAGE_ITEM_NAME}userData`);
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      // Handle case where user data is not found in localStorage
      console.error('User data not found in localStorage');
    }
    console.log(this.user)
  }

  revokeSession(sessionId: number): void {
    //TODO here should pass the sessionId to be revoked, do another endpoint
    this.authService.revokeSession().subscribe(() => {
      // After successful revocation, update the table by fetching sessions again
      // this.authService.getSessions().subscribe((sessions: any[]) => {
      //   this.sessions = new MatTableDataSource<any>(sessions);
      // });
    });
  }
}

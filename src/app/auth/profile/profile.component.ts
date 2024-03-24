import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {MatTableDataSource} from "@angular/material/table";
import {AuthService} from "../auth.service";
import {SessionsResponse, UserData} from "../models";
import {catchError, Subject, takeUntil, tap, throwError} from "rxjs";
import {ToastService} from "../../shared/toast.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  userData!: UserData;
  sessionsDataSource: MatTableDataSource<any> = new MatTableDataSource<any>(); // MatTableDataSource for sessionsDataSource data
  displayedColumns = [
    {field: 'number', header: 'No.'},
    {field: 'ip_address', header: 'IP Address'},
    {field: 'location', header: 'Location'},
    {field: 'device_connected', header: 'Dispozitiv'},
    {field: 'browser_used', header: 'Browser'},
    {field: 'updated_date_at', header: 'Updated At'},
    {field: 'created_date_at', header: 'Created At'},
    {field: 'remove', header: ''} // Remove button column
  ];

  constructor(private authService: AuthService, private toastService: ToastService) {
  }

  ngOnInit() {
    this.authService.getSessions().subscribe((response) => {
      if (response.status === 200 && response.body) {
        this.sessionsDataSource = new MatTableDataSource<SessionsResponse>(response.body);
      }
    });
    if (localStorage.getItem(environment.STORAGE_TOKEN)) {
      const userData = localStorage.getItem(environment.STORAGE_USER_DATA);
      if (userData) {
        this.userData = JSON.parse(userData);
      } else {
        this.toastService.showToast('error', 'Something went wrong')
      }
    }
  }

  revokeSession(sessionId: number): void {
    this.authService.revokeSession(sessionId).pipe(
      takeUntil(this.destroy$),
      tap((response: any) => {
        if (response.status === 200) {
          this.toastService.showToast('success', 'Sesiunea a fost stearsa cu succes!')
          const index = this.sessionsDataSource.data.findIndex(session => session.id === sessionId);
          if (index !== -1) {
            const newData = [...this.sessionsDataSource.data];
            newData.splice(index, 1);
            this.sessionsDataSource = new MatTableDataSource<any>(newData);
          }
        }
      }),
      catchError((error) => {
        // Handle error
        this.toastService.showToast('error', error)

        console.error('An error occurred:', error);
        return throwError(error); // Rethrow the error to be caught by the subscriber
      })
    ).subscribe();
  }

  getColumnNames(): string[] {
    return this.displayedColumns.map(column => column.field);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

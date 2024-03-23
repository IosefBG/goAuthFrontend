import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private readonly DURATION_SUCCESS = 5000; // 5 seconds
  private readonly DURATION_ERROR = 10000; // 10 seconds
  private readonly DURATION_INFO = 7000;   // 7 seconds

  constructor(private snackBar: MatSnackBar) {
  }

  showToast(type: 'success' | 'error' | 'info', message: string): void {
    let panelClass: string[];
    let duration: number;

    switch (type) {
      case 'success':
        panelClass = ['success-toast'];
        duration = this.DURATION_SUCCESS;
        break;
      case 'error':
        panelClass = ['error-toast'];
        duration = this.DURATION_ERROR;
        break;
      case 'info':
        panelClass = ['info-toast'];
        duration = this.DURATION_INFO;
        break;
      default:
        panelClass = [];
        duration = 0;
    }

    this.snackBar.open(message, 'Close', {
      duration,
      panelClass
    });
  }
}

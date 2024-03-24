import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(environment.STORAGE_TOKEN);

    if (token) {
      let headers: Record<string, string> = {};
      headers['Authorization'] = `Bearer ${token}`;

      const authReq = req.clone({
        setHeaders: headers,
      });
      return next.handle(authReq);
    }

    return next.handle(req);
  }
}

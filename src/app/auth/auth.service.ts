import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {environment} from "../../environments/environment";
import {AuthResponse, SessionsResponse, UserLoginRequest, UserRegisterRequest} from "./models";
import {StateService} from "../shared/state.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.api;

  constructor(private http: HttpClient, private stateService: StateService) {
  }

  register(payload: UserRegisterRequest): Observable<HttpResponse<AuthResponse>> {
    this.stateService.setLoading(true);
    return this.http.post<any>(`${this.apiUrl}/register`, payload, {observe: 'response'}).pipe(
      tap(response => {
        this.handleResponse(response)
      })
    );
  }

  login(payload: UserLoginRequest): Observable<HttpResponse<AuthResponse>> {
    this.stateService.setLoading(true);
    return this.http.post<any>(`${this.apiUrl}/login`, payload, {observe: 'response'}).pipe(
      tap(response => {
        this.handleResponse(response)
      })
    );
  }

  handleResponse(response: HttpResponse<AuthResponse>) {
    if (response.status === 200) {
      if (response.body) {
        localStorage.setItem(environment.STORAGE_TOKEN, response.body.token);
        localStorage.setItem(environment.STORAGE_USER_DATA, JSON.stringify(response.body));
      }
    }
    this.stateService.setLoggedIn(response.status === 200);
    this.stateService.setLoading(false);
  }

  getSessions():Observable<HttpResponse<SessionsResponse[]>> {
    return this.http.get<any>(`${this.apiUrl}/activeSessions`, {observe: 'response'})
  }

  revokeSession(sessionId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/revokeSession`, {session_id: sessionId}, {observe: 'response'});
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}, {observe: 'response'})
  }
}

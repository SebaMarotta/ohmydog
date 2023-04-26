import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from './auth/interfaces/interfaces';
import {
  tap,
  map,
  find,
  Observable,
  pipe,
  Subscription,
  catchError,
  throwError,
} from 'rxjs';
import jwt_decode from 'jwt-decode';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient, private router: Router) {}

  private baseUrl: string = environment.baseUrl;
  private _user: User;

  get user() {
    return { ...this._user };
  }

  login(username: String, password: String): Observable<AuthResponse> {
    const url = `${this.baseUrl}/noauth/authenticate`;
    const body = { username, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem('token', JSON.stringify(resp.token));
          this.getUserProfile(username).subscribe((res) => {
            console.log(res);
          });
        }
      })
    );
  }

  isValid(username: String): Observable<User> {
    const url = `${this.baseUrl}/auth/users/${username}`;
    return this.http.get<User>(url);
  }

  findByUsername(username: String): Observable<User> {
    const url = `${this.baseUrl}/auth/users/${username}`;
    return this.http.get<User>(url);
  }

  getUserProfile(username: String): Observable<User> {
    const url = `${this.baseUrl}/auth/users/${username}`;
    return this.http.get<User>(url);
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

  logout() {
    localStorage.removeItem('token');
    this._user = undefined;
    this.router.navigateByUrl('/');
  }
}

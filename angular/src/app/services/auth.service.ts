import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../auth/interfaces/interfaces';
import { User } from '../clientes/interfaces/interfaces';
import {
  tap,
  map,
  find,
  Observable,
  pipe,
  Subscription,
  catchError,
  throwError,
  of,
  BehaviorSubject,
  Subject,
  take,
} from 'rxjs';
import jwt_decode from 'jwt-decode';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _ok: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(null);
  private _user$: BehaviorSubject<User> = new BehaviorSubject<User>({});
  private _validPassword$: BehaviorSubject<Boolean> =
    new BehaviorSubject<Boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService
  ) {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      const username = jwt_decode(token)['sub'];
      const ok = this.tokenIsValid(token, username);
      ok.subscribe({
        next: (resp) => {
          if (resp) {
            this.getUserSession(username).subscribe((resp) => {
              this._user$.next(resp);
            });
          }
        },
        error: (error) => localStorage.clear(),
      });
    }
  }

  get userSession(): BehaviorSubject<User> {
    return this._user$;
  }

  get isAuthenticated(): Boolean {
    return this._user$.value != null;
  }

  get isPasswordValid(): Boolean {
    return this._validPassword$.value;
  }

  get isAdmin(): Boolean {
    return this._user$.value.role == 'ADMIN';
  }

  get cambioPassword(): Boolean {
    return this._user$.value.cambioContraseña;
  }

  login(username: String, password: String): Observable<AuthResponse> {
    const url = `${this.baseUrl}/noauth/authenticate`;
    const body = { username, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem('token', JSON.stringify(resp.token));
          localStorage.setItem('index', JSON.stringify(0));
          this.getUserSession(username).subscribe((resp) => {
            this._user$.next(resp);
          });
          this.router.navigateByUrl('/');
        }
      }),
      catchError((err) => {
        return of(err);
      })
    );
  }

  tokenIsValid(token: string, username: string): Observable<boolean> {
    const url = `${this.baseUrl}/noauth/token`;

    const params = new HttpParams()
      .set('token', token)
      .set('username', username);

    return this.http.post<boolean>(url, params);
  }

  passwordIsValid(password: string, idUser: number): Observable<boolean> {
    const url = `${this.baseUrl}/auth/is-password-valid`;

    const body = {
      password: password,
      idUser: idUser,
    };
    return this.http.post<boolean>(url, body);
  }

  private getUserSession(username: String): Observable<User> {
    return this.userService.getUserSession(username).pipe(take(1));
  }

  logout() {
    localStorage.clear();
    this._user$.next(null); // Borra el nombre de usuario del BehaviorSubject
  }
}

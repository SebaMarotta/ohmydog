import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
} from 'rxjs';
import jwt_decode from 'jwt-decode';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnInit {
  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  private baseUrl: string = environment.baseUrl;
  private _user: Observable<User>;

  private getSession(username: String) {
    const url = `${this.baseUrl}/user/${username}`;
    this._user = this.http.get<User>(url);
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      const username = jwt_decode(token)['sub'];
      console.log(username);
    }
  }

  get user(): Observable<User> {
    return this._user;
  }

  login(username: String, password: String): Observable<AuthResponse> {
    const url = `${this.baseUrl}/noauth/authenticate`;
    const body = { username, password };
    return this.http.post<AuthResponse>(url, body).pipe(
      tap((resp) => {
        if (resp.ok) {
          localStorage.setItem('token', JSON.stringify(resp.token));
        }
      }),
      catchError((err) => {
        return of(err);
      })
    );
  }

  findByUsername(username: String): Observable<User> {
    const url = `${this.baseUrl}/user/${username}`;
    return this.http.get<User>(url);
  }

  getUserSession(username: String): Observable<User> {
    const url = `${this.baseUrl}/user/${username}`;
    return this.http.get<User>(url).pipe(map((result) => result));
  }

  getUsers(): Observable<User[]> {
    const url = `${this.baseUrl}/user/list`;
    return this.http.get<User[]>(url);
  }
}

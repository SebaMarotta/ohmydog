import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/clientes/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Observable, tap, map, of, BehaviorSubject, filter } from 'rxjs';
import { MessageService } from 'primeng/api';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  protected user$: BehaviorSubject<User> = this.authService.userSession;
  protected _role: String;
  protected _home: Boolean;
  protected _login: Boolean;

  constructor(
    private userService: UserService,
    protected authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        this._home = event.url == '/';
        this._login = event.url == '/login';
      }
    });

    this.user$.subscribe((resp) => {
      if (this.user$.value != null) this._role = resp.role;
    });
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.router.navigateByUrl('/login');
  }
}



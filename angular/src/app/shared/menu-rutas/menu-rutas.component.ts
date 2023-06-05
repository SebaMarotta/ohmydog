import { Component } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu-rutas',
  templateUrl: './menu-rutas.component.html',
  styleUrls: ['./menu-rutas.component.css'],
})
export class MenuRutasComponent {
  items: MenuItem[];
  home: MenuItem;

  protected _home: Boolean;
  protected _login: Boolean;

  constructor(
    private userService: UserService,
    protected authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event: NavigationEnd) => {
      if (event instanceof NavigationEnd) {
        this._home = event.url == '/';
        this._login = event.url == '/login';
      }
      this.updateBreadcrumb();
    });

    // this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  updateBreadcrumb() {
    this.items = [];

    const urlSegments = this.router.url
      .split('/')
      .filter((segment) => segment !== '');
    let url = '/';
    let label: any;

    for (let i = 0; i < urlSegments.length - 1; i++) {
      url += `${urlSegments[i]}/`;
    }
    this.items.push({ label: '<- Volver', routerLink: url });
  }
}

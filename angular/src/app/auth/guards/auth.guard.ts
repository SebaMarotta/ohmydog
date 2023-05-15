import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivateFn() {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      const token = localStorage.getItem('token');
      const asd = JSON.parse(token);
      const ok = true;
      console.log(this.authService.userSession);
      if (!ok) {
        this.router.navigateByUrl('/login'); // El usuario no tiene permiso para acceder a la ruta
        return false;
      }

      // El usuario tiene permiso para acceder a la ruta
      return true;
    };
  }

  canMatchFn() {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      const token = localStorage.getItem('token');
      const asd = JSON.parse(token);
      const ok = this.authService.tokenIsValid(
        token,
        this.authService.userSession.getValue['dni']
      );
      console.log(this.authService.userSession);
      if (!ok) {
        this.router.navigateByUrl('/login'); // El usuario no tiene permiso para acceder a la ruta
        return false;
      }

      // El usuario tiene permiso para acceder a la ruta
      return true;
    };
  }
}

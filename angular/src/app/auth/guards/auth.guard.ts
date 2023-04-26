import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private usuarioService: UsuarioService) {}

  canActivateFn() {
    return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      const token = localStorage.getItem('token');

      if (this.usuarioService.user) {
        // El usuario no tiene permiso para acceder a la ruta
        return false;
      }

      // El usuario tiene permiso para acceder a la ruta
      return true;
    };
  }
}

import { inject } from '@angular/core';
import {
  CanActivateChildFn,
  CanActivateFn,
  CanLoadFn,
  CanMatchFn,
  Router,
} from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

export const isAuthenticatedGuardActivateChildFn: CanActivateChildFn = (
  route,
  state
) => {
  const authService = inject(AuthService);
  const messageService = inject(MessageService);
  const router = inject(Router);

  if (authService.isAuthenticated) return true;
  messageService.add({
    severity: 'error',
    summary: 'Error',
    detail: 'No tienes los permisos suficientes',
    closable: false,
  });

  router.navigateByUrl('/login');
  return false;
};

import { inject } from '@angular/core';
import { CanActivateFn, CanLoadFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';

export const isAuthenticatedGuardActivateFn: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const messageService = inject(MessageService);
  const router = inject(Router);

  if (authService.isAuthenticated) return true;
  messageService.add({
    severity: 'error',
    summary: 'Error',
    detail: 'No tienes los permisos suficientes para acceder',
    closable: false,
  });

  if (authService.userSession.value.id) {
    router.navigateByUrl('/');
    return false;
  }

  router.navigateByUrl('/login');
  return false;
};

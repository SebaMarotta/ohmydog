import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const messageService = inject(MessageService);
  const router = inject(Router);

  if (authService.isAdmin) return true;

  messageService.add({
    severity: 'error',
    summary: 'Error',
    detail: 'No tienes los permisos necesarios',
    closable: false,
  });

  router.navigateByUrl('/');
  return false;
};

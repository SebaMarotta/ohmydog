import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';

export const isPerfilDelClienteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const messageService = inject(MessageService);
  const router = inject(Router);

  const idCliente = route.paramMap.get('id');
  const numberCliente = Number.parseInt(idCliente);

  if (authService.isAdmin) return true;
  if (authService.userSession.value.id == numberCliente) return true;
  messageService.add({
    severity: 'error',
    summary: 'Error',
    detail: 'No tienes los permisos necesarios',
    closable: false,
  });

  router.navigateByUrl('/');
  return false;
};

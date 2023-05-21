import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ta } from 'date-fns/locale';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';
import { Mascota } from 'src/app/mascotas/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { MascotaService } from 'src/app/services/mascota.service';

export const isMascotaDelClienteGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const mascotaService = inject(MascotaService);
  const messageService = inject(MessageService);
  const router = inject(Router);

  const idMascota = route.paramMap.get('idMascota');
  const numberMascota = Number.parseInt(idMascota);

  let isMascotaDelCliente: boolean = false;

  mascotaService.getMascotasUser(authService.userSession.value.id).pipe(
    tap((resp) => {
      resp.forEach((mascota) => {
        if ((mascota.id = numberMascota)) isMascotaDelCliente = true;
      });
    })
  );

  if (authService.isAdmin) return true;
  if (isMascotaDelCliente) return true;
  messageService.add({
    severity: 'error',
    summary: 'Error',
    detail: 'No tienes los permisos necesarios',
    closable: false,
  });

  router.navigateByUrl('/');
  return false;
};

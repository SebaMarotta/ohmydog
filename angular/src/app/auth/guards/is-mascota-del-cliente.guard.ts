import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ta } from 'date-fns/locale';
import { MessageService } from 'primeng/api';
import { of, switchMap, tap } from 'rxjs';
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

  return mascotaService.getMascotasUser(authService.userSession.value.id).pipe(
    switchMap((resp) => {
      let isMascotaDelCliente: boolean = false;

      resp.forEach((mascota) => {
        if (mascota.id == numberMascota) {
          isMascotaDelCliente = true;
        }
      });

      if (authService.isAdmin || isMascotaDelCliente) {
        return of(true);
      } else {
        messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No tienes los permisos necesarios',
          closable: false,
        });

        router.navigateByUrl('/');
        return of(false);
      }
    })
  );
};

import { User } from 'src/app/clientes/interfaces/interfaces';
import { Mascota } from 'src/app/mascotas/interfaces/interfaces';

export interface SolicitudPendiente {
  id: number;
  mascota: Mascota;
  user: User;
  horario: string;
  motivo: string;
  estado: boolean;
}

export interface SolicitudAceptada {
  idMascota: number;
  idUser: number;
  idSolicitud: number;
  fecha: Date;
  motivo: string;
}

export interface SolicitudRechazada {
  motivo: string;
  idSolicitud: number;
}

export interface Turno {
  id: number;
  cliente: User;
  mascota: Mascota;
  motivo: string;
  activo: boolean;
  fecha: Date;
}

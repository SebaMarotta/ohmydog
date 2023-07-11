import { User } from 'src/app/clientes/interfaces/interfaces';

export interface Mascota {
  id: number;
  nombre: string;
  raza: string;
  color: string;
  observaciones: string;
  sexo: string;
  fechaDeNacimiento: String;
  imagen: string;
  duenio: number;
  cruza: boolean;
  castrada: boolean;
  fechaCelo: string;
}

export interface RegisterMascotaRequest {
  nombre: string;
  raza: string;
  color: string;
  observaciones: string;
  sexo: string;
  fechaDeNacimiento: String;
  imagen: string;
  cruza: boolean;
  castrada: boolean;
  fechaCelo: string;
}

export interface Razas {
  raza: String;
}

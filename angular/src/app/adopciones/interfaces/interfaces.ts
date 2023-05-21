import { User } from 'src/app/clientes/interfaces/interfaces';

export interface Adopcion {
  id: number;
  cliente: User;
  nombrePerro: string;
  edad: number;
  raza: string;
  color: string;
  sexo: string;
  fecha: Date;
  origen: string;
  visible: boolean;
}

export interface RegisterAdopcionRequest {
  nombrePerro: string;
  edad: number;
  raza: string;
  color: string;
  sexo: string;
  fecha: Date;
  origen: string;
}

export interface FormularioAdopcionRequest {
  idDueño: number;
  idAdopcion: number;
  nombre: string;
  telefono: string;
  email: string;
}

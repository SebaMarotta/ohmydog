import { Obj } from '@popperjs/core';

export interface User {
  id?: number;
  dni?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  password?: string;
  role?: string;
  saldo?: Number;
  enabled?: boolean;
  username?: string;
  cambioContraseña?: boolean;
  authorities?: Authority[];
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
}

export interface Authority {
  authority?: string;
}

export interface RegisterUserRequest {
  id?: number;
  nombre?: string;
  apellido?: string;
  dni?: string;
  password?: string;
  email?: string;
  telefono?: string;
}

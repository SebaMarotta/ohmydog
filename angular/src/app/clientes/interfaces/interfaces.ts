export interface User {
  id?: number;
  dni?: string;
  nombre?: string;
  apellido?: string;
  email?: string;
  telefono?: string;
  password?: string;
  role?: string;
  enabled?: boolean;
  username?: string;
  authorities?: Authority[];
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
}

export interface Authority {
  authority?: string;
}

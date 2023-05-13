export interface Mascota {
  id: number;
  nombre: string;
  raza: string;
  color: string;
  observaciones: string;
  sexo: string;
  fechaDeNacimiento: null;
  imagen: string;
  id_user: number;
}

export interface RegisterMascotaRequest {
  nombre: string;
  raza: string;
  color: string;
  observaciones: string;
  sexo: string;
  fechaDeNacimiento: null;
  imagen: string;
}

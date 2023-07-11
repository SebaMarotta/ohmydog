import { User } from "src/app/clientes/interfaces/interfaces"

export interface BusquedaMascota {
  id: number,
  duenio: User,
  idCliente: number,
  raza: string,
  nombre: string,
  color: string,
  zona: string,
  imagen: string,
  fecha: string,
  sexo: string,
  edad: string,
  observaciones: string,
  estado: string,
  telefono: string,
  email: string,
  activo: boolean,
  tipo : string
}


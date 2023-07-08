export interface Donacion {
  id: number;
  nombre: string;
  descripcion: string;
  objetivo: number;
  montoAlcanzado: number;
  fecha: string;
  activa: boolean;
}

export interface CrearDonacion {
  nombre: string;
  descripcion: string;
  objetivo: number;
}

export interface EditarDonacion {
  id: number;
  nombre: string;
  descripcion: string;
  objetivo: number;
  activa: boolean;
}

export interface DonacionResponse {
  saldoAnterior: number;
  saldoNuevo: number;
}

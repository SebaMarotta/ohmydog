export interface Donacion {
  id: number;
  nombre: string;
  descripcion: string;
  objetivo: number;
  montoAlcanzado: number;
  fechaVencimiento: Date;
  activa: boolean;
}

export interface CrearDonacion {
  nombre: string;
  descripcion: string;
  objetivo: number;
  fechaVencimiento: Date;
}

export interface EditarDonacion {
  id: number;
  nombre: string;
  descripcion: string;
  objetivo: number;
  activa: boolean;
  fechaVencimiento: Date;
}

export interface DonacionResponse {
  saldoAnterior: number;
  saldoNuevo: number;
}

export interface Motivos {
  motivo: String;
}

export interface Horarios {
  horario: String;
}

export interface RegisterPlanillaRequest {
  motivo: String;
  fecha: Date;
  observaciones?: string;
  monto: string;
  peso?: string;
  cantidad?: number;
}

export interface Planilla {
  id: number;
  motivo: String;
  fecha: Date;
  observaciones?: string;
  monto: string;
  peso?: string;
  cantidad?: string;
}

export interface SolicitudTurno {
  mascota: number;
  user: number;
  motivo: string;
  horario: string;
}

export interface SolicitudTurnoRechazado {
  idSolicitud: number;
  motivo: string;
}

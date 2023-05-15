export interface Motivos {
  motivo: String;
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
  motivo: String;
  fecha: Date;
  observaciones?: string;
  monto: string;
  peso?: string;
}

export interface RegisterServicioTerceroRequest {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  tipo: string;
  rangoHorario: string;
  dias: string;
  disponible: boolean;
}

export interface ServicioTercero {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  zona: string;
  email: string;
  tipo: string;
  rangoHorario: string;
  dias: string;
  disponible: boolean;
}

export interface FormularioServicioTerceroRequest {
  idServicio: number;
  nombre: string;
  telefono: string;
  email: string;
  fechaYhora: string;
}

export interface CrearServicioRequest {
  nombre: string;
  apellido: string;
  telefono: string;
  zona: string;
  email: string;
  tipo: string;
  rangoHorario: string;
  dias: string;
  disponible: boolean;
}

export interface Zona {
  zona: String;
}

export interface Dias {
  dias: String;
}

export interface Tipo {
  tipo: String;
}

export interface EditServicioTerceroRequest {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  tipo: string;
  rangoHorario: string;
  dias: string;
  disponible: boolean;
}

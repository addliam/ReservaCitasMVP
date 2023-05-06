export interface Cita {
  id: number;
  fecha: string;
  hora: string;
  estado: string;
  createdAt: string;
  updatedAt: string;
  paciente: {
    id: number;
    nombre: string;
    apellidos: string;
    telefono: string;
  };
  especialidad: {
    id: number;
    nombre: string;
  };
}

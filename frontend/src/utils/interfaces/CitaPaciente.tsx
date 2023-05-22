export interface CitaPaciente {
  id: number;
  especialidad: {
    id: number;
    nombre: string;
  };
  fecha: string;
  hora: string;
  medico: {
    id: number;
    nombre: string;
    apellidos: string;
    empresa: {
      id: number;
      nombre: string;
    };
  };
}

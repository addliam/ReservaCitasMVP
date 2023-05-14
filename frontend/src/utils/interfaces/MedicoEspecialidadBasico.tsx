export interface MedicoEspecialidadBasico {
  id: number;
  precio: string;
  medico: {
    id: number;
    nombre: string;
    apellidos: string;
  };
  especialidad: {
    id: number;
    nombre: string;
  };
}

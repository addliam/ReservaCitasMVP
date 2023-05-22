export interface MedicoEspecialidadItem {
  id: number;
  precio: string;
  especialidad: {
    id: number;
    nombre: string;
  };
}

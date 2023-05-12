export interface MedicoEspecialidadSimple {
  id: Number;
  precio: string;
  medico: {
    id: Number;
    nombre: string;
    apellidos: string;
    empresaId: Number;
  };
  especialidad: {
    id: Number;
    nombre: string;
  };
}

export interface Medico {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  aprobacion: boolean;
  createdAt: string;
  empresa: {
    nombre: string;
  };
}

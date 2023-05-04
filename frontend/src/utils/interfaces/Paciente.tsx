export interface Paciente {
  apellidos: string;
  createdAt: string;
  direccion: string;
  dni: string;
  fechaNacimiento: string;
  id: number;
  nombre: string;
  registroPaciente: {
    email: string;
  };
  telefono: string;
  updatedAt: string;
}

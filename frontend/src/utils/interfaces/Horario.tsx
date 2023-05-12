export interface Bloque {
  horaInicio: string;
  horaFin: string;
  active: boolean;
}
export interface Horario {
  diaSemana: string;
  horario: Bloque[];
}

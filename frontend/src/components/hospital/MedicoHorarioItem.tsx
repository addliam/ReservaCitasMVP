import React from "react";
import Image from "next/image";
import { MedicoEspecialidadSimple } from "@/utils/interfaces/MedicoEspecialidadSimple";
import { useRouter } from "next/router";
interface MedicoHorarioItemProps {
  medicoEspecialidad: MedicoEspecialidadSimple;
}
const MedicoHorarioItem = ({ medicoEspecialidad }: MedicoHorarioItemProps) => {
  const router = useRouter();
  const nombreCompletoMedico = `${medicoEspecialidad.medico.nombre} ${medicoEspecialidad.medico.apellidos}`;
  const clickVerHorario = () => {
    console.log("En mi ejemplo solo hay horario de Pediatria 10");
    console.log(
      `Medico: ${medicoEspecialidad.medico.id} - MedicoEspecialidad: ${medicoEspecialidad.id}`
    );
    router.push("http://localhost:3000/horario/medico-especialidad/10");
  };
  return (
    <div className="item flex flex-row gap-[1rem] justify-between items-center py-[.75rem]">
      <div className="flex flex-row gap-[.75rem] justify-start items-center ">
        <div className="w-[64px] h-[64px] rounded-[50%] bg-orange-400" />
        <div className="flex flex-col w-[12.5rem]">
          <p className="text-jet-black font-medium text-[18px]">
            {nombreCompletoMedico}
          </p>
          <div className="flex flex-row justify-between">
            <p className="text-[1rem] text-[#1779BA] font-medium">
              {medicoEspecialidad.especialidad.nombre}
            </p>
            <p className="text-[1rem] text-[#0EC320] font-medium">
              S/ {medicoEspecialidad.precio}
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={clickVerHorario}
        className="px-[5px] py-[5px] border-[1px] border-[#bebebe] rounded-sm "
      >
        <Image
          src={"/src/icons/Schedule.svg"}
          alt="telefono"
          width={0}
          height={0}
          className="w-[38px] h-[38px]"
        ></Image>
      </div>
    </div>
  );
};

export default MedicoHorarioItem;
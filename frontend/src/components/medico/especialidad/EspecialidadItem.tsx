import React from "react";
import Image from "next/image";
import { Especialidad } from "@/utils/interfaces/Especialidad";
import moment from "moment";
interface EspecialidadItemProps {
  especialidad: Especialidad;
  onEditClick: (id: Number) => void;
}
const EspecialidadItem = ({
  especialidad,
  onEditClick,
}: EspecialidadItemProps) => {
  const formattedFecha = moment(especialidad.createdAt).format("DD/MM/YY");

  return (
    <div className="w-[13.5rem] bg-[#F5F5F5] rounded-md px-[1rem] py-[.75rem]">
      <div className="flex flex-row justify-between gap-[.5rem]">
        <span className="font-medium text-[1.125rem]">
          {especialidad.especialidad.nombre}
        </span>
        <div
          onClick={() => onEditClick(especialidad.id)}
          className="px-[4px] py-[4px]"
        >
          <Image
            src="/src/icons/Edit.svg"
            alt="white menu rounded"
            width={0}
            height={0}
            className="w-[1.625rem] h-[1.625rem]"
          />
        </div>
      </div>
      <p className="text-jet-black font-medium mt-[6px]">
        S/ {especialidad.precio}
      </p>
      <p className="text-[#1779BA] text-[14px] mt-[4px] font-medium text-right">
        Creado el {formattedFecha}
      </p>
    </div>
  );
};

export default EspecialidadItem;

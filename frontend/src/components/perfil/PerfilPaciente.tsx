import React, { useEffect, useState } from "react";
import { poppins } from "@/utils/fonts/poppins";
import PerfilItem from "./PerfilItem";
import Image from "next/image";
import { Paciente } from "@/utils/interfaces/Paciente";
import LogoutButton from "../LogoutButton";

const PerfilPaciente = ({ data }: { data: Paciente }) => {
  console.log("[*] Render PerfilPaciente");
  // const [showPopup, setShowPopup] = useState<Boolean>(false);
  return (
    <div className="px-[1.5rem]">
      <h1
        className={`text-center text-[1.75rem] font-extrabold my-[20px] ${poppins.className}`}
      >
        Mi perfil
      </h1>
      <div className="flex flex-row items-center gap-[2.5rem] pt-[.5rem]">
        <div className="pic w-[7rem] h-[7rem] rounded-[50%] bg-orange-500"></div>
        <div className="">
          <h5 className="text-jet-black font-bold text-[1.25rem]">
            {`${data.nombre} ${data.apellidos}`}
          </h5>
          <p className="text-[1rem] text-[#636363]">
            {data.registroPaciente.email}
          </p>
          <button className="mt-[.875rem] px-[2.8125rem] rounded-[4px] text-white bg-blue-midnight py-[.625rem]">
            Editar perfil
          </button>
        </div>
      </div>
      <section className="list-profile-info mx-[2rem] mt-[2.5rem] flex flex-col gap-4">
        <PerfilItem
          imagenAlt={"male user"}
          imagenSrc="/src/icons/MaleUser.svg"
          item="Tipo de cuenta"
          valor="Paciente"
        />
        <PerfilItem
          imagenAlt={"card id"}
          imagenSrc="/src/icons/SecurityPass.svg"
          item="DNI"
          valor={data.dni || "- - - - - - -"}
        />
        <PerfilItem
          imagenAlt={"Direccion"}
          imagenSrc="/src/icons/Home.svg"
          item="Direccion"
          valor={data.direccion || "- - - - - - -"}
        />
        <PerfilItem
          imagenAlt={"celular"}
          imagenSrc="/src/icons/Phone.svg"
          item="Celular"
          valor={data.telefono || "- - - - - - -"}
        />
        <PerfilItem
          imagenAlt={"fecha nacimiento"}
          imagenSrc="/src/icons/BirthDate.svg"
          item="Fecha de nacimiento"
          valor={data.fechaNacimiento || "- - - - - - -"}
        />
      </section>
      <div className="logout mt-[3rem]">
        <LogoutButton />
      </div>
    </div>
  );
};

export default PerfilPaciente;
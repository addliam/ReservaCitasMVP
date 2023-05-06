import React from "react";
import { poppins } from "@/utils/fonts/poppins";
import { Medico } from "@/utils/interfaces/Medico";
import PerfilItem from "./PerfilItem";
import LogoutButton from "../LogoutButton";
import Image from "next/image";
import { useRouter } from "next/router";
const PerfilMedico = ({ data }: { data: Medico }) => {
  const router = useRouter();
  const verifyAccountClicked = () => {
    router.push("/perfil/verificar");
  };
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
          <p className="text-[1rem] text-[#636363]">{data.email}</p>
          <button
            // onClick={() => editarPerfilHandler()}
            className="mt-[.875rem] px-[2.8125rem] rounded-[4px] text-white bg-blue-midnight py-[.625rem]"
          >
            Editar perfil
          </button>
        </div>
      </div>
      <section className="list-profile-info mx-[2rem] mt-[2.5rem] flex flex-col gap-4">
        <PerfilItem
          imagenAlt={"male user"}
          imagenSrc="/src/icons/MaleUser.svg"
          item="Tipo de cuenta"
          valor="Medico"
        />
        <PerfilItem
          imagenAlt={"card id"}
          imagenSrc="/src/icons/Company.svg"
          item="Empresa"
          valor={data.empresa.nombre || "- - - - - - -"}
        />
        <div className="h-[8rem]" />
        <div className="separator bg-[#F3F3F3] w-full h-[3px] rounded-sm" />
        <div className="flex flex-row justify-between items-center">
          <div className="flex gap-[1.5rem] items-center">
            <Image
              src={"/src/icons/VerifiedAccount.svg"}
              width={"0"}
              height={"0"}
              alt={"verify account"}
              className="w-[38px] h-[38px]"
            ></Image>
            <div className="flex flex-col gap-[0px] ">
              <p className="text-[1.125rem] text-black font-medium">
                Verificación
              </p>
              <p className="text-[1rem] text-jet-black">
                {data.aprobacion ? "Completada" : "Incompleta"}
              </p>
            </div>
          </div>
          {!data.aprobacion ? (
            <div onClick={() => verifyAccountClicked()} className="clickable">
              <Image
                src={"/src/icons/NextPage.svg"}
                width={"0"}
                height={"0"}
                alt={"verify account"}
                className="w-[38px] h-[38px] mx-[4px] my-[4px]"
              ></Image>
            </div>
          ) : (
            <></>
          )}
        </div>
      </section>
      <div className="logout mt-[3rem]">
        <LogoutButton />
      </div>
    </div>
  );
};

export default PerfilMedico;

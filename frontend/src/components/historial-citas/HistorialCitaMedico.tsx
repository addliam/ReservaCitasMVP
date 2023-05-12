import useJwtToken from "@/hooks/useJwtToken";
import { Cita } from "@/utils/interfaces/Cita";
import axios, { AxiosRequestConfig } from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface LiHistorialCitaProps {
  paciente: string;
  fechaHora: string;
  especialidad: string;
}

const LiHistorialCita = ({
  paciente,
  fechaHora,
  especialidad,
}: LiHistorialCitaProps) => {
  return (
    <li className="flex flex-row gap-[1.375rem] items-center ">
      <div className="h-[4.25rem] w-[4.25rem] bg-orange-400 rounded-[50%]"></div>
      <div className="flex flex-col ">
        <p className="font-medium text-[1.125rem] text-jet-black">{paciente}</p>
        <div className="flex flex-row items-center gap-[.5rem]">
          <Image
            src={"/src/icons/Clock.svg"}
            height={0}
            width={0}
            alt="clock"
            className="w-[22px] h-[22px]"
          ></Image>
          <p className="text-[#1779BA] font-medium">{fechaHora}</p>
        </div>
        <div className="flex flex-row items-center gap-[.5rem]">
          <Image
            src={"/src/icons/DoctorsBag.svg"}
            height={0}
            width={0}
            alt="doctors bag"
            className="w-[22px] h-[22px]"
          ></Image>
          <p className="text-[#525252] font-medium">{especialidad}</p>
        </div>
      </div>
    </li>
  );
};

const HistorialCitaMedico = () => {
  const [estado, setEstado] = useState("Pendiente");
  // por ahora sin optimizar si busca pendiente y luego confirmada y vuelve a pendeiente es una query por cambio
  const [citas, setCitas] = useState<Cita[]>([]);
  const onChangeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEstado(e.target.value);
  };
  const jwt = useJwtToken();
  useEffect(() => {
    const API_URL =
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/medico/cita` || "";
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    if (jwt) {
      axios
        .get(`${API_URL}?estado=${estado.toLowerCase()}`, config)
        .then((res) => {
          const arrayCitas: Cita[] = res.data;
          setCitas(arrayCitas);
        })
        .catch((err) => console.error(err));
    }
    return () => {};
  }, [estado, jwt]);

  return (
    <section className="px-[1.5rem] mt-[1rem]">
      <div className="flex flex-row justify-between items-center ">
        <label
          htmlFor="estado"
          className="font-medium text-[18px] text-jet-black"
        >
          Estado
        </label>
        <select
          onChange={onChangeSelectHandler}
          value={estado}
          name="estado"
          id="estado"
          className="border-[1px] border-[#E7E7E7] rounded-md px-[14px] py-[8px]"
        >
          <option value="pendiente">Pendiente</option>
          <option value="confirmada">Confirmada</option>
        </select>
      </div>
      <ul className="mt-[1.875rem] flex flex-col gap-[1.875rem]">
        {citas.length > 0 ? (
          citas.map((cita: Cita) => {
            return (
              <LiHistorialCita
                key={cita.id}
                paciente={`${cita.paciente.nombre} ${cita.paciente.apellidos}`}
                especialidad={`${cita.especialidad.nombre}`}
                fechaHora={`${cita.fecha} - ${cita.hora}`}
              />
            );
          })
        ) : (
          <p className="text-center my-[1rem]">No se encontraron resultados</p>
        )}
      </ul>
    </section>
  );
};

export default HistorialCitaMedico;

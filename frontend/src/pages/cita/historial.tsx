import NavBar from "@/components/NavBar";
import useJwtToken from "@/hooks/useJwtToken";
import { poppins } from "@/utils/fonts/poppins";
import { CitaPaciente } from "@/utils/interfaces/CitaPaciente";
import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";

interface CitaPacienteCardProps {
  data: CitaPaciente;
}
const CitaPacienteCard = ({ data }: CitaPacienteCardProps) => {
  return (
    <div className="bg-blue-midnight text-white w-[20.75rem] px-[1.125rem] py-[1.125rem] rounded-md ">
      <div className="flex flex-col gap-[.75rem]">
        <p className="text-[1.125rem]">
          {data.fecha}
          &nbsp;&nbsp;&nbsp;
          {`${data.hora.split(":").slice(0, 2).join(":")}`}
        </p>
        <p className="text-base font-medium text-[#E5E927]">
          {data.especialidad.nombre}
        </p>
        <p className="text-[#DFDFDF]">
          <span className="font-medium">Hospital:</span>{" "}
          {data.medico.empresa.nombre}
        </p>
        <p className="text-[#DFDFDF]">
          <span className="font-medium">Medico:</span>{" "}
          {`${data.medico.nombre} ${data.medico.apellidos}`}
        </p>
      </div>
    </div>
  );
};

const Historial = () => {
  const jwt = useJwtToken();
  const [citaPacienteList, setCitaPacienteList] = useState<CitaPaciente[]>([]);
  useEffect(() => {
    let config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };

    if (jwt) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cita/paciente/historial`,
          config
        )
        .then((res) => setCitaPacienteList(res.data))
        .catch((err) => console.error(err));
    }
    return () => {};
  }, [jwt]);

  return (
    <div>
      <NavBar />
      <div className="mx-[1.5rem]">
        <h1
          className={`text-center text-[28px] text-black font-extrabold my-[1.25rem] ${poppins.className}`}
        >
          Mis citas
        </h1>
        <div className="my-[1rem] flex flex-col gap-5 items-center">
          {citaPacienteList.map((citaPaciente) => (
            <CitaPacienteCard key={citaPaciente.id} data={citaPaciente} />
          ))}
        </div>
      </div>
    </div>
  );
};

// TODO: chequear que sea paciente
export default Historial;

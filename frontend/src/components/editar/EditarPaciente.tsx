import React, { useRef, useState } from "react";
import { poppins } from "@/utils/fonts/poppins";
import Image from "next/image";
import { useEffect } from "react";
import CustomInputEdit from "./CustomInputEdit";
import axios, { AxiosRequestConfig } from "axios";
import useJwtToken from "@/hooks/useJwtToken";
import { Paciente } from "@/utils/interfaces/Paciente";

import { ToastContent, ToastOptions } from "react-toastify";

interface EditarPacienteProps {
  toastObj: {
    success: (
      content: ToastContent,
      options?: ToastOptions | undefined
    ) => void;
    error: (content: ToastContent, options?: ToastOptions | undefined) => void;
    info: (content: ToastContent, options?: ToastOptions | undefined) => void;
    warn: (content: ToastContent, options?: ToastOptions | undefined) => void;
  };
}
const EditarPaciente = ({ toastObj }: EditarPacienteProps) => {
  const [value, setValue] = useState("defaultValue");
  const [pacienteInfo, setPacienteInfo] = useState<Partial<Paciente>>({});

  const jwtToken = useJwtToken();
  useEffect(() => {
    const API_URL =
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/paciente/perfil` || "";
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    if (jwtToken) {
      // obtener informacion
      axios
        .get(API_URL, config)
        .then((res) => {
          setPacienteInfo(res.data);
        })
        .catch((err) => console.error(err));
    }
    return () => {};
  }, [jwtToken]);

  const onChangeInputHandler = (newValue: string) => {
    setPacienteInfo((prev) => ({ ...prev, nombre: newValue }));
  };
  const onChangeApellidos = (newValue: string) => {
    setPacienteInfo((prev) => ({ ...prev, apellidos: newValue }));
  };
  const onChangeDni = (newValue: string) => {
    setPacienteInfo((prev) => ({ ...prev, dni: newValue }));
  };
  const onChangeDireccion = (newValue: string) => {
    setPacienteInfo((prev) => ({ ...prev, direccion: newValue }));
  };
  const onChangeCelular = (newValue: string) => {
    setPacienteInfo((prev) => ({ ...prev, telefono: newValue }));
  };
  const onChangeDate = (newValue: string) => {
    setPacienteInfo((prev) => ({ ...prev, fechaNacimiento: newValue }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const actualizarInfoHandler = () => {
    console.log("Actualizar informacion. make POST req");
    const API_URL =
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/paciente/perfil` || "";
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    axios
      .put(API_URL, pacienteInfo, config)
      .then((res) => {
        if (res.status == 201) {
          toastObj.success("Informacion actualizada correctamente!", {
            theme: "colored",
            position: "top-center",
            autoClose: 3000,
          });
        }
        console.log(res);
      })
      .catch((err) => console.error(err));

    console.log(pacienteInfo);
  };

  return (
    <div className="mx-[1.5rem]">
      <h1
        className={`${poppins.className} text-blue-midnight font-bold text-[1.75rem] text-center my-[1.25rem]`}
      >
        Editar perfil
      </h1>
      <p>Modifica los datos que consideres necesario</p>
      <form
        className="mt-[.75rem] flex flex-col gap-[1rem]"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="font-semibold text-jet-black" htmlFor="nombre">
            NOMBRE:
          </label>
          <CustomInputEdit
            valor={pacienteInfo?.nombre || ""}
            handleChange={onChangeInputHandler}
          />
        </div>
        <div>
          <label className="font-semibold text-jet-black" htmlFor="nombre">
            APELLIDOS:
          </label>
          <CustomInputEdit
            valor={pacienteInfo?.apellidos || ""}
            handleChange={onChangeApellidos}
          />
        </div>
        <div>
          <label className="font-semibold text-jet-black" htmlFor="nombre">
            DNI:
          </label>
          <CustomInputEdit
            valor={pacienteInfo?.dni || ""}
            type="number"
            handleChange={onChangeDni}
          />
        </div>
        <div>
          <label className="font-semibold text-jet-black" htmlFor="nombre">
            DIRECCION:
          </label>
          <CustomInputEdit
            valor={pacienteInfo?.direccion || ""}
            handleChange={onChangeDireccion}
          />
        </div>
        <div>
          <label className="font-semibold text-jet-black" htmlFor="nombre">
            CELULAR:
          </label>
          <CustomInputEdit
            valor={pacienteInfo?.telefono || ""}
            type="tel"
            handleChange={onChangeCelular}
          />
        </div>
        <div>
          <label className="font-semibold text-jet-black" htmlFor="nombre">
            FECHA DE NACIMIENTO:
          </label>
          <CustomInputEdit
            valor={pacienteInfo?.fechaNacimiento || ""}
            type="date"
            handleChange={onChangeDate}
          />
        </div>
        <div className="button-section mt-[24px]">
          <button
            onClick={() => actualizarInfoHandler()}
            type="submit"
            className="w-full py-[14px] text-center bg-blue-midnight text-white rounded-md"
          >
            Actualizar información
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarPaciente;

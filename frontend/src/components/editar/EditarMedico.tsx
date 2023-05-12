import React, { useState } from "react";
import { poppins } from "@/utils/fonts/poppins";
import { useEffect } from "react";
import CustomInputEdit from "./CustomInputEdit";
import axios, { AxiosRequestConfig } from "axios";
import useJwtToken from "@/hooks/useJwtToken";

import { ToastContent, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Medico } from "@/utils/interfaces/Medico";

interface EditarMedicoProps {
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
const EditarMedico = ({ toastObj }: EditarMedicoProps) => {
  const [medicoInfo, setMedicoInfo] = useState<Partial<Medico>>({});
  const jwtToken = useJwtToken();
  useEffect(() => {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    if (jwtToken) {
      // obtener informacion
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/medico/perfil`, config)
        .then((res) => {
          const medico: Medico = res.data;
          setMedicoInfo(medico);
        })
        .catch((err) => console.error(err));
      // el medico no puede modificar libremente la empresa
    }
    return () => {};
  }, [jwtToken]);

  const onChangeInputHandler = (newValue: string) => {
    setMedicoInfo((prev) => ({ ...prev, nombre: newValue }));
  };
  const onChangeApellidos = (newValue: string) => {
    setMedicoInfo((prev) => ({ ...prev, apellidos: newValue }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const actualizarInfoHandler = () => {
    console.log("Actualizar informacion. make POST req");
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    axios
      .put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/medico/perfil`,
        medicoInfo,
        config
      )
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

    console.log(medicoInfo);
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
            valor={medicoInfo.nombre || ""}
            handleChange={onChangeInputHandler}
          />
        </div>
        <div>
          <label className="font-semibold text-jet-black" htmlFor="nombre">
            APELLIDOS:
          </label>
          <CustomInputEdit
            valor={medicoInfo.apellidos || ""}
            handleChange={onChangeApellidos}
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

export default EditarMedico;

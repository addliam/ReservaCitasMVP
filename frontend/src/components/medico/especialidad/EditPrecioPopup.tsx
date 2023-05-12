import React, { useState } from "react";
import Image from "next/image";
import { Especialidad } from "@/utils/interfaces/Especialidad";
import axios, { AxiosRequestConfig } from "axios";
import useJwtToken from "@/hooks/useJwtToken";
interface EditPrecioPopupProps {
  closeHandler: () => void;
  especialidad: Especialidad;
  triggerFetch: () => void;
}

const EditPrecioPopup = ({
  closeHandler,
  especialidad,
  triggerFetch,
}: EditPrecioPopupProps) => {
  const [nuevoPrecio, setNuevoPrecio] = useState("");
  const clickCloseEditable = () => {
    closeHandler();
  };
  const jwt = useJwtToken();
  const confirmEditPrecioEspecialidad = () => {
    // enviar formulario
    // el backend requiere q pasemos especialidad/:id
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/medico/especialidad`;
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    const data = {
      precio: nuevoPrecio,
    };
    axios
      .put(`${API_URL}/${especialidad.id}`, data, config)
      .then((res) => {
        triggerFetch();
        console.log(res.data);
      })
      .catch((err) => console.error(err));
    // cerrar esta ventana y llamar a refrescar la otra

    closeHandler();
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNuevoPrecio(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="overlay editprice bg-[#000000d8] w-full h-full absolute">
      <section className="editprice-body mx-auto pb-[1.5rem] pt-[.75rem] mt-[4rem] w-[18rem] bg-white rounded-md px-[1.75rem] relative">
        <div
          onClick={() => clickCloseEditable()}
          className="w-fit h-fit ml-auto mt-[.5rem]"
        >
          <Image
            src={"/src/icons/CloseX.svg"}
            alt="close"
            width={0}
            height={0}
            className="w-[30px] h-[30px]"
          ></Image>
        </div>
        <h4 className="text-center font-semibold text-[1.75rem]">
          Editar precio
        </h4>
        <form
          onSubmit={handleSubmit}
          className="text-jet-black mt-[1rem] flex flex-col gap-[.875rem]"
        >
          <div>
            <label className="font-medium" htmlFor="precio">
              Especialidad:
            </label>
            <span className="ml-[1rem]">
              {especialidad.especialidad.nombre}
            </span>
          </div>
          <div>
            <label className="font-medium" htmlFor="precio">
              Precio actual:
            </label>
            <span className="ml-[1rem]">{especialidad.precio}</span>
          </div>
          <div>
            <label className="font-medium" htmlFor="precio">
              Nuevo precio:
            </label>
            <input
              onChange={handleInputChange}
              className="px-[6px] py-[2px] text-jet-black border-[1px] w-[6rem] ml-[1rem] border-black "
              type="number"
              step="0.01"
              name="precio"
              id="precio"
              required
            />
          </div>
          <button
            onClick={() => confirmEditPrecioEspecialidad()}
            className=" mt-[1.5rem] bg-blue-midnight text-white rounded-md py-[8px] px-[1rem]"
            type="submit"
          >
            Actualizar precio
          </button>
        </form>
      </section>
    </div>
  );
};

export default EditPrecioPopup;

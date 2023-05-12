import NavBar from "@/components/NavBar";
import useJwtToken from "@/hooks/useJwtToken";
import { poppins } from "@/utils/fonts/poppins";
import axios, { AxiosRequestConfig } from "axios";
import React, { useEffect, useState } from "react";
poppins;
import { ToastContainer, toast } from "react-toastify";

interface EspecialidadSelect {
  id: Number;
  nombre: string;
}

const agregar = () => {
  const [especialidadesData, setEspecialidadesData] = useState<
    EspecialidadSelect[]
  >([]);
  const [selectedOption, setSelectedOption] = useState("base");
  const [precio, setPrecio] = useState("");

  const jwt = useJwtToken();

  useEffect(() => {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || "";
    axios
      .get(`${API_URL}/especialidad`)
      .then((res) => setEspecialidadesData(res.data))
      .catch((err) => console.error(err));
    return () => {};
  }, []);

  // para el post necesida id, precio (id de especialidad)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // si el usuario selecciono especialidad
    if (selectedOption != "base") {
      try {
        const precioNumber = Number(precio);
        const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || "";
        const config: AxiosRequestConfig = {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        };
        const data = {
          id: selectedOption,
          precio: precioNumber,
        };
        console.log("Aca enviamos la peticion POST");
        // reseteamos los campos
        axios
          .post(`${API_URL}/medico/especialidad`, data, config)
          .then((res) => {
            if (`${res.status}` === "201") {
              setPrecio("");
              toast.success(`La especialidad se agrego al perfil`, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
            }
          })
          .catch((err) => console.error(err));
      } catch (error) {
        console.log("Error: " + error);
      }
    }
  };
  const agregarEspecialidadPrecioAlPerfil = () => {};
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.currentTarget.value);
  };
  const handlePriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrecio(e.target.value);
  };
  return (
    <div>
      <ToastContainer />
      <NavBar />
      <div className="px-[24px]">
        <h1
          className={`text-center text-[28px] text-blue-midnight font-extrabold my-[1.25rem] ${poppins.className}`}
        >
          Agregar especialidad
        </h1>
        <section>
          <form onSubmit={handleSubmit} className="flex flex-col gap-[1.75rem]">
            <div className="flex flex-col gap-[8px] justify-between">
              <label
                className="text-jet-black font-medium text-[18px]"
                htmlFor="especialidad"
              >
                Especialidad:
              </label>
              <select
                onChange={handleChange}
                className="bg-white px-[.375rem] py-[.375rem] border-[.0625rem] border-[#444444] rounded-sm"
                name="especialidad"
                id="especialidad"
              >
                <option className="base" value="base">
                  - Elige una especialidad -
                </option>
                {especialidadesData.length > 0 ? (
                  especialidadesData.map((esp) => {
                    return (
                      <option key={`${esp.id}`} value={`${esp.id}`}>
                        {esp.nombre}
                      </option>
                    );
                  })
                ) : (
                  <option>Cargando ....</option>
                )}
              </select>
            </div>
            <div className="flex flex-row gap-[8px] justify-between ">
              <label
                className="text-jet-black font-medium text-[18px]"
                htmlFor="precio"
              >
                Precio:
              </label>
              <input
                onChange={handlePriceInputChange}
                value={precio}
                className="w-[96px] border-[#444444] border-[.0625rem] rounded-sm px-[.5rem] py-[.25rem]"
                type="number"
                step="0.01"
              />
            </div>
            <button
              onClick={() => agregarEspecialidadPrecioAlPerfil()}
              className=" mt-[1.25rem] bg-blue-midnight text-white rounded-md py-[12px] px-[1rem]"
              type="submit"
            >
              Añadir a mi perfil
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default agregar;

import NavBar from "@/components/NavBar";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { ItemHospital } from "@/utils/interfaces/ItemHospital";
import HospitalItem from "@/components/hospital/buscar/HospitalItem";

const Buscar = () => {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [listaEmpresas, setListaEmpresas] = useState<ItemHospital[]>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextoBusqueda(e.target.value);
  };
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/empresa/lista`)
      .then((res) => setListaEmpresas(res.data))
      .catch((err) => console.error(err));
    return () => {};
  }, []);

  return (
    <div>
      <NavBar />
      <div className="px-[24px] mt-[1.5rem]">
        <div className="mx-auto w-[22rem] flex flex-row justify-between">
          <div className="w-full search border-[#8D8D8D] border-[1px] rounded-l-md flex flex-row items-center ">
            <Image
              className="w-[26px] h-[26px] mx-[8px] "
              src={"/src/icons/Search.svg"}
              alt="lupa de busqueda"
              height={0}
              width={0}
            />
            <input
              value={textoBusqueda}
              onChange={handleInputChange}
              className="px-[.5rem] py-[.5rem] w-full"
              type="text"
              placeholder="Busca centros médicos"
            />
          </div>
          <div className="bg-blue-midnight rounded-r-md w-[56px] h-auto flex flex-row justify-center items-center  ">
            <Image
              className="w-[26px] h-[26px]"
              src={"/src/icons/Filter.svg"}
              alt="filtro de busqueda"
              height={0}
              width={0}
            />
          </div>
        </div>
        <section className="mt-[1.5rem]">
          <p className="text-jet-black font-medium">
            Se encontraron {listaEmpresas.length} resultados
          </p>
          <div className="mt-[1rem] flex flex-col divide-y divide-[#F0F0F0]">
            {listaEmpresas.map((empresa) => (
              <HospitalItem key={empresa.id.toString()} hospital={empresa} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Buscar;

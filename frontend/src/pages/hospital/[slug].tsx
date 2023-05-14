import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavBar from "@/components/NavBar";
import { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import Image from "next/image";
import MedicoHorarioItem from "@/components/hospital/MedicoHorarioItem";
import { MedicoEspecialidadBasico } from "@/utils/interfaces/MedicoEspecialidadBasico";
import { EspecialidadSimple } from "@/utils/interfaces/EspecialidadSimple";
interface EmpresaPerfilPublicoProps {
  empresa: Empresa | null;
}

const EmpresaPerfilPublico: NextPage<EmpresaPerfilPublicoProps> = ({
  empresa,
}) => {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [listaEspecialidades, setListaEspecialidades] = useState<
    EspecialidadSimple[]
  >([]);
  const [selectedEspecialidadId, setSelectedEspecialidadId] = useState("");
  const [medicoEspecialidadData, setMedicoEspecialidadData] = useState<
    MedicoEspecialidadBasico[]
  >([]);
  const onChangeSelectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    setSelectedEspecialidadId(e.target.value);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextoBusqueda(e.target.value);
  };
  // TODO: optimiza porque en cada cambio de select se hace 1 req. Plantear descargar el json completo y aplicar filtros javascript en local
  useEffect(() => {
    if (empresa) {
      // ejecutar 1 sola vez
      // obtener la lista de todas las especialidades de cierta empresa
      if (selectedEspecialidadId == "") {
        axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/empresa/${empresa.id}/especialidades`
          )
          .then((res) => setListaEspecialidades(res.data))
          .catch((err) => console.error(err));
        // obtener la lista entera sin aplicar filtros de especialidades q brinda una empresa
        axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/empresa/${empresa.id}/medicos/especialidad`
          )
          .then((res) => setMedicoEspecialidadData(res.data))
          .catch((err) => console.error(err));
      } else {
        // de lo contrario aplicar los filtros segun los cambios en selectedEspecialidadId
        axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/empresa/${empresa.id}/medicos/especialidad?id=${selectedEspecialidadId}`
          )
          .then((res) => setMedicoEspecialidadData(res.data))
          .catch((err) => console.error(err));
      }
    }
    return () => {};
  }, [empresa, selectedEspecialidadId]);

  // get todas las especialidades q pertenecen a una empresa
  // poner la especialidades en el select
  // Por cada cambio del select hacer consulta a DDBB para saber la lista ordenada por precio DESC [medico, precio] de esa especialidad
  return (
    <div>
      <NavBar />
      <div className="mx-[1.5rem]">
        <div className="mx-auto w-[22rem] flex flex-row justify-between mt-[1.5rem]">
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
        {empresa ? (
          // aca va el contenido si esq si se encontro el valor pasado en slug
          <div>
            <section className="my-[1.875rem] flex flex-col justify-center items-center">
              <div className="w-[104px] h-[104px] rounded-[50%] bg-blue-steel" />
              <h2 className="mt-[.75rem] text-[2rem] font-semibold text-jet-black text-center max-w-[20rem] leading-9">
                {empresa.nombre}
              </h2>
            </section>
            <section>
              <p className="font-semibold text-[1.125rem] text-jet-black text-left">
                Información basica:
              </p>
              <div className="mt-[1rem] px-[1rem] flex flex-col gap-[1.25rem]">
                <div className="flex flex-row gap-[1.25rem] items-center">
                  <Image
                    src={"/src/icons/Country38.svg"}
                    alt="pais departamento provincia distrito"
                    width={0}
                    height={0}
                    className="w-[38px] h-[38px]"
                  ></Image>
                  <div>
                    <h4 className="font-medium text-jet-black text-[1rem]">
                      Departamento - Provincia - Distrito
                    </h4>
                    <p>
                      {empresa.departamento} - {empresa.provincia} -{" "}
                      {empresa.distrito}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-[1.25rem] items-center">
                  <Image
                    src={"/src/icons/Location38.svg"}
                    alt="ubicacion precisa"
                    width={0}
                    height={0}
                    className="w-[38px] h-[38px]"
                  ></Image>
                  <div>
                    <h4 className="font-medium text-jet-black text-[1rem]">
                      Ubicacion
                    </h4>
                    <p>{empresa.direccion}</p>
                  </div>
                </div>
                <div className="flex flex-row gap-[1.25rem] items-center">
                  <Image
                    src={"/src/icons/Phone38.svg"}
                    alt="telefono"
                    width={0}
                    height={0}
                    className="w-[38px] h-[38px]"
                  ></Image>
                  <div>
                    <h4 className="font-medium text-jet-black text-[1rem]">
                      Telefono
                    </h4>
                    <p>{empresa.telefono}</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="mt-[1.5rem]  mb-[8rem]">
              <p className="font-semibold text-[1.125rem] text-jet-black text-left">
                Encuentra profesionales de salud
              </p>
              <div className="flex flex-row justify-between items-center mt-[1rem]">
                <span className="font-medium">Especialidad: </span>
                <select
                  onChange={onChangeSelectHandler}
                  className="w-[10rem] px-[6px] py-[8px] border-[1px] border-[#8D8D8D] rounded-md"
                  name="especialidad"
                  id="especialidad"
                >
                  {listaEspecialidades.map((itemEspecialidad) => {
                    return (
                      <option
                        key={itemEspecialidad.id.toString()}
                        value={itemEspecialidad.id.toString()}
                      >
                        {itemEspecialidad.nombre}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="text-[#455775] mt-[1.25rem] font-medium flex flex-row justify-between">
                <span className="ml-[3.75rem]">MEDICO</span>
                <span>VER HORARIO</span>
              </div>
              <div className="list flex flex-col divide-y divide-[#F0F0F0]">
                {medicoEspecialidadData.map((mEspecialidad) => {
                  return (
                    <MedicoHorarioItem
                      medicoEspecialidad={mEspecialidad}
                      key={`${mEspecialidad.id}`}
                    />
                  );
                })}
              </div>
            </section>
          </div>
        ) : (
          <p>
            Centro medico no encontrado. Asegurate de que la url sea correcta
          </p>
        )}
        {/* {empresa &&
          Object.keys(empresa).map((key) => {
            return (
              <p>
                {key}: {empresa[key]}
              </p>
            );
          })} */}
      </div>
    </div>
  );
};

export default EmpresaPerfilPublico;
export const getServerSideProps: GetServerSideProps<
  EmpresaPerfilPublicoProps
> = async ({ params }) => {
  const slug = params?.slug;
  let empresaData: Empresa | null;
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/empresa/slug/${slug}`
    );
    empresaData = res.data;
  } catch (error) {
    empresaData = null;
  }

  return {
    props: {
      empresa: empresaData,
    },
  };
};

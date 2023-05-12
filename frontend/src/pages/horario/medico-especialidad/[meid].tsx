import NavBar from "@/components/NavBar";
import { Bloque, Horario } from "@/utils/interfaces/Horario";
import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";

interface CasillaProps {
  bloque: Bloque;
  dia: Number;
}
const Casilla = ({ bloque, dia }: CasillaProps) => {
  const handleCasillaCliked = () => {
    console.log(`Clicked: ${dia} - ${bloque.horaInicio}`);
  };
  return (
    <button
      disabled={!bloque.active}
      onClick={() => handleCasillaCliked()}
      className={`${
        bloque.active ? "bg-[#0EC320]" : "bg-[#C3C5C7]"
      } w-[2.625rem] h-[2.625rem] rounded-[4px] flex flex-row justify-center items-center `}
    >
      {bloque.horaInicio}
    </button>
  );
};
interface MarcaHoraProps {
  hora: string;
}
const MarcaHora = ({ hora }: MarcaHoraProps) => {
  return (
    <div
      className={` flex flex-col justify-center items-center w-[4.375rem] h-[2.625rem] rounded-[2px] `}
    >
      {hora}
    </div>
  );
};

interface MedicoEspecialidadWithIdProps {
  medicoEspecialidadId: string;
}
const MedicoEspecialidadWithId = ({
  medicoEspecialidadId,
}: MedicoEspecialidadWithIdProps) => {
  const [medicoData, setMedicoData] = useState("");
  const [horarios, setHorarios] = useState<Horario[]>([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/horario/medico-especialidad/10`
      )
      .then((res) => {
        console.log(res.data);
        setHorarios(res.data);
      });
    return () => {};
  }, []);

  return (
    <div>
      <NavBar />
      <div className="mx-[1.5rem]">
        <h1>Horario por medico - especialidad</h1>
        <p>Medico Especialidad: {medicoEspecialidadId}</p>
        <br />
        <div className="calendario flex flex-col gap-[10px]">
          <div className="contenido flex flex-row gap-[4px] ">
            <div className="marca-hora flex flex-col gap-[12px]">
              <h4 className="w-[70px] h-[28px] flex flex-row justify-center items-center">
                HORA
              </h4>
              {horarios.map((horarioItem: Horario) => {
                if (horarioItem.diaSemana === "1") {
                  return horarioItem.horario.map((item: Bloque) => {
                    return (
                      <MarcaHora
                        key={item.horaInicio.toString()}
                        hora={item.horaInicio.toString()}
                      />
                    );
                  });
                }
              })}
            </div>
            <div className="flex flex-row gap-[14px] columnas-parent overflow-x-scroll w-[100%] border-[#F3F3F3] border-l-2 pl-[6px]">
              {horarios.map((horarioItem: Horario) => {
                return (
                  <div
                    key={horarioItem.diaSemana}
                    className="columna flex flex-col gap-[.75rem]"
                  >
                    <span className="font-semibold text-[18px] w-[42px] h-[28px] flex flex-row justify-center items-center">
                      {horarioItem.diaSemana}
                    </span>
                    {horarioItem.horario.map((item: Bloque) => {
                      return (
                        <Casilla
                          dia={Number(horarioItem.diaSemana)}
                          key={item.horaInicio.toString()}
                          bloque={item}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>

            {/* <span className="w-[42px] h-[28px] flex flex-row justify-center items-center">
                1
              </span>
              {horarios.map((horarioItem: Horario) => {
                if (horarioItem.diaSemana === "1") {
                  return horarioItem.horario.map((item: Bloque) => {
                    return (
                      <Casilla
                        dia={1}
                        key={item.horaInicio.toString()}
                        bloque={item}
                      />
                    );
                  });
                }
              })} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicoEspecialidadWithId;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const meId = params?.meid as string | undefined;
  return {
    props: {
      medicoEspecialidadId: meId,
    },
  };
};

import NavBar from "@/components/NavBar";
import { Bloque, Horario } from "@/utils/interfaces/Horario";
import { MedicoEspecialidadBasico } from "@/utils/interfaces/MedicoEspecialidadBasico";
import axios from "axios";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import generarDiaMesSemana from "../../../utils/functions/generarDiaMesSemana";
import obtenerNombreMes from "../../../utils/functions/obtenerNombreMes";
import { CitaSimple } from "@/utils/interfaces/CitaSimple";
import moment from "moment";
import { useRouter } from "next/router";

interface CasillaProps {
  bloque: Bloque;
  dia: number;
  mes?: number;
  medEspId: number | string;
  ocupado: boolean;
}
const Casilla = ({ bloque, dia, mes, ocupado, medEspId }: CasillaProps) => {
  const router = useRouter();
  const handleCasillaCliked = () => {
    const hoy = new Date();
    const fechaElegida = moment(
      `${hoy.getFullYear()}-${mes ? mes - 1 : hoy.getMonth()}-${dia}`,
      "YYYY-MM-DD"
    ).format("YYYY-MM-DD");
    // console.log(
    //   `http://localhost:3000/cita?mesp=${medEspId}&fecha=${fechaElegida}&hora=${bloque.horaInicio}`
    // );
    router.push(
      `http://localhost:3000/cita?mesp=${medEspId}&fecha=${fechaElegida}&hora=${bloque.horaInicio}`
    );
  };
  return (
    <button
      disabled={!bloque.active || ocupado}
      onClick={() => handleCasillaCliked()}
      className={`${
        bloque.active
          ? !ocupado
            ? "bg-[#0EC320]"
            : "bg-[#ff3535]"
          : "bg-[#C3C5C7]"
      } w-[2.625rem] h-[2.625rem] rounded-[4px] flex flex-row justify-center items-center `}
    >
      {bloque.active && (
        <Image
          src={ocupado ? "/src/icons/NoEntry.svg" : "/src/icons/Ok.svg"}
          alt="available"
          width={0}
          height={0}
          className="w-[24px] h-[24px]"
        />
      )}
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
  const [numeroMesConsulta, setNumeroMesConsulta] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [medicoEspecialidadData, setMedicoEspecialidadData] =
    useState<MedicoEspecialidadBasico | null>(null);
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [citasOcupadas, setCitasOcupadas] = useState<CitaSimple[]>([]);

  useEffect(() => {
    setNumeroMesConsulta(new Date().getMonth() + 1);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/horario/medico-especialidad/${medicoEspecialidadId}`
      )
      .then((res) => {
        // console.log(res.data);
        setHorarios(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/horario/medico-especialidad/${medicoEspecialidadId}/ocupados`
      )
      .then((res) => {
        console.log(res.data);
        setCitasOcupadas(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/medico-especialidad/${medicoEspecialidadId}`
      )
      .then((res) => {
        // console.log(res.data);
        setMedicoEspecialidadData(res.data);
      })
      .catch((err) => console.error(err));

    setLoading(false);
    return () => {};
  }, [medicoEspecialidadId]);

  const getDaysInMonth = (year: number, month: number): number => {
    const date = new Date(year, month, 0);
    return date.getDate();
  };
  // TODO: si la latencia rompe la interfaz, podemos considerar elementos de simulacion de carga y convertir las variables calculadas como parDiaMesSemana como states
  const now = new Date();
  const mesActualEnNumero = now.getMonth() + 1;
  const daysThisMonth = getDaysInMonth(now.getFullYear(), mesActualEnNumero);
  const initDay = now.getDate();
  const todayDayOfWeek = now.getDay();
  const parDiaMesSemana = generarDiaMesSemana(
    initDay,
    todayDayOfWeek,
    daysThisMonth
  );

  const handleClickAvanzarMes = () => {
    setNumeroMesConsulta((prev) => {
      return prev === 12 ? 12 : prev + 1;
    });
  };
  const handleClickRetrocederMes = () => {
    setNumeroMesConsulta((prev) => {
      return prev === mesActualEnNumero ? mesActualEnNumero : prev - 1;
    });
  };

  const comprobarSiFechaHoraEstaOcupada = (
    fecha: string,
    hora: string
  ): boolean => {
    // el detalle esque citasocupadas esta la hora en formato HH:mm:ss
    const rpta = citasOcupadas.some((cita) => {
      let formatoHoraMin = cita.hora;
      return cita.fecha == fecha && formatoHoraMin == `${hora}:00`;
    });
    return rpta;
  };

  return (
    <div>
      <NavBar />
      <div className="mx-[1.5rem]">
        {loading && (
          <div className="">
            <p className="font-semibold">Cargando ...</p>
          </div>
        )}
        <div className="flex flex-row gap-[.5rem] items-center justify-center my-[1rem]">
          <div className="w-[64px] h-[64px] rounded-[50%] bg-orange-400" />
          <div className="flex flex-col w-[12.5rem]">
            <p className="text-jet-black font-medium text-[18px]">
              {medicoEspecialidadData &&
                `${medicoEspecialidadData.medico.nombre} ${medicoEspecialidadData.medico.apellidos}`}
            </p>
            <div className="flex flex-row justify-between">
              <p className="text-[1rem] text-[#1779BA] font-medium">
                {medicoEspecialidadData?.especialidad.nombre}
              </p>
              <p className="text-[1rem] text-[#0EC320] font-medium">
                S/ {medicoEspecialidadData?.precio}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-blue w-full mb-[14px] flex flex-row justify-between items-center px-[2px]">
          <div
            onClick={() => handleClickRetrocederMes()}
            className="py-[5px] px-[5px]"
          >
            <Image
              src={"/src/icons/GoBack.svg"}
              alt="go forward"
              height={0}
              width={0}
              className="w-[32px] h-[32px] "
            ></Image>
          </div>
          <h2 className="py-[8px] text-white font-semibold text-[1.25rem] text-center ">
            {`${numeroMesConsulta} - ${obtenerNombreMes(
              numeroMesConsulta
            ).toUpperCase()}`}
          </h2>
          <div
            onClick={() => handleClickAvanzarMes()}
            className="py-[5px] px-[5px]"
          >
            <Image
              src={"/src/icons/GoForward.svg"}
              alt="go back"
              height={0}
              width={0}
              className="w-[32px] h-[32px] "
            ></Image>
          </div>
        </div>
        <div className="calendario flex flex-col gap-[10px]">
          <div className="contenido flex flex-row gap-[4px] ">
            <div className="marca-hora flex flex-col gap-[12px]">
              <h4 className="w-[70px] h-[28px] flex flex-row font-semibold justify-center items-center">
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
              {parDiaMesSemana.map((par) => {
                // horarios puede ser optimizado por un dict
                const horarioItem = horarios.find(
                  (v) => v.diaSemana === `${par.diaSemana}`
                );
                return (
                  horarioItem && (
                    <div
                      key={`${horarioItem.diaSemana}${par.diaMes}`}
                      className="columna flex flex-col gap-[.75rem]"
                    >
                      <span className="bg-white font-semibold text-[18px] w-[48px] h-[28px] flex flex-row justify-center items-center">
                        {par.diaMes}
                      </span>
                      {horarioItem.horario.map((item: Bloque) => {
                        return (
                          <Casilla
                            dia={Number(par.diaMes)}
                            key={item.horaInicio.toString()}
                            bloque={item}
                            medEspId={medicoEspecialidadId}
                            mes={now.getMonth() + 1}
                            ocupado={comprobarSiFechaHoraEstaOcupada(
                              `${now.getFullYear()}-${(now.getMonth() + 1)
                                .toString()
                                .padStart(2, "0")}-${par.diaMes
                                .toString()
                                .padStart(2, "0")}`,
                              item.horaInicio
                            )}
                          />
                        );
                      })}
                    </div>
                  )
                );
              })}
            </div>
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

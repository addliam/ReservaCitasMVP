import NavBar from "@/components/NavBar";
import { poppins } from "@/utils/fonts/poppins";
import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import useJwtToken from "@/hooks/useJwtToken";
import { MedicoEspecialidadItem } from "@/utils/interfaces/MedicoEspecialidadItem";
import { Horario } from "@/utils/interfaces/Horario";

const EspecialidadItemCard = ({
  data,
  active,
  clickHandler,
}: {
  data: MedicoEspecialidadItem;
  clickHandler: (id: any) => void;
  active?: boolean;
}) => {
  const handleClick = (id: number) => {
    console.log(`Especialidad Item clicked: ${id}`);
    clickHandler(id);
  };
  return (
    <div
      onClick={() => handleClick(data.id)}
      className={`${
        active
          ? " bg-blue-midnight text-white font-medium cursor-default"
          : "bg-[#ade5fa]  text-jet-black font-normal cursor-pointer"
      } rounded-[32px] w-fit px-5 py-2`}
    >
      {data.especialidad.nombre}
    </div>
  );
};

const Index = () => {
  const dias = ["L", "M", "X", "J", "V", "S", "D"];
  const [selectedDiaSemana, setSelectedDiaSemana] = useState(1);
  const [medicoEspecialidadLista, setMedicoEspecialidadLista] = useState<
    MedicoEspecialidadItem[]
  >([]);
  const [actualHorarioData, setActualHorarioData] = useState<Horario[]>([]);
  const [medicoEspSelectedId, setMedicoEspSelectedId] = useState(0);
  const [horasActivas, setHorasActivas] = useState<number[]>([]);
  const jwt = useJwtToken();

  useEffect(() => {
    let config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    if (jwt) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/medico-especialidad/medico/lista`,
          config
        )
        .then((res) => {
          setMedicoEspecialidadLista(res.data);
          setMedicoEspSelectedId(res.data[0].id);
        })
        .catch((err) => console.error(err));
    }
    return () => {};
  }, [jwt]);

  useEffect(() => {
    if (actualHorarioData.length > 0) {
      console.log(actualHorarioData);
      let actives: number[] = [];
      actualHorarioData[2].horario.forEach((hor) => {
        if (hor.horaInicio.endsWith(":00") && hor.active) {
          actives.push(Number(hor.horaInicio.split(":")[0]));
        }
      });
      console.log(actives);
      setHorasActivas(actives);
    }
    return () => {};
  }, [actualHorarioData]);

  useEffect(() => {
    if (medicoEspSelectedId) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/horario/medico-especialidad/${medicoEspSelectedId}`
        )
        .then((res) => {
          setActualHorarioData(res.data);
        })
        .catch((err) => console.error(err));
    }

    return () => {};
  }, [medicoEspSelectedId]);

  const horas = [];
  const horaInicio = 6;
  const horaFinal = 22;
  for (let i = horaInicio; i <= horaFinal; i++) {
    horas.push(i);
  }
  const handleClickHora = (hora: number) => {
    setHorasActivas((prev) => {
      let res: number[] = [];
      if (prev.includes(hora)) {
        res = prev.filter((e) => e !== hora);
      } else {
        res = [...prev, hora];
      }
      return res;
    });
  };
  const handleGuardarHorarioClick = () => {
    let horasOrdenadas = horasActivas.sort((a, b) => a - b);
    let result = [];
    let tempArray = [];
    for (let i = 0; i < horasOrdenadas.length; i++) {
      if (i === 0 || horasOrdenadas[i] !== horasOrdenadas[i - 1] + 1) {
        if (tempArray.length > 0) {
          result.push(tempArray);
          tempArray = [];
        }
      }
      tempArray.push(horasOrdenadas[i]);
    }
    if (tempArray.length > 0) {
      result.push(tempArray);
    }
    console.log(result);
    // (5) [6, 7, 8, 9, 10]
    // (5) [12, 13, 14, 15, 16]
    // (3) [20, 21, 22]
  };
  const handleClickDiaSemana = (id: number) => {
    console.log(`Dia semana clicked: ${id}`);
    setSelectedDiaSemana(id);
  };
  return (
    <div>
      <NavBar />
      <div className="mx-[1.5rem]">
        <h1
          className={`${poppins.className} text-center text-[1.75rem] mt-[1rem] mb-[.75rem] font-semibold`}
        >
          Horarios
        </h1>
        <div className="especialidades-container flex flex-row gap-2 justify-center mb-[1.25rem] flex-wrap">
          {medicoEspecialidadLista.map((medEspItem: MedicoEspecialidadItem) => {
            return (
              <EspecialidadItemCard
                key={medEspItem.id}
                data={medEspItem}
                clickHandler={setMedicoEspSelectedId}
                active={medEspItem.id === medicoEspSelectedId}
              ></EspecialidadItemCard>
            );
          })}
        </div>
        <div className="flex flex-row justify-between max-w-[460px] items-center">
          {dias.map((dia, indx) => {
            const active = indx === selectedDiaSemana - 1;
            return (
              <div
                key={indx}
                onClick={() => handleClickDiaSemana(indx + 1)}
                className={`${
                  active ? "bg-[#8960FF]" : "bg-white"
                } h-[40px] w-[40px] rounded-[50%] flex justify-center items-center cursor-pointer`}
              >
                <span
                  className={`${
                    active ? "text-white" : "text-jet-black"
                  } text-[1.5rem] font-medium`}
                >
                  {dia}
                </span>
              </div>
            );
          })}
        </div>
        <div className="horas flex flex-col gap-[0px] mt-[1rem]">
          {horasActivas &&
            horas.map((hora, indx) => {
              let active = false;
              if (horasActivas.includes(hora)) {
                active = true;
              }
              return (
                <div
                  key={indx}
                  onClick={() => handleClickHora(hora)}
                  className={`flex flex-row items-center gap-[1rem]`}
                >
                  <span className="text-[#636363] mx-[.5rem]">
                    {`${hora.toString().padStart(2, "0")}:00`}
                  </span>
                  <div
                    className={`${
                      active
                        ? "bg-[#0EC320] border-[#0EC320]"
                        : "bg-[#E4F4FF] border-[#887aff]"
                    } h-[42px] w-[70%] border-[1px] `}
                  />
                </div>
              );
            })}
        </div>
        <div className="button-parent mt-[2rem]">
          <button
            onClick={() => handleGuardarHorarioClick()}
            className="bg-blue-midnight w-full px-[1.25rem] py-[10px] text-white font-medium rounded-md"
          >
            Guardar horario
          </button>
        </div>
      </div>
      <div className="h-[30rem]"></div>
    </div>
  );
};

export default Index;

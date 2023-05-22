import React, { useEffect, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import axios, { AxiosRequestConfig } from "axios";
import moment from "moment";
import NavBar from "@/components/NavBar";
import { poppins } from "@/utils/fonts/poppins";
import useJwtToken from "@/hooks/useJwtToken";
import { Paciente } from "@/utils/interfaces/Paciente";
import { MedicoEspecialidadBasico } from "@/utils/interfaces/MedicoEspecialidadBasico";
import { useRouter } from "next/router";

interface PageCitaProps {
  mesp: string;
  fecha: string;
  hora: string;
}
interface MedicoEspecialidadCita extends MedicoEspecialidadBasico {
  medico: {
    id: number;
    nombre: string;
    apellidos: string;
    empresa: {
      id: number;
      nombre: string;
    };
  };
}
const IndexCita: NextPage<PageCitaProps> = ({ mesp, fecha, hora }) => {
  const [medicoEspecialidadData, setMedicoEspecialidadData] =
    useState<Partial<MedicoEspecialidadCita>>();
  const [miPerfilData, setMiPerfilData] = useState<Partial<Paciente>>();
  const jwt = useJwtToken();
  const router = useRouter();
  const handleClickConfirmarCita = () => {
    let config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    };
    let data = {
      medicoEspecialidadId: Number(mesp),
      fecha: moment(fecha, "YYYY-MM-DD").format("YYYY-MM-DD"),
      hora: moment(hora, "HH:mm").format("HH:mm"),
    };
    // console.log({ data });
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/cita/agendar`,
        data,
        config
      )
      .then((res) => {
        if (res.status === 201) {
          router.push("/cita/exito");
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/medico-especialidad/${mesp}`
      )
      .then((res) => {
        setMedicoEspecialidadData(res.data);
      })
      .catch((err) => console.error(err));
    if (jwt) {
      const config: AxiosRequestConfig = {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      };

      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/paciente/perfil`,
          config
        )
        .then((res) => {
          setMiPerfilData(res.data);
        })
        .catch((err) => console.error(err));
    }
    // TODO: validation on fecha hora not taken ON backend
    return () => {};
  }, [jwt]);

  return (
    <div>
      <NavBar />
      <div className="mx-[1.5rem]">
        <h1
          className={`text-center text-[28px] text-blue-midnight font-extrabold my-[1.25rem] ${poppins.className}`}
        >
          DETALLES DE CITA
        </h1>
        <div className="table-parent">
          {medicoEspecialidadData && (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-base text-left text-gray-500">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="px-2 py-3">
                      Item
                    </th>
                    <th scope="col" className="px-2 py-3">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-wrap"
                    >
                      Hospital
                    </th>
                    <td className="px-6 py-4">
                      {medicoEspecialidadData.medico?.empresa.nombre}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-wrap"
                    >
                      Paciente
                    </th>
                    <td className="px-6 py-4">{`${miPerfilData?.nombre} ${miPerfilData?.apellidos}`}</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-wrap"
                    >
                      DNI
                    </th>
                    <td className="px-6 py-4">{`${miPerfilData?.dni}`}</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-wrap"
                    >
                      Medico
                    </th>
                    <td className="px-6 py-4">{`${medicoEspecialidadData.medico?.nombre} ${medicoEspecialidadData.medico?.apellidos}`}</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-wrap"
                    >
                      Especialidad
                    </th>
                    <td className="px-6 py-4">
                      {medicoEspecialidadData.especialidad?.nombre}
                    </td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-wrap"
                    >
                      Fecha y hora
                    </th>
                    <td className="px-6 py-4">{`${moment(fecha, "YYYY-MM-DD")
                      .format("DD-MM-YYYY")
                      .toString()} ${hora}`}</td>
                  </tr>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-wrap"
                    >
                      Precio
                    </th>
                    <td className="px-6 py-4">{`S/ ${medicoEspecialidadData.precio}`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          <div className="button-confirmar-parent my-[1.5rem]">
            <button
              onClick={() => handleClickConfirmarCita()}
              className="bg-blue-midnight rounded-md text-white text-[18px] font-semibold text-center w-full py-3"
            >
              CONFIRMAR CITA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexCita;

export const getServerSideProps: GetServerSideProps<
  Partial<PageCitaProps>
> = async ({ query }) => {
  const { mesp, fecha, hora } = query;
  if (
    moment(fecha, "YYYY-MM-DD", true).isValid() &&
    moment(hora, "HH:mm", true).isValid()
  ) {
  } else {
  }

  return {
    props: {
      mesp: Array.isArray(mesp) ? mesp[0] : mesp,
      fecha: Array.isArray(fecha) ? fecha[0] : fecha,
      hora: Array.isArray(hora) ? hora[0] : hora,
    },
  };
};

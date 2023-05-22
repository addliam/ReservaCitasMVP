import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
// componentes
import PerfilPaciente from "@/components/perfil/PerfilPaciente";
import PerfilEmpresa from "@/components/perfil/PerfilEmpresa";
import NavBar from "@/components/NavBar";
// interfaces
import { Paciente } from "../../utils/interfaces/Paciente";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PerfilMedico from "@/components/perfil/PerfilMedico";
import { Medico } from "@/utils/interfaces/Medico";
// react-redux
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "@/store";
// import { update } from "@/store/reducers/jwtDecodedSlice";

interface PerfilProps {
  decodedToken: DecodedTokenProps;
}
interface DecodedTokenProps {
  id: string;
  rol: string;
}

const Perfil = ({ decodedToken }: PerfilProps) => {
  console.log("[-] Render perfil");
  const jwtToken = new Cookies().get("jwt");
  const [pacienteInfo, setPacienteInfo] = useState<Paciente | null>(null);
  const [medicoInfo, setMedicoInfo] = useState<Medico | null>(null);
  const router = useRouter();
  useEffect(() => {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || "";
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    if (decodedToken.rol !== "") {
      if (decodedToken.rol === "paciente") {
        axios
          .get(`${API_URL}/paciente/perfil`, config)
          .then((res) => {
            const paciente: Paciente = res.data;
            setPacienteInfo(paciente);
          })
          .catch((err) => console.error(err));
      }
      // si es medico
      if (decodedToken.rol === "medico") {
        axios
          .get(`${API_URL}/medico/perfil`, config)
          .then((res) => {
            const medico: Medico = res.data;
            setMedicoInfo(medico);
          })
          .catch((err) => console.error(err));
      }
    }
    return () => {};
  }, [decodedToken]);

  useEffect(() => {
    console.log("Running useEffect");
    if (typeof window !== undefined && pacienteInfo) {
      if (
        !pacienteInfo.dni ||
        !pacienteInfo.telefono ||
        !pacienteInfo.direccion ||
        !pacienteInfo.fechaNacimiento
      ) {
        notifyPerfilIncompleto();
      }
    }
  }, [pacienteInfo]);

  const notifyPerfilIncompleto = () => {
    toast("Completa tu perfil para continuar!");
  };

  return (
    <div>
      <ToastContainer />
      <NavBar />
      {decodedToken.rol === "paciente" && pacienteInfo && (
        <PerfilPaciente data={pacienteInfo} />
      )}
      {decodedToken.rol === "medico" && medicoInfo && (
        <PerfilMedico data={medicoInfo} />
      )}
      {decodedToken.rol === "empresa" ? <PerfilEmpresa /> : <></>}

      {decodedToken.id !== "" ? (
        <>
          <p>Id: {decodedToken.id}</p>
          <p>Rol: {decodedToken.rol}</p>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export const getServerSideProps = ({
  req,
  res,
}: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const cookies = new Cookies(req.headers.cookie);
  const jwtToken = cookies.get("jwt");
  var decodedToken = {
    id: "",
    rol: "",
  };
  try {
    decodedToken = jwtDecode(jwtToken);
  } catch (error) {
    console.error(error);
  }
  if (!jwtToken || !decodedToken.id) {
    return {
      redirect: {
        source: "/perfil",
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      decodedToken: decodedToken,
    },
  };
};

export default Perfil;

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
import { Paciente } from "../utils/interfaces/Paciente";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();
  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || "";
  useEffect(() => {
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
    }
    return () => {};
  }, [decodedToken, API_URL]);

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
      {decodedToken.rol === "empresa" ? <PerfilEmpresa /> : <></>}
      {decodedToken.rol === "medico" ? <PerfilEmpresa /> : <></>}

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
  decodedToken = jwtDecode(jwtToken);
  if (!jwtToken) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      decodedToken: decodedToken,
      // jwtToken: jwtToken ? jwtToken.toString() : "",
    },
  };
};

export default Perfil;
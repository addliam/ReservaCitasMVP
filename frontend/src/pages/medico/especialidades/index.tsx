import React, { useEffect, useState } from "react";
import { poppins } from "@/utils/fonts/poppins";
import NavBar from "@/components/NavBar";
import Image from "next/image";
import EspecialidadItem from "@/components/medico/especialidad/EspecialidadItem";
import axios, { AxiosRequestConfig } from "axios";
import useRole from "@/hooks/useRole";
import useJwtToken from "@/hooks/useJwtToken";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { GetServerSidePropsContext } from "next";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { DecodedToken } from "@/utils/interfaces/DecodedToken";
import { Especialidad } from "@/utils/interfaces/Especialidad";
import EditPrecioPopup from "@/components/medico/especialidad/EditPrecioPopup";

const Especialidades = () => {
  const [trigger, setTrigger] = useState<boolean>(false);
  const [especialidades, setEspecialidades] = useState<Especialidad[]>([]);
  const [showEditablePopUp, setShowEditablePopUp] = useState<boolean>(false);
  const [selectedEspecialidad, setSelectedEspecialidad] =
    useState<Especialidad>(especialidades[0]);

  const token = useJwtToken();
  const router = useRouter();

  const fetchData = async () => {
    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1` || "";
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${API_URL}/medico/especialidad`, config)
      .then((res) => {
        const esp: Especialidad[] = res.data;
        setEspecialidades(esp);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (trigger) {
      fetchData();
    }
    setTrigger(false);
    return () => {};
  }, [trigger]);

  useEffect(() => {
    if (token) {
      fetchData();
    }
    return () => {};
  }, [token]);

  const triggerFetch = () => {
    setTrigger(true);
  };

  const clickCloseEditable = () => {
    console.log("clickCloseEditable | especialidades");
    setShowEditablePopUp(false);
  };

  const clickEditButton = (id: Number) => {
    //
    const element = especialidades.find((e) => e.id === id);
    if (element) {
      setSelectedEspecialidad(element);
      setShowEditablePopUp(true);
    }
  };
  const clickAgregarEspecialidad = () => {
    router.push("/medico/especialidades/agregar");
  };

  return (
    <div className="relative">
      <NavBar />
      {showEditablePopUp && (
        <EditPrecioPopup
          especialidad={selectedEspecialidad}
          triggerFetch={triggerFetch}
          closeHandler={clickCloseEditable}
        />
      )}
      <div className="px-[1.5rem]">
        <h1
          className={`text-center text-[1.75rem] text-blue-midnight font-extrabold my-[20px] ${poppins.className}`}
        >
          Mis especialidades
        </h1>
        <div>
          <button
            className="text-white bg-blue-midnight flex flex-row items-center justify-center gap-2 rounded-md px-[2rem] py-[6px] ml-auto"
            onClick={() => clickAgregarEspecialidad()}
          >
            Agregar
            <Image
              src={"/src/icons/Add.svg"}
              alt="agregar"
              height={0}
              width={0}
              className="w-[28px] h-[28px]"
            ></Image>
          </button>
        </div>
        <section className="mt-[1.25rem] flex flex-col gap-[1.125rem] items-center">
          {especialidades.length > 0 &&
            especialidades.map((esp: Especialidad) => (
              <EspecialidadItem
                onEditClick={clickEditButton}
                key={`${esp.id}`}
                especialidad={esp}
              ></EspecialidadItem>
            ))}
        </section>
      </div>
    </div>
  );
};

export const getServerSideProps = ({
  req,
  res,
}: GetServerSidePropsContext<ParsedUrlQuery>) => {
  const cookies = new Cookies(req.headers.cookie);
  const jwtDecoded: DecodedToken = jwtDecode(cookies.get("jwt"));

  // if (jwtDecoded.rol != "medico") {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }
  return {
    props: {},
  };
};

export default Especialidades;

import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import useRole from "@/hooks/useRole";
import EditarPaciente from "@/components/editar/EditarPaciente";

import "react-toastify/dist/ReactToastify.css";

const editar = () => {
  const rol = useRole();
  return (
    <div>
      <ToastContainer />
      <NavBar />
      {rol === "paciente" && <EditarPaciente toastObj={toast} />}
      {rol === "medico" && <p>Trabajando en pantalla MEDICO</p>}
      {rol === "empresa" && <p>Trabajando en pantalla EMPRESA</p>}
    </div>
  );
};

export default editar;

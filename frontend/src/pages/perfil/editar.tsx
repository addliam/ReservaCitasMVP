import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import useRole from "@/hooks/useRole";
import EditarPaciente from "@/components/editar/EditarPaciente";
import EditarMedico from "@/components/editar/EditarMedico";

// estilos estan importados en app principal
// import "react-toastify/dist/ReactToastify.css";

const Editar = () => {
  const rol = useRole();
  return (
    <div>
      <ToastContainer />
      <NavBar />
      {rol === "paciente" && <EditarPaciente toastObj={toast} />}
      {rol === "medico" && <EditarMedico toastObj={toast} />}
      {rol === "empresa" && <p>Trabajando en pantalla EMPRESA</p>}
    </div>
  );
};

export default Editar;

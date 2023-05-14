import NavBar from "@/components/NavBar";
import HistorialCitaMedico from "@/components/historial-citas/HistorialCitaMedico";
import useRole from "@/hooks/useRole";
import { poppins } from "@/utils/fonts/poppins";
import React from "react";

const HistorialCitas = () => {
  // Posiblemente mas adelante haya historial citas para el paciente pero para el MVP solo Medico
  const rol = useRole();
  return (
    <div>
      <NavBar />
      <h1
        className={`${poppins.className} text-blue-midnight font-bold text-[28px] text-center my-[20px]`}
      >
        Historial de citas
      </h1>
      {rol === "medico" && <HistorialCitaMedico />}
    </div>
  );
};

export default HistorialCitas;

import NavBar from "@/components/NavBar";
import { poppins } from "@/utils/fonts/poppins";
import React from "react";

const historialCitas = () => {
  return (
    <div>
      <NavBar />
      <h1
        className={`${poppins.className} text-blue-midnight font-bold text-[28px] text-center my-[20px]`}
      >
        Historial de citas
      </h1>
    </div>
  );
};

export default historialCitas;

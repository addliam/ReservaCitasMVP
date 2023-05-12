import { ItemHospital } from "@/utils/interfaces/ItemHospital";
import { useRouter } from "next/router";
import React from "react";

interface HospitalProps {
  hospital: ItemHospital;
}

const HospitalItem = ({ hospital }: HospitalProps) => {
  const router = useRouter();
  const clickHospital = () => {
    router.push(`/hospital/${hospital.slug}`);
  };
  return (
    <div
      onClick={() => clickHospital()}
      className="hospital-item flex flex-row gap-[1rem] py-[.625rem] items-center justify-start"
    >
      <div className="w-[4rem] h-[4rem] rounded-[50%] bg-[#8960FF]" />
      <div>
        <h4 className="text-[1.125rem] font-semibold text-jet-black">
          {hospital.nombre}
        </h4>
        <p className="text-[1rem] text-[#414141]">{hospital.direccion}</p>
      </div>
    </div>
  );
};

export default HospitalItem;

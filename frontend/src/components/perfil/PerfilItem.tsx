import Image from "next/image";
import React from "react";
interface PerfilItemProps {
  item: string;
  valor: string;
  imagenSrc: string;
  imagenAlt: string | null;
}
const PerfilItem = ({ item, valor, imagenSrc, imagenAlt }: PerfilItemProps) => {
  return (
    <div className="flex flex-row gap-[1.5rem] items-center justify-start">
      <div className="w-[42px] h-[42px]">
        <Image
          src={imagenSrc}
          width={0}
          height={0}
          alt={imagenAlt ? imagenAlt : "profile item information"}
          className="w-[38px] h-[38px]"
        ></Image>
      </div>
      <div>
        <h6 className="text-[1.125rem] text-[#0b0b0b] font-semibold">{item}</h6>
        <p className="break-words max-w-[240px] text-[1rem] text-jet-black">
          {valor}
        </p>
      </div>
    </div>
  );
};

export default PerfilItem;

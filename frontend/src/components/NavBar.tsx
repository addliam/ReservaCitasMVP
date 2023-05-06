import React, { useState } from "react";
import Image from "next/image";
import useRole from "@/hooks/useRole";
import Link from "next/link";
import NavBarMenu from "./NavBarMenu";

const NavBar = () => {
  const [showMenu, setShowMenu] = useState<Boolean>(false);
  const rol = useRole();
  const togglerHandler = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <nav className="relative bg-blue w-full h-[64px] flex justify-end items-center flex-col">
      <div
        onClick={togglerHandler}
        className="absolute px-[4px] py-[4px] top-[10px] right-[20px] z-20"
      >
        <Image
          src="/src/icons/MenuRounded.svg"
          alt="white menu rounded"
          width={0}
          height={0}
          className="w-[2.125rem] h-[2.125rem]"
        />
      </div>
      {showMenu ? <NavBarMenu role={rol} /> : <></>}
    </nav>
  );
};

export default NavBar;

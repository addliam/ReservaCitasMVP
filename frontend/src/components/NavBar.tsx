import React from "react";
import Image from "next/image";
const NavBar = () => {
  return (
    <nav className="bg-blue w-full h-[4rem] flex justify-end items-center ">
      <div className="mr-[1.125rem]">
        <Image
          src="/src/icons/MenuRounded.svg"
          alt="white menu rounded"
          width={34}
          height={34}
        />
      </div>
    </nav>
  );
};

export default NavBar;

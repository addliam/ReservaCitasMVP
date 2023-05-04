import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
// import cookie from "js-cookie";
import Cookies from "universal-cookie";

const LogoutButton = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    const cookies = new Cookies();
    cookies.remove("jwt");
    // cookie.remove("jwt");
    router.push("/");
    console.log("Eliminando cookies");
  };
  return (
    <button
      onClick={() => logoutHandler()}
      className="bg-[#DFDFDF] py-[.375rem] px-[1rem] flex flex-row gap-[.75rem] items-center rounded-md"
    >
      <Image
        src={"/src/icons/Logout.svg"}
        width={0}
        height={0}
        alt="logout"
        className="w-[38px] h-[38px]"
      ></Image>
      <span className="font-medium text-[#333333]">Cerrar sesión</span>
    </button>
  );
};

export default LogoutButton;

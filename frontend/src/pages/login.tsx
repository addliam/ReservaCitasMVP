import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { poppins } from "../utils/fonts/poppins";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import Image from "next/image";
import GoogleLoginButton from "@/components/GoogleLoginButton";

const Login = () => {
  const [tipoUsuario, setTipoUsuario] = useState("paciente");

  const onSuccessHandler = (credentialResponse: CredentialResponse | void) => {
    console.log("onSuccessHandler");
    console.log(credentialResponse);
  };
  const onErrorHandler = (v: void) => {
    console.error("Login fallido!");
  };
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const rol = event.target.value;
    console.log(rol);
    setTipoUsuario(rol);
  };
  return (
    <div>
      <NavBar></NavBar>
      <div className=" px-[1.5rem]">
        <section className="login-with-google">
          <h1
            className={`my-[1.875rem] text-[2.5rem] text-center font-bold text-blue-midnight ${poppins.className}`}
          >
            Bienvenido
          </h1>
          <div className="flex justify-between items-center">
            <label className="text-jet-black text-[1.125rem] font-medium">
              Tipo de cuenta:
            </label>
            <select
              name="tipo-cuenta"
              id="tipo-cuenta"
              value={tipoUsuario}
              onChange={handleSelectChange}
              className="select hover:text-jet-black text-jet-black border-[1px] border-[#C3C5C7] px-[3rem] py-[.5rem] rounded-[6px] mr-"
            >
              <option className="hover:text-orange-600" value="paciente">
                Paciente
              </option>
              <option value="medico">Medico</option>
              <option value="empresa">Empresa</option>
            </select>
          </div>
          <div className="my-[1.875rem] w-full flex justify-center ">
            {tipoUsuario === "paciente" ? (
              <GoogleLoginButton
                onSuccess={() => onSuccessHandler}
                onError={() => onErrorHandler}
                rol={"paciente"}
              />
            ) : (
              <></>
            )}
            {tipoUsuario === "medico" ? (
              <GoogleLoginButton
                onSuccess={() => onSuccessHandler}
                onError={() => onErrorHandler}
                rol={"medico"}
              />
            ) : (
              <></>
            )}
            {tipoUsuario === "empresa" ? (
              <GoogleLoginButton
                onSuccess={() => onSuccessHandler}
                onError={() => onErrorHandler}
                rol={"empresa"}
              />
            ) : (
              <></>
            )}
          </div>
        </section>
        <div className="flex flex-row w-full justify-between h-fit items-center ">
          <div className="w-[40%] h-[2px] bg-[#D9D9D9]" />
          <div>
            <span className="text-[#D9D9D9]">o</span>
          </div>
          <div className="w-[40%] h-[2px] bg-[#D9D9D9]" />
        </div>
        <section className="login-with-credentials mt-[1.25rem]">
          <form action="">
            <div>
              <label
                htmlFor="email"
                className="font-semibold text-blue-midnight"
              >
                Correo electrónico
              </label>
              <div className="w-full mt-[.875rem] h-[2.875rem] border-[#8D8D8D] rounded-[8px] border-[1.5px] flex flex-row">
                <input
                  className="text-jet-black w-full px-[.875rem] rounded-[8px]"
                  type="text"
                  placeholder="email@gmail.com"
                />
                <div className="px-[.5rem] my-auto">
                  <Image
                    width={34}
                    height={34}
                    alt="email"
                    src="/src/icons/Mail.svg"
                  ></Image>
                </div>
              </div>
            </div>
            <div className="mt-[1.5rem]">
              <label
                htmlFor="email"
                className="font-semibold text-blue-midnight"
              >
                Contraseña
              </label>
              <div className="w-full mt-[.875rem] h-[2.875rem] border-[#8D8D8D] rounded-[8px] border-[1.5px] flex flex-row">
                <input
                  className="text-jet-black w-full px-[.875rem] rounded-[8px]"
                  type="text"
                  placeholder="********"
                />
                <div className="px-[.5rem] my-auto">
                  <Image
                    width={34}
                    height={34}
                    alt="password"
                    src="/src/icons/Password.svg"
                  ></Image>
                </div>
              </div>
            </div>
            <div className="mt-[2rem]">
              <button
                className="bg-blue-midnight rounded-[6px] text-white font-medium w-full py-[12px]"
                type="submit"
              >
                Inicia sesion
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;

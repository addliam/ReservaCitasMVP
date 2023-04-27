import Image from "next/image";
import { Inter } from "next/font/google";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { error } from "console";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const onSuccessHandler = (credentialResponse: CredentialResponse | void) => {
    console.log(credentialResponse);
  };
  const onErrorHandler = (v: void) => {
    console.error("Login fallido!");
  };
  return (
    <main className={`${inter.className} mx-auto `}>
      <section className="google-login max-w-[18em] border-black border-[1px ] mx-auto">
        <h1 className="text-[1.4rem] text-center font-semibold my-2">
          Inicia sesion
        </h1>
        <p className="mb-4 text-left px-2 leading-5">
          Inicia y disfruta de todos los beneficios que tenemos para ti
        </p>
        <div>
          <GoogleLogin onSuccess={onSuccessHandler} onError={onErrorHandler} />
        </div>
      </section>
    </main>
  );
}

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { poppins } from "@/utils/fonts/poppins";
import { HashLoader } from "react-spinners";

const AuthPage = () => {
  const [pushCalled, setPushCalled] = useState(false);
  const [localStorageReady, setLocalStorageReady] = useState(false);
  const router = useRouter();
  const code = router.query.code;

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (pushCalled) {
        return;
      }
      if (code) {
        const jwtToken = code as string;
        const expirationInDays = 3;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + expirationInDays);
        localStorage.setItem("jwt", jwtToken);
        setLocalStorageReady(true);
      } else {
        if (!pushCalled && localStorageReady) {
          router.push("/");
          setPushCalled(true);
        }
      }
    }
  }, [code, router, pushCalled, localStorageReady]);

  useEffect(() => {
    if (localStorageReady) {
      router.push("/hospital/buscar");
      setPushCalled(true);
    }
    return () => {};
  }, [localStorageReady]);

  return (
    <div>
      <section className="flex justify-center items-center flex-col h-screen">
        <HashLoader loading={true} color="#36d7b7" />
        <h1
          className={`${poppins.className} my-[1.5rem] text-3xl font-bold text-[#36d7b7] text-center`}
        >
          Online Cita
        </h1>
      </section>
    </div>
  );
};

export default AuthPage;

import NavBar from "@/components/NavBar";
import { poppins } from "@/utils/fonts/poppins";
import React, { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import ReactCanvasConfetti from "react-canvas-confetti";
import Link from "next/link";

const canvasStyles: React.CSSProperties = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

const Exito = () => {
  const refAnimationInstance = useRef<any>(null);
  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance;
  }, []);
  const makeShot = useCallback((particleRatio: number, opts: any) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    makeShot(0.2, {
      spread: 60,
    });
    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  useEffect(() => {
    let customTimeout = setTimeout(() => {
      fire();
    }, 600);
    return () => {
      clearTimeout(customTimeout);
    };
  }, []);

  return (
    <div>
      <NavBar />
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      <div className="mx-[1.5rem]">
        <div className="image-container mt-[2rem] flex justify-center items-center">
          <Image
            src={
              "/src/icons/vecteezy_little-people-characters-make-an-online-schedule-in-the-tablet_13441476 1.svg"
            }
            alt="pequenas personas realizando un agendamento online en tableta"
            width={0}
            height={0}
            priority={true}
            className="h-[300px] w-[300px]"
          ></Image>
        </div>
        <h1
          className={`${poppins.className} mt-[.5rem] text-center text-[2rem] font-semibold`}
        >
          Felicidades!
        </h1>
        <p className="text-center font-medium text-jet-black text-[18px] caret">
          Acabas de agendar tu cita con exito.
        </p>
        <div className="button-parent mt-[1rem] flex justify-center">
          <Link
            href={"/cita/historial"}
            className="bg-blue-midnight text-white font-medium px-[2rem] py-[.625rem] rounded-lg"
          >
            Ver mis citas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Exito;

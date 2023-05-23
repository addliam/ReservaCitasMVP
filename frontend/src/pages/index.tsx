import Image from "next/image";
import NavBar from "@/components/NavBar";
import Link from "next/link";
import { poppins } from "@/utils/fonts/poppins";

export default function Home() {
  return (
    <main>
      <NavBar />
      <section className="px-[1.5rem] bg-blue text-white py-[1.25rem] relative ">
        <div className="bubble h-[104px] w-[104px] rounded-[50%] absolute top-0 -left-8 z-10 " />
        <div className="title-container">
          <div className="relative">
            <h1
              className={`${poppins.className} ml-[60px] font-bold text-[2.75rem] text-white leading-[44px]`}
            >
              Online
            </h1>
          </div>
          <div className="relative">
            <h1
              className={`${poppins.className} ml-[150px] font-bold text-[2.75rem] text-white leading-[44px]`}
            >
              Cita
            </h1>
          </div>
        </div>
        <p className="text-[17px] font-medium text-center mx-auto mt-[1rem]">
          La forma más fácil de agendar <br />
          <span className="">citas médicas</span>
        </p>
        <div className="flex flex-row justify-center items-center">
          <Link
            className="inline-block mt-[1.5rem] rounded-[40px] bg-blue-midnight text-white text-[18px] font-medium px-[2rem] py-[10px] "
            href={"/login"}
          >
            Empieza ahora
          </Link>
        </div>
        <div className="mt-[1.5rem] ">
          <Image
            src={
              "/src/icons/e_vecteezy_illustration-vector-graphic-of-male-doctor-wearing_10560789 1.svg"
            }
            alt="vector grafico de doctor usando bata blanca"
            height={0}
            width={0}
            priority={true}
            className="w-[320px] h-[273px] mx-auto "
          ></Image>
        </div>
      </section>
      <section className="mx-[1.5rem] my-[2.5rem]">
        <h3
          className={`${poppins.className} text-[1.5rem] relative font-semibold text-blue-midnight}`}
          // before:absolute before:bg-[#D88B6C] before:w-[300px] before:h-[4px] before:-bottom-1 before:-left-8`}
        >
          ¿Qué es OnlineCita?
        </h3>
        <Image
          src={
            "/src/icons/illustration-graphic-cartoon-character-of-planning-business-free-vector 1.svg"
          }
          alt="vector grafico de caracter animado planeando en un calendario"
          height={0}
          width={0}
          className="w-[348px] h-[249px] mx-auto mt-[2rem] "
        ></Image>
        <p className="text-jet-black text-center px-[2rem] font-normal mt-[1.5rem]">
          Agenda citas médicas fácilmente desde tu dispositivo móvil. Olvídate
          de largas esperas y llamadas interminables. ¡Agenda en línea con
          nosotros!
        </p>
      </section>
      <section className="px-[1.5rem] py-[2.5rem] bg-blue text-white">
        <h3
          className={`${poppins.className} text-[1.5rem] relative font-semibold text-right text-white}`}
          //  before:absolute before:bg-[#D88B6C] before:w-[300px] before:h-[4px] before:-bottom-1 before:-right-5`}
        >
          ¿Por qué elegirnos?
        </h3>
        <div className="grid grid-cols-2 grid-rows-2 mt-[2rem]">
          <div className="flex flex-col mx-auto justify-center items-center gap-[.5rem] max-w-[170px]">
            <Image
              src={"/src/icons/TaskPlanning.svg"}
              alt="planificador de tareas"
              height={0}
              width={0}
              className="w-[80px] h-[80px] mx-auto"
            ></Image>
            <p className="text-gray-50 text-center">
              Agendar tus citas nunca fue tan fácil
            </p>
          </div>
          <div className="flex flex-col mx-auto my-[.75rem] justify-center items-center gap-[.5rem] max-w-[170px]">
            <Image
              src={"/src/icons/Stethoscope.svg"}
              alt="estetoscopia de medico"
              height={0}
              width={0}
              className="w-[80px] h-[80px] mx-auto "
            ></Image>
            <p className="text-gray-50 text-center">
              Acceso a una amplia red de profesionales
            </p>
          </div>
          <div className="flex flex-col mx-auto my-[.75rem] justify-center items-center gap-[.5rem] max-w-[170px]">
            <Image
              src={"/src/icons/UnreadMessage.svg"}
              alt="mensaje sin leer"
              height={0}
              width={0}
              className="w-[80px] h-[80px] mx-auto "
            ></Image>
            <p className="text-gray-50 text-center">
              Notificaciones para recordate tus citas
            </p>
          </div>
          <div className="flex flex-col mx-auto my-[.75rem] justify-center items-center gap-[.5rem] max-w-[170px]">
            <Image
              src={"/src/icons/SecurityLock.svg"}
              alt="planificador de tareas"
              height={0}
              width={0}
              className="w-[80px] h-[80px] mx-auto "
            ></Image>
            <p className="text-gray-50 text-center">
              Seguridad en tus datos personales y médicos
            </p>
          </div>
        </div>
      </section>
      <section className="mx-[1.5rem] my-[2.5rem]">
        <h3
          className={`${poppins.className} text-[1.5rem] relative font-semibold text-blue-midnight}`}
          //  before:absolute before:bg-[#D88B6C] before:w-[300px] before:h-[4px] before:-bottom-1 before:-left-8`}
        >
          ¿Cómo funciona?
        </h3>

        <div className="flex flex-row mt-[1rem]">
          <h5
            className={`${poppins.className} font-bold text-[2.5rem] text-[#D88B6C] `}
          >
            1.
          </h5>
          <p className="text-jet-black text-left px-[2rem] text-base font-normal mt-[1rem]">
            Regístrate en nuestra plataforma con tu cuenta de Google
          </p>
        </div>
        <div className="mt-[.75rem]">
          <Image
            src={"/src/icons/Google.svg"}
            alt="google colorido"
            height={0}
            width={0}
            className="w-[80px] h-[80px] mx-auto "
          ></Image>
        </div>
        <div className="flex flex-row mt-[1rem]">
          <h5
            className={`${poppins.className} font-bold text-[2.5rem] text-[#D88B6C] `}
          >
            2.
          </h5>
          <p className="text-jet-black text-left px-[2rem] text-base font-normal mt-[1rem]">
            Selecciona el especialista y la fecha que prefieras para tu cita{" "}
          </p>
        </div>
        <div className="mt-[.75rem]">
          <Image
            src={"/src/icons/Planner.svg"}
            alt="planificador calendario"
            height={0}
            width={0}
            className="w-[100px] h-[100px] mx-auto "
          ></Image>
        </div>
        <div className="flex flex-row mt-[1rem]">
          <h5
            className={`${poppins.className} font-bold text-[2.5rem] text-[#D88B6C] `}
          >
            3.
          </h5>
          <p className="text-jet-black text-left px-[2rem] text-base font-normal mt-[1rem]">
            Regístrate en nuestra plataforma con tu cuenta de Google
          </p>
        </div>
        <div className="mt-[.75rem]">
          <Image
            src={"/src/icons/Received.svg"}
            alt="correo azul con check verde recibido"
            height={0}
            width={0}
            className="w-[100px] h-[100px] mx-auto "
          ></Image>
        </div>
        <div className="flex flex-row justify-center items-center mb-[32px]">
          <Link
            className="inline-block mt-[1.5rem] rounded-[40px] bg-blue-midnight text-white text-[18px] font-medium px-[2rem] py-[10px] "
            href={"/login"}
          >
            ¡Reserva tu cita médica hoy!
          </Link>
        </div>
      </section>
    </main>
  );
}

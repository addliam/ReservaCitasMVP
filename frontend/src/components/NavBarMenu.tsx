import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
interface LinkComponentProps {
  title: string;
  href: string;
  active?: boolean;
  toggler?: () => void;
}
const LinkComponent = ({
  title,
  href,
  active,
  toggler,
}: LinkComponentProps) => {
  const router = useRouter();
  const clickedLink = () => {
    router.push(`${href}`);
    if (toggler) {
      toggler();
    }
  };
  return (
    <li
      className={`py-[10px] px-[18px] rounded-md ${
        active ? "bg-blue-midnight text-white" : "bg-[#3498DB] text-jet-black"
      }`}
    >
      <a
        onClick={clickedLink}
        className={` py-[6px] px-[4px] font-medium text-[1.125rem] cursor-pointer `}
      >
        {title}
      </a>
    </li>
  );
};
interface NavBarMenuProps {
  role: string;
  toggler?: () => void;
  showMenu: boolean;
}
const NavBarMenu = ({ showMenu, role, toggler }: NavBarMenuProps) => {
  // TODO: make a default navbar, si el usuario no esta registrado no se muestra ninguna opcion
  // TODO: poner un identificador encima del menu del navbar como letra e icono para facilmente saber el tipo de usuario
  return (
    <>
      {showMenu ? (
        <>
          {role === "" ? (
            <div className="overlap absolute top-[64px] bg-[#3498DB] w-[100%] pt-[1rem] pb-[8rem] min-h-[50rem] z-10">
              <ul className="px-[1.5rem] py-[1.875rem] flex flex-col gap-[.75rem]">
                <LinkComponent
                  toggler={toggler}
                  href="/"
                  title="Inicio"
                  active={true}
                />
                <LinkComponent
                  href="/empresas"
                  title="Sin registrar"
                  active={false}
                  toggler={toggler}
                />
                <LinkComponent
                  toggler={toggler}
                  href="/buscar"
                  title="Todo tio"
                  active={false}
                />
              </ul>
            </div>
          ) : (
            <></>
          )}
          {role === "paciente" ? (
            <div className="overlap absolute top-[64px] bg-[#3498DB] w-[100%] pt-[1rem] pb-[8rem] min-h-[50rem] z-10">
              <ul className="px-[1.5rem] py-[1.875rem] flex flex-col gap-[.75rem]">
                <LinkComponent
                  toggler={toggler}
                  href="/"
                  title="Inicio"
                  active={true}
                />
                <LinkComponent
                  toggler={toggler}
                  href="/perfil"
                  title="Mi perfil"
                  active={false}
                />
                <LinkComponent
                  toggler={toggler}
                  href="/hospital/buscar"
                  title="Buscar hospitales"
                  active={false}
                />
                <LinkComponent
                  toggler={toggler}
                  href="/cita/historial"
                  title="Mis citas"
                  active={false}
                />
              </ul>
            </div>
          ) : (
            <></>
          )}
          {role === "medico" ? (
            <div className="overlap absolute top-[64px] bg-[#3498DB] w-[100%] pt-[1rem] pb-[8rem] min-h-[50rem] z-10">
              <ul className="px-[1.5rem] py-[1.875rem] flex flex-col gap-[.75rem]">
                <LinkComponent
                  toggler={toggler}
                  href="/"
                  title="Inicio"
                  active={true}
                />
                <LinkComponent
                  toggler={toggler}
                  href="/perfil"
                  title="Mi perfil"
                  active={false}
                />
                <LinkComponent
                  toggler={toggler}
                  href="/hospital/buscar"
                  title="Buscar hospitales"
                  active={false}
                />
                <LinkComponent
                  toggler={toggler}
                  href="/medico/especialidades"
                  title="Especialidades"
                  active={false}
                />
                <LinkComponent
                  toggler={toggler}
                  href="/medico/historial-citas"
                  title="Historial de citas"
                  active={false}
                />
                <LinkComponent
                  toggler={toggler}
                  href="/medico/horario"
                  title="Horarios"
                  active={false}
                />
                <LinkComponent
                  toggler={toggler}
                  href="/"
                  title="Informes y estadisticas"
                  active={false}
                />
              </ul>
            </div>
          ) : (
            <></>
          )}
          {role === "empresa" ? (
            <div className="overlap absolute top-[64px] bg-[#3498DB] w-[100%] pt-[1rem] pb-[8rem] min-h-[50rem] z-10">
              <ul className="px-[1.5rem] py-[1.875rem] flex flex-col gap-[.75rem]">
                <LinkComponent
                  toggler={toggler}
                  href="/"
                  title="Inicio"
                  active={true}
                />
                <LinkComponent
                  toggler={toggler}
                  href="/perfil"
                  title="Mi perfil"
                  active={false}
                />
                <LinkComponent
                  toggler={toggler}
                  href="/empresa"
                  title="Empresa"
                  active={false}
                />
              </ul>
            </div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default NavBarMenu;

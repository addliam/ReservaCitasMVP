import Link from "next/link";
import React from "react";
interface LinkComponentProps {
  title: string;
  href: string;
  active?: boolean;
}
const LinkComponent = ({ title, href, active }: LinkComponentProps) => {
  return (
    <li
      className={`py-[10px] px-[18px] bg-blue-midnight rounded-md ${
        active ? "bg-blue-midnight text-white" : "bg-[#3498DB] text-jet-black"
      }`}
    >
      <Link
        className={` py-[6px] px-[4px] font-medium text-[1.125rem] `}
        href={href}
      >
        {title}
      </Link>
    </li>
  );
};
interface NavBarMenuProps {
  role: string;
}
const NavBarMenu = ({ role }: NavBarMenuProps) => {
  return (
    <>
      {role === "paciente" ? (
        <div className="overlap absolute top-[64px] bg-[#3498DB] w-[100vw] pt-[1rem] pb-[8rem] min-h-[34rem] z-10">
          <ul className="px-[1.5rem] py-[1.875rem] flex flex-col gap-[.75rem]">
            <LinkComponent href="/" title="Inicio" active={true} />
            <LinkComponent href="/perfil" title="Mi perfil" active={false} />
            <LinkComponent href="/paciente" title="Paciente" active={false} />
          </ul>
        </div>
      ) : (
        <></>
      )}
      {role === "medico" ? (
        <div className="overlap absolute top-[64px] bg-[#3498DB] w-[100vw] pt-[1rem] pb-[8rem] min-h-[34rem] z-10">
          <ul className="px-[1.5rem] py-[1.875rem] flex flex-col gap-[.75rem]">
            <LinkComponent href="/" title="Inicio" active={true} />
            <LinkComponent href="/perfil" title="Mi perfil" active={false} />
            <LinkComponent
              href="/medico/especialidades"
              title="Especialidades"
              active={false}
            />
            <LinkComponent
              href="/medico/historial-citas"
              title="Historial de citas"
              active={false}
            />
            <LinkComponent
              href="/medico/horarios"
              title="Horarios"
              active={false}
            />
            <LinkComponent
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
        <div className="overlap absolute top-[64px] bg-[#3498DB] w-[100vw] pt-[1rem] pb-[8rem] min-h-[34rem] z-10">
          <ul className="px-[1.5rem] py-[1.875rem] flex flex-col gap-[.75rem]">
            <LinkComponent href="/" title="Inicio" active={true} />
            <LinkComponent href="/perfil" title="Mi perfil" active={false} />
            <LinkComponent href="/empresa" title="Empresa" active={false} />
          </ul>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default NavBarMenu;

import React, { useRef, useState } from "react";
import { poppins } from "@/utils/fonts/poppins";
import Image from "next/image";
import { useEffect } from "react";

interface EditarPacienteProps {
  valor: string | undefined;
  type?: string;
  handleChange: (newValue: string) => void;
}
const CustomInputEdit = ({
  valor,
  handleChange,
  type,
}: EditarPacienteProps) => {
  const inputAreaRef = useRef<HTMLInputElement>(null);
  const [enableEdit, setEnableEdit] = useState(false);

  const clickEditValueHandler = () => {
    setEnableEdit(true);
  };
  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChange(e.target.value);
  };

  useEffect(() => {
    if (inputAreaRef.current) {
      inputAreaRef.current.focus();
    }
    return () => {};
  }, [enableEdit]);

  return (
    <div className="">
      <div className="border-[1px] mt-[.5rem] rounded-md border-[#8D8D8D] flex flex-row justify-between items-center">
        <input
          onChange={onChangeInputHandler}
          ref={inputAreaRef}
          disabled={!enableEdit}
          type={type ? type : "text"}
          value={valor}
          className={`rounded-l-md w-full h-[2.625rem] bg-white px-[.5rem] ${
            true ? "text-[#707070]" : null
          }`}
        />
        <div
          onClick={() => clickEditValueHandler()}
          className="flex h-[2.625rem] justify-center items-center px-[.75rem] bg-[#ececec] hover:bg-[#d4d4d4] rounded-r-md"
        >
          <Image
            src="/src/icons/Edit.svg"
            height={0}
            width={0}
            alt="blue pencil edit"
            className="w-[28px] h-[28px]"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default CustomInputEdit;

import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";

interface decodedProps {
  rol: string;
  id: Number;
  iat: Number;
  exp: Number;
}

export function useRole(): string {
  const [rol, setRol] = useState("");
  const router = useRouter();

  useEffect(() => {
    const jwtToken = new Cookies().get("jwt");
    if (!jwtToken) {
      router.push("/login");
    } else {
      const decoded: decodedProps = jwtDecode(jwtToken);
      setRol(decoded.rol);
      console.log(`Rol: ${rol}`);
    }
  }, [rol]);

  return rol;
}

export default useRole;

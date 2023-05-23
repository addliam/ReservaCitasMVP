import { useState, useEffect } from "react";
// import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { DecodedToken } from "@/utils/interfaces/DecodedToken";

export function useRole(): string {
  const [rol, setRol] = useState("");

  useEffect(() => {
    if (typeof window !== undefined) {
      const jwtToken = localStorage.getItem("jwt");
      if (!jwtToken) {
        setRol("guest");
      } else {
        const decoded: DecodedToken = jwtDecode(jwtToken);
        setRol(decoded.rol);
      }
    }
  }, [rol]);

  return rol;
}

export default useRole;

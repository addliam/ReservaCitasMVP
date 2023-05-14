import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { DecodedToken } from "@/utils/interfaces/DecodedToken";

export function useRole(): string {
  const [rol, setRol] = useState("");
  const router = useRouter();

  useEffect(() => {
    const jwtToken = new Cookies().get("jwt");
    if (!jwtToken) {
      router.push("/login");
    } else {
      const decoded: DecodedToken = jwtDecode(jwtToken);
      setRol(decoded.rol);
    }
  }, [rol, router]);

  return rol;
}

export default useRole;

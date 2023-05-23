import React, { useEffect, useState } from "react";
// import Cookies from "universal-cookie";

const useJwtToken = () => {
  const [jwtToken, setJwtToken] = useState("");
  useEffect(() => {
    // asegurarnos que estamos en el lado del cl teniendo localStorage
    if (typeof window !== undefined) {
      const data = localStorage.getItem("jwt") || "null";
      setJwtToken(data);
    }
    return () => {};
  }, []);

  return jwtToken;
};

export default useJwtToken;

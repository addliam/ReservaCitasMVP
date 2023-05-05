import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";

const useJwtToken = () => {
  const [jwtToken, setJwtToken] = useState("");
  useEffect(() => {
    const jwt = new Cookies().get("jwt");
    setJwtToken(jwt);
    return () => {};
  }, []);

  return jwtToken;
};

export default useJwtToken;

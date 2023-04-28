import { useEffect, useState } from "react";

export default function useApi() {
  const [api, setApi] = useState<string>("");

  useEffect(() => {
    const development = process.env.REACT_APP_DEVELOPMENT;
    if (development) setApi("http://localhost:3001");
    else setApi("https://api.infotecnik.cat");
  }, []);
  
  return api;
}

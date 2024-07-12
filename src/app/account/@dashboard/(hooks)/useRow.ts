import { useEffect, useState } from "react";

export const useRow = () => {
  const [openQr, setOpenQr] = useState(false);
  const [code, setCode] = useState<string | undefined>();
  const handleQrView = (agentCode: string | undefined) => () => {
    if (agentCode) {
      setCode(agentCode);
    }
  };

  useEffect(() => {
    if (code) {
      console.log(code);
      setOpenQr(true);
    }
  }, [code]);

  return { openQr, setOpenQr, handleQrView, code };
};

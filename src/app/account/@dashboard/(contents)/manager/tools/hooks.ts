import { createAgentCode } from "@/trpc/account/codes/create";
import { createRefNo, errHandler } from "@/utils/helpers";
import { onSuccess } from "@/utils/toast";
import { useState } from "react";

type ManagerToolParams = {
  userId: string | undefined;
  branchCode: string | undefined;
};
export const useManagerTools = ({ userId, branchCode }: ManagerToolParams) => {
  const [agentCode, setCode] = useState<string | undefined>();
  const [storingCode, setStoringCode] = useState(false);

  const storeCode = (code: string) => {
    if (!userId && !branchCode) return;
    createAgentCode({ userId, branchCode, code })
      .then(() => {
        setStoringCode(false);
        onSuccess("Code generation successful!");
      })
      .catch(errHandler(setStoringCode, "handleCreateAgentCode"));
  };
  const handleGenerate = async () => {
    setStoringCode(true);
    await createRefNo(new Date().getTime().toString(36))
      .then((code) => {
        const fusedCode = branchCode?.substring(0, 3) + code;
        setCode(fusedCode);
        storeCode(fusedCode);
      })
      .catch(errHandler(setStoringCode));
  };

  return { agentCode, storingCode, handleGenerate };
};

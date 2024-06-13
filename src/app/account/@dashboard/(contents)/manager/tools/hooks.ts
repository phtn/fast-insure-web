import { createAgentCode } from "@/trpc/account/codes/create";
import { charlimit, createRefNo, errHandler } from "@/utils/helpers";
import { onSuccess } from "@/utils/toast";
import { useState } from "react";

type ManagerToolParams = {
  userId: string | undefined;
  branchCode: string | undefined;
};
export const useManagerTools = ({ userId, branchCode }: ManagerToolParams) => {
  const [agentCode, setCode] = useState<string | undefined>();
  const [storingCode, setStoringCode] = useState(false);

  const handleCreateAgentCode = (code: string) => {
    if (!userId && !branchCode) return;
    createAgentCode({ userId, branchCode, code })
      .then(() => {
        setStoringCode(false);
        onSuccess(
          "Code generation successful!",
          charlimit(agentCode, 6)!.toUpperCase(),
        );
      })
      .catch((e: Error) => errHandler(e, setStoringCode));
  };
  const handleGenerate = async () => {
    setStoringCode(true);
    await createRefNo(new Date().getTime().toString(36))
      .then((code) => {
        setCode(code);
        handleCreateAgentCode(code);
      })
      .catch((e: Error) => errHandler(e, setStoringCode));
  };

  return { agentCode, storingCode, handleGenerate };
};

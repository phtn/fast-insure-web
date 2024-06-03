import { createAgentCode } from "@/trpc/account/codes/create";
import { createRefNo } from "@/utils/helpers";
import { useState } from "react";

export const useTools = (props: { userId: string | undefined }) => {
  const [agentCode, setCode] = useState<string | undefined>();
  const [storingCode, setStoringCode] = useState(false);
  const handleCreateAgentCode = (code: string) => {
    if (!props.userId) return;
    createAgentCode({ userId: props.userId, code })
      .then(() => {
        setStoringCode(false);
      })
      .catch((e) => {
        setStoringCode(false);
        console.error(e);
      });
  };
  const handleGenerate = async () => {
    setStoringCode(true);
    await createRefNo(new Date().getTime().toString(36))
      .then((code) => {
        setCode(code);
        handleCreateAgentCode(code);
        console.log(code);
      })
      .catch((e) => console.log(e));
  };

  return { agentCode, storingCode, handleGenerate };
};

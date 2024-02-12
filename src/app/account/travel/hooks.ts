import { AutoDataSchema } from "@/server/resource/autos";
import { getOneAuto } from "@/trpc/autos/get";
import { onError, onSuccess } from "@/utils/toast";
import { useState } from "react";

export const useGetOne = (userId: string | undefined) => {
  const [one, setOne] = useState<AutoDataSchema | undefined>();

  const getOne = async () => {
    const Err = (err: Error) => {
      onError(err.name, err.message);
      console.log(err);
    };
    const Ok = (res: AutoDataSchema) => {
      onSuccess("Got one!");
      setOne(res);
      console.log(res);
    };

    if (userId)
      return await getOneAuto({ userId, docId: "lSMcxMiMgEn5wMLxS9Rw" }).then(
        Ok,
        Err,
      );
  };
  return { one, getOne };
};

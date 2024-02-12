import { db } from "@/libs/db";
import { type CreateAutoSchema } from "@/server/resource/autos";
import { addDoc, collection } from "firebase/firestore";

export const createAuto = async (params: CreateAutoSchema) => {
  const { userId, auto_name, auto_data } = params;

  const Err = (err: Error) => {
    return [0, err.message];
  };
  const Ok = () => {
    return [1, "success"];
  };

  if (userId) {
    const docRef = collection(db, `users/${userId}/autos`);

    const payload = {
      ...auto_data,
      auto_name,
      files: [],
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
    };

    return addDoc(docRef, payload).then(Ok, Err);
  } else {
    return "a userId is required to add a document.";
  }
};

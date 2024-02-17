import { db } from "@/libs/db";
import { type CreateAutoSchema } from "@/server/resource/autos";
import { addDoc, collection } from "firebase/firestore";

export const createAuto = async (params: CreateAutoSchema) => {
  const { userId, auto_name, auto_data, doc_url } = params;

  const Err = (err: Error) => {
    return err;
  };
  const Ok = () => {
    return 1;
  };

  if (userId) {
    const docRef = collection(db, `users/${userId}/autos`);
    const files = doc_url
      ? [
          {
            name: auto_data.document_type,
            photoURL: doc_url,
            created_at: new Date().getTime(),
            updated_at: new Date().getTime(),
          },
        ]
      : [];

    const payload = {
      ...auto_data,
      auto_name,
      files,
      isActive: false,
      vehicle_cat: getVehicleCat(auto_data.gross_wt ?? ""),
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
    };

    return addDoc(docRef, payload).then(Ok).catch(Err);
  } else {
    return "a userId is required to add a document.";
  }
};

const getVehicleCat = (weight: string) => {
  const wt = +weight;
  if (wt >= 3000) {
    return "HV";
  } else if (wt >= 2000) {
    return "LM";
  } else if (wt >= 1000) {
    return "PR";
  } else {
    return "MT";
  }
};

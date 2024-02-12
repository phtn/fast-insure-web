import { db } from "@/libs/db";
import type {
  AutoDataSchema,
  GetAllAutoSchema,
  GetOneAutoSchema,
} from "@/server/resource/autos";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export const getOneAuto = async ({ userId, docId }: GetOneAutoSchema) => {
  const userRef = doc(db, "users", userId);
  const autosRef = collection(userRef, "autos");

  const snapshot = await getDoc(doc(autosRef, docId));

  if (snapshot.exists()) {
    const data = snapshot.data();
    return data;
  } else {
    return { doc: docId, exist: false };
  }
};

export const getAllAuto = async (params: GetAllAutoSchema) => {
  const userRef = doc(db, "users", params.userId);
  const autosRef = collection(userRef, "autos");

  return getDocs(autosRef)
    .then((snapshot) => {
      const docs = snapshot.docs.map((doc) => {
        const data = doc.data() as AutoDataSchema;
        return data;
      });
      return docs;
    })
    .catch((err) => err);
};

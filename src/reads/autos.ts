"use server";
import { db } from "@/libs/db";
import type { AutoDataSchema, GetAllAutoSchema } from "@/server/resource/autos";
import { collection, doc, onSnapshot } from "firebase/firestore";

type GetAllAutoType = {
  params: GetAllAutoSchema;
  callback: (data: AutoDataSchema[]) => void;
};

export const readAllAuto = async ({ params, callback }: GetAllAutoType) => {
  const userRef = doc(db, "users", params.userId);
  const autosRef = collection(userRef, "autos");

  return onSnapshot(autosRef, (snapshot) => {
    const docs = snapshot.docs.map((doc) => {
      const data = doc.data() as AutoDataSchema;
      return data;
    });
    callback(docs);
  });
};

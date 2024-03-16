import { createAuto } from "../firebase/autos/create";
import { getAllAuto, getAutoUpdate, getOneAuto } from "../firebase/autos/get";
import {
  createAutoProcedure,
  getAllAutoProcedure,
  getOneAutoProcedure,
} from "../procedures/autos";
import { type AllAutoSchema } from "../resource/autos";
import { router } from "../trpc";

export const autoRouter = router({
  createAuto: createAutoProcedure.query(async ({ input }) => {
    return await createAuto(input);
  }),
  getAllAuto: getAllAutoProcedure.query(async ({ input }) => {
    return await getAllAuto(input);
  }),
  getOneAuto: getOneAutoProcedure.query(async ({ input }) => {
    return await getOneAuto(input);
  }),
  getAutoUpdate: getAllAutoProcedure.subscription(async ({ input }) => {
    let data: AllAutoSchema;
    return await getAutoUpdate(input, (docs) => {
      data = docs;
    }).then(() => console.log(data));
  }),
});

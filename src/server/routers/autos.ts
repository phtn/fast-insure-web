import { createAuto } from "../firebase/autos/create";
import { getAllAuto, getOneAuto } from "../firebase/autos/get";
import {
  createAutoProcedure,
  getAllAutoProcedure,
  getOneAutoProcedure,
} from "../procedures/autos";
import { router } from "../trcp";

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
});

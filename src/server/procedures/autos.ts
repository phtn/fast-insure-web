import {
  CreateAutoResource,
  GetAllAutoResource,
  GetOneResource,
} from "../resource/autos";
import { procedure } from "../trpc";

export const createAutoProcedure = procedure.input(CreateAutoResource);
export const getAllAutoProcedure = procedure.input(GetAllAutoResource);
export const getOneAutoProcedure = procedure.input(GetOneResource);

import type { BaseResponse } from "../entities/BaseResponse";
import type { Ingrediente } from "../entities/ingredientes";
import { call } from "../utils/http";

export async function getIngredientes(id?: number): Promise<Ingrediente[]> {
  const uri = id ? `ingredientes/${id}` : 'ingredientes'
  const response: BaseResponse<Ingrediente[]> = await call({ uri });
  return response.data;
}
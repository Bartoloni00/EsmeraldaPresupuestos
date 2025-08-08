import type { BaseResponse } from "../entities/BaseResponse";
import type { Receta, CreateReceta } from "../entities/recetas";
import { call } from "../utils/http";

export async function getRecetas(id?: number): Promise<Receta[]> {
  const uri = id ? `recetas/${id}` : 'recetas'
  const response: BaseResponse<Receta[]> = await call({ uri });
  return response.data;
}

export async function createReceta(receta: CreateReceta): Promise<Receta> {
  const response: BaseResponse<Receta> = await call({
    uri: 'recetas',
    method: 'POST',
    body: receta,
  });
  return response.data;
}
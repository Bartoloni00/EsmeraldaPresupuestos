import type { BaseResponse } from "../entities/BaseResponse";
import type { Proveedores } from "../entities/proveedores";
import { call } from "../utils/http";

export async function getProveedores(id?: number): Promise<Proveedores[]> {
  const uri = id ? `proveedores/${id}` : 'proveedores'
  const response: BaseResponse<Proveedores[]> = await call({ uri });
  return response.data;
}
import type { BaseResponse } from "../entities/BaseResponse";
import type { Proveedor } from "../entities/proveedores";
import { call } from "../utils/http";

export async function getProveedores(id?: number): Promise<Proveedor[]> {
  const uri = id ? `proveedores/${id}` : 'proveedores'
  const response: BaseResponse<Proveedor[]> = await call({ uri });
  return response.data;
}
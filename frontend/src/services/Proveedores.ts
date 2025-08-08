import type { BaseResponse } from "../entities/BaseResponse";
import type { Proveedor } from "../entities/proveedores";
import { call } from "../utils/http";

export async function getProveedores(id?: number): Promise<Proveedor[]> {
  const uri = id ? `proveedores/${id}` : 'proveedores'
  const response: BaseResponse<Proveedor[]> = await call({ uri });
  return response.data;
}

export async function createProveedor(proveedor: Proveedor): Promise<Proveedor> {
  const response: BaseResponse<Proveedor> = await call({
    uri: 'proveedores',
    method: 'POST',
    body: proveedor,
  });
  
  return response.data;
}

export async function deleteProveedor(id: number): Promise<void> {
  const response: BaseResponse<void> = await call({
    uri: `proveedores/${id}`,
    method: 'DELETE',
  });
  
  return response.data;
}
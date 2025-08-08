import type { Packagin, Packagins } from "../entities/packaging";
import type { BaseResponse } from "../entities/BaseResponse";
import { call } from "../utils/http";

export async function getPackagings(id?: number): Promise<Packagin[]> {
  const uri = id ? `packagings/${id}` : 'packagings'
  const response: Packagins = await call({ uri });
  return response.data;
}

export async function createPackaging(packaging: Packagin): Promise<Packagin> {
  const response: BaseResponse<Packagin> = await call({
    uri: 'packagings',
    method: 'POST',
    body: packaging,
  });
  return response.data;
}

export async function deletePackaging(id: number): Promise<void> {
  const response: BaseResponse<void> = await call({
    uri: `packagings/${id}`,
    method: 'DELETE',
  });
  return response.data;
}

export async function updatePackaging(id: number, packaging: Packagin): Promise<void> {
  const response: BaseResponse<void> = await call({
    uri: `packagings/${id}`,
    method: 'PUT',
    body: packaging,
  });
  return response.data;
}
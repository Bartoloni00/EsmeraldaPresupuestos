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
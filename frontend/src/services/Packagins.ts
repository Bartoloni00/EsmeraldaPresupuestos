import type { Packagin, Packagins } from "../entities/packaging";
import { call } from "../utils/http";

export async function getPackagings(id?: number): Promise<Packagin[]> {
  const uri = id ? `packagings/${id}` : 'packagings'
  const response: Packagins = await call({ uri });
  return response.data;
}
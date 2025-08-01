import { type BaseResponse, type Precios } from "./BaseResponse";

export interface Ingrediente {
  id: number;
  name: string;
  descripcion: string;
  precios: Precios[];
}

export interface Ingredientes extends BaseResponse<Ingrediente[]> {}
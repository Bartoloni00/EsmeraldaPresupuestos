import { type BaseResponse, type Precios } from "./BaseResponse";

export interface Packagin {
  id: number;
  title: string;
  descripcion: string;
  precios: Precios[];
}

export interface Packagins extends BaseResponse<Packagin[]> {}
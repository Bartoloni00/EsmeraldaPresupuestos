import { type BaseResponse } from "./BaseResponse";

export interface Proveedor {
  id: number;
  name: string;
  descripcion: string;
  telefono: string;
  mail: string;
  pagina?: string;
  pais: string;
  provincia: string;
  ciudad: string;
  calle?: string;
  numero_calle?: string;
}

export interface Proveedores extends BaseResponse<Proveedor[]> {}
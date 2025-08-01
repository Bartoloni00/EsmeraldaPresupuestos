export interface BaseResponse<T> {
  success: boolean;
  data: T;
}

export interface Precios {
  precio: number;
  proveedor_name: string;
}
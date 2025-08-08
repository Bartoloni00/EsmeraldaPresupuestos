import { type BaseResponse } from "./BaseResponse";
import { type Ingrediente } from "./ingredientes";
import { type Packagin } from "./packaging";

export interface IngredienteWithCantidad extends Ingrediente {
  cantidad_kg: number;
  multiplicador?: number;
}

export interface PackagingWithCantidad extends Packagin {
  cantidad: number;
  multiplicador?: number;
}

export interface Receta {
  id?: number;
  title: string;
  descripcion: string;
  ingredientes: IngredienteWithCantidad[];
  packagings: PackagingWithCantidad[];
}

export interface Recetas extends BaseResponse<Receta[]> {}

export interface IngredienteReceta {
  ingrediente_id: number;
  cantidad_kg: number;
}

export interface PackagingReceta {
  packaging_id: number;
  cantidad: number;
}

export interface CreateReceta {
  title: string;
  descripcion: string;
  ingredientes: IngredienteReceta[];
  packagings: PackagingReceta[];
}

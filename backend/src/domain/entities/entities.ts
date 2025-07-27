export interface Proveedor {
  id: number;
  name: string;
  descripcion?: string;
  telefono?: string;
  mail?: string;
  pagina?: string;
  pais?: string;
  provincia?: string;
  ciudad?: string;
  calle?: string;
  numero_calle?: number;
}

export interface Ingrediente {
  id: number;
  name: string;
  descripcion?: string;
}

export interface Receta {
  id: number;
  title: string;
  descripcion?: string;
}

export interface Packaging {
  id: number;
  title: string;
  descripcion?: string;
}

export interface PrecioIngrediente {
  proveedor_id: number;
  ingrediente_id: number;
  precio: number;
  created_at: Date;
}

export interface IngredienteWithPrecioAndProveedor extends Ingrediente {
  precios: {
    precio: PrecioIngrediente['precio'];
    proveedor_name: Proveedor['name'];
  }[];
}

export interface PrecioPackaging {
  packaging_id: number;
  proveedor_id: number;
  precio: number;
  created_at: Date;
}

// Relación Ingrediente - Receta
export interface IngredienteReceta {
  receta_id: number;
  ingrediente_id: number;
  cantidad_kg: number;
}

// Relación Packaging - Receta
export interface PackagingReceta {
  receta_id: number;
  packaging_id: number;
  cantidad?: number;
}

export interface PackagingWithPrecioAndProveedor extends Packaging {
  precios: {
    precio: PrecioPackaging['precio'];
    proveedor_name: Proveedor['name'];
  }[];
}

export interface RecetaWithIngredientesAndPackagings extends Receta {
  ingredientes: IngredienteWithPrecioAndProveedor[];
  packagings: PackagingWithPrecioAndProveedor[];
}

export interface IngredienteRecetaDetalle extends IngredienteWithPrecioAndProveedor {
    cantidad_kg: number;
}

export interface PackagingRecetaDetalle extends PackagingWithPrecioAndProveedor {
    cantidad: number;
}

export interface CreateRecetaIngrediente {
    ingrediente_id: number;
    cantidad_kg: number;
}

export interface CreateRecetaPackaging {
    packaging_id: number;
    cantidad: number;
}

export interface CreateRecetaData {
    title: string;
    descripcion?: string; // Es opcional según tu JSON de ejemplo
    ingredientes: CreateRecetaIngrediente[];
    packagings: CreateRecetaPackaging[];
}
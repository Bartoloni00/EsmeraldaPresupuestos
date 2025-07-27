import { z, ZodError } from 'zod';
import { ProveedorSchema } from './Schemas';

export type Proveedor = z.infer<typeof ProveedorSchema>;

type SafeParseResult<T> = 
  | { success: true; data: T }
  | { success: false; error: ZodError<T> };

export function validateProveedor(object: unknown): SafeParseResult<Proveedor> {
    return ProveedorSchema.safeParse(object);
}

export function validatePartialProveedor(object: unknown): SafeParseResult<Partial<Proveedor>> {
    return ProveedorSchema.partial().safeParse(object);
}
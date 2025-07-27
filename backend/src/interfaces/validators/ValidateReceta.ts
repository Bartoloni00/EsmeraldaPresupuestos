import { z, ZodError } from 'zod';
import { RecetaSchema } from './Schemas';

export type Receta = z.infer<typeof RecetaSchema>;

type SafeParseResult<T> = 
  | { success: true; data: T }
  | { success: false; error: ZodError<T> };

export function validateReceta(object: unknown): SafeParseResult<Receta> {
    return RecetaSchema.safeParse(object);
}

export function validatePartialReceta(object: unknown): SafeParseResult<Partial<Receta>> {
    return RecetaSchema.partial().safeParse(object);
}
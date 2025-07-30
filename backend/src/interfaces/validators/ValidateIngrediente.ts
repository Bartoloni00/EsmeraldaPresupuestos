import { z, ZodError } from 'zod';
import { CreateIngredienteSchema as IngredienteSchema } from './Schemas';

export type Ingrediente = z.infer<typeof IngredienteSchema>;

type SafeParseResult<T> = 
  | { success: true; data: T }
  | { success: false; error: ZodError<T> };

export function validateIngrediente(object: unknown): SafeParseResult<Ingrediente> {
    return IngredienteSchema.safeParse(object);
}

export function validatePartialIngrediente(object: unknown): SafeParseResult<Partial<Ingrediente>> {
    return IngredienteSchema.partial().safeParse(object);
}
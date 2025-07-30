import { z, ZodError } from 'zod';
import { CreatePackagingSchema as PackagingSchema } from './Schemas';

export type Packaging = z.infer<typeof PackagingSchema>;

type SafeParseResult<T> = 
  | { success: true; data: T }
  | { success: false; error: ZodError<T> };

export function validatePackaging(object: unknown): SafeParseResult<Packaging> {
    return PackagingSchema.safeParse(object);
}

export function validatePartialPackaging(object: unknown): SafeParseResult<Partial<Packaging>> {
    return PackagingSchema.partial().safeParse(object);
}
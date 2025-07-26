import { z, ZodError } from 'zod';

export const ProveedorSchema = z.object({
    name: z.string('El nombre debe ser una cadena de caracteres.').nonempty('El nombre es obligatorio.'),
    descripcion: z.string('La descripcion debe ser una cadena de caracteres.').nullable().optional(),
    telefono: z.string().nullable().optional(),
    mail: z.string().email('Formato de email inválido').nullable().optional().or(z.literal('')), 
    pagina: z.string().url('Formato de URL inválido').nullable().optional().or(z.literal('')),
    pais: z.string().default('Argentina'),
    provincia: z.string().default('Santa Fe'),
    ciudad: z.string().default('Rosario'),
    calle: z.string().nullable().optional(),
    numero_calle: z.number().nullable().optional()
});

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
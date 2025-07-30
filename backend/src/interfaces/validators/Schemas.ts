import { z } from 'zod';

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

export const IngredienteSchema = z.object({
    ingrediente_id: z.number(),
    cantidad_kg: z.number()
});

export const PackagingSchema = z.object({
    packaging_id: z.number(),
    cantidad: z.number(),
});

export const RecetaSchema = z.object({
    title: z.string().nonempty({ message: 'El nombre es obligatorio.' }),
    descripcion: z.string().nullable().optional(),
    ingredientes: z.array(IngredienteSchema).nonempty({ message: 'Debe haber al menos un ingrediente.' }),
    packagings: z.array(PackagingSchema).nonempty({ message: 'Debe haber al menos un packaging.' }),
});

const precioSchema = z.object({
    precio: z.number(),
    proveedor_id: z.number()
});

export const CreatePackagingSchema = z.object({
    title: z.string().nonempty({ message: 'El nombre es obligatorio.' }),
    descripcion: z.string().nullable().optional(),
    precios: z.array(precioSchema).nonempty({ message: 'Debe haber al menos un precio.'}).optional(),
});

export const CreateIngredienteSchema = z.object({
    name: z.string().nonempty({ message: 'El nombre es obligatorio.' }),
    descripcion: z.string().nullable().optional(),
    precios: z.array(precioSchema).nonempty({ message: 'Debe haber al menos un precio.'}).optional(),
});
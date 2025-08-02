import { ShoppingCart } from "lucide-react";
export default function EmptyState() {
    return (
        <div className="text-center py-12">
            <ShoppingCart className="h-12 w-12 mx-auto text-dark" />
            <h2 className="mt-2 text-sm font-medium text-dark">No hay recetas disponibles</h2>
            <p className="mt-1 text-sm text-gray-500">
                Agrega recetas para poder crear presupuestos.
            </p>
        </div>
    )
}
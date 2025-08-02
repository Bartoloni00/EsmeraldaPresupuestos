import { ShoppingCart } from "lucide-react"
import IngredienteCard from "./IngredienteCard"
import type { IngredientePresupuesto, Ingrediente } from "./IngredienteCard"

interface IngredienteSectionProps {
    ingredientes: Ingrediente[],
    ingredientePresupuesto: Record<number, IngredientePresupuesto>,
    onIngredientePrecioChange: (ingredienteId: number, proveedorName: string | null, precio: number | null) => void,
    onIngredienteMultiplicadorChange: (ingredienteId: number, multiplicador: number) => void,
    formatCurrency: (amount: number) => string
}

export default function IngredienteSection({ingredientes, ingredientePresupuesto, onIngredientePrecioChange, onIngredienteMultiplicadorChange, formatCurrency}: IngredienteSectionProps) {
    return (
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <ShoppingCart className="h-6 w-6 text-emerald-600" />
                <span className="text-xl font-semibold text-gray-900">Ingredientes</span>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {ingredientes.map(ingrediente => (
                    <IngredienteCard
                        key={ingrediente.id}
                        ingrediente={ingrediente}
                        presupuesto={ingredientePresupuesto[ingrediente.id]}
                        onPrecioChange={onIngredientePrecioChange}
                        onMultiplicadorChange={onIngredienteMultiplicadorChange}
                        formatCurrency={formatCurrency}
                    />
                ))}
            </div>
        </section>
    )
}
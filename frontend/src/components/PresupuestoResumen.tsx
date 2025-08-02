import { DollarSign } from "lucide-react"

interface PresupuestoTotal {
    ingredientes: number
    packagings: number
    total: number
    ganancia: number
}

interface PresupuestoResumenProps {
    presupuestoTotal: PresupuestoTotal,
    formatCurrency: (value: number) => string
}

export default function PresupuestoResumen({presupuestoTotal, formatCurrency}: PresupuestoResumenProps) {
    return (
        <section className="bg-gradient-to-r from-emerald-500 to-teal-50 shadow-sm border border-emerald-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <DollarSign className="h-6 w-6 text-emerald-600" />
                <span className="text-xl font-semibold text-gray-900">Resumen del presupuesto</span>
            </div>
            <div className="grip gap-4 md:grid-cols-3">
                <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-sm font-medium text-gray-600 mb-1">Ingredientes</p>
                    <p className="text-2xl font-semibold text-emerald-600">{formatCurrency(presupuestoTotal.ingredientes)}</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-sm font-medium text-gray-600 mb-1">Packagings</p>
                    <p className="text-2xl font-semibold text-emerald-600">{formatCurrency(presupuestoTotal.packagings)}</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                    <p className="text-sm font-medium text-gray-600 mb-1">Total</p>
                    <p className="text-2xl font-semibold text-emerald-600">{formatCurrency(presupuestoTotal.total)}</p>
                </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
                <p className="text-2xl text-emerald-dark">Precio final con tu ganancia incluida:</p>
                <p className="text-2xl font-semibold text-emerald-600">{formatCurrency(presupuestoTotal.ganancia)}</p>
            </div>
        </section>
    )
}
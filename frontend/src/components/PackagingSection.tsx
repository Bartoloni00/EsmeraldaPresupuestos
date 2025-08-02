import { Package } from "lucide-react"
import PackagingCard from "./PackagingCard"
import type { PackagingWithCantidad as packaging} from '../entities/recetas'
import type { PackagingPresupuesto } from "./PackagingCard"

interface PackagingSectionProps {
    packagings: packaging[];
    packagingPresupuesto: Record<number, PackagingPresupuesto>;
    onPackagingPrecioChange: (packagingId: number, proveedorName: string, precio: number) => void;
    onPackagingMultiplicadorChange: (packagingId: number, multiplicador: number) => void;
    formatCurrency: (value: number) => string;
}

export default function PackagingSection({packagings, packagingPresupuesto, onPackagingPrecioChange, onPackagingMultiplicadorChange, formatCurrency}: PackagingSectionProps) {
    if (packagings.length === 0) {
        return <div className='text-center'>No hay ninguna receta</div>
    }
    return (
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <Package className="h-6 w-6 text-emerald-600"/>
                <span className="text-xl font-semibold text-gray-900">Packaging</span>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {
                    packagings.map(packaging => (
                        <PackagingCard 
                            key={packaging.id} 
                            packaging={packaging} 
                            presupuesto={packagingPresupuesto[packaging.id]} 
                            onPrecioChange={onPackagingPrecioChange} 
                            onMultiplicadorChange={onPackagingMultiplicadorChange} 
                            formatCurrency={formatCurrency}
                        />
                    ))
                }
            </div>
        </section>
    )
}
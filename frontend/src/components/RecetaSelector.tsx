import { Calculator } from "lucide-react"
import type { Receta } from "../entities/recetas"

interface RecetaSelectorProps {
    recetas: Receta[]
    selectedReceta: Receta | null
    onRecetaChange: (receta: Receta | null) => void
}

export default function RecetaSelector({recetas, selectedReceta, onRecetaChange} : RecetaSelectorProps) {
    const handleRecetaChange = (event : React.ChangeEvent<HTMLSelectElement>) => {
        const receta = recetas.find(receta => receta.id === Number(event.target.value))
        onRecetaChange(receta || null)
    }

    return (
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
                <Calculator className="h-6 w-6 text-emerald-600"/>
                <h1 className="text-2xl font-bold text-gray-900">
                    Calculadora de presupuestos
                </h1>
                <div className="max-w-md">
                    <label htmlFor="receta" className="block text-sm font-medium text-gray-700 mb-2">Selecciona una receta</label>
                    <select
                        onChange={handleRecetaChange}
                        name="receta"
                        id="receta"
                        value={selectedReceta?.id || ''}
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    >
                        <option value="">Selecciona una receta</option>
                        {recetas.map(receta => (
                            <option
                                key={receta.id}
                                value={receta.id}
                            >
                                {receta.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </section>
    )
}
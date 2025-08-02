import { type Precios } from "../entities/BaseResponse";

export interface Ingrediente {
    id: number
    name: string,
    descripcion: string,
    cantidad_kg: number,
    precios: Precios[]
}

export interface IngredientePresupuesto {
    id: number
    proveedorSeleccionado: string | null,
    precioSeleccionado: number | null,
    multiplicador: number,
    subtotal: number
}

interface IngredienteCardProps {
    ingrediente: Ingrediente,
    presupuesto: IngredientePresupuesto,
    onPrecioChange: (ingredineteId: number, proveedorName: string | null, precio: number | null) => void,
    onMultiplicadorChange: (ingredineteId: number, multiplicador: number) => void,
    formatCurrency: (amount: number) => string
}

export default function IngredienteCard({ingrediente, presupuesto, onPrecioChange, onMultiplicadorChange, formatCurrency}: IngredienteCardProps) {
    return (
        <div className='border-2 border-esmeralda-600 rounded-lg p-4 hover:border-emerald-200 transition-colors'>
            <div className='border-2 border-emerald-100 rounded-lg p-4 hover:border-emerald-200 transition-colors'>
                <div className='mb-4'>
                    <h3 className='text-xl font-bold'>{ingrediente.name}</h3>
                    <p className='text-gray-500'>Cantidad: {ingrediente.cantidad_kg} KG</p>
                </div>
            </div>
            <div className='space-y-4'>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Proveedor y precio
                </label>
                <select name="precios" className='block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm'
                    value={presupuesto?.proveedorSeleccionado || ''}
                    onChange={e => {
                        const precio = ingrediente.precios.find(p => p.proveedor_name === e.target.value)
                        if (precio) {
                            onPrecioChange(ingrediente.id, precio.proveedor_name, precio.precio)
                        }
                    }}>
                        <option value="">Seleccionar un proveedor</option>
                        {ingrediente.precios.map(p => (
                            <option key={p.proveedor_name} value={p.proveedor_name}>{p.proveedor_name} - {formatCurrency(p.precio)}</option>
                        ))}
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Multiplicador</label>
                <input type="number"
                    step={0.01}
                    min={0}
                    value={presupuesto?.multiplicador || 1}
                    onChange={e => onMultiplicadorChange(ingrediente.id, parseFloat(e.target.value) || 0)}
                    className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    />
            </div>

            {
                presupuesto?.subtotal > 0 && (
                    <div className="bg-emerald-50 rounded-md p-3">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-emerald-800">Subtotal:</span>
                            <span>{ formatCurrency(presupuesto.subtotal) }</span>
                        </div>
                    </div>
                )
            }
        </div>
    )                            

}
import type { PackagingWithCantidad as packaging} from '../entities/recetas'

export interface PackagingPresupuesto {
    id: number;
    proveedorSelecionado: string | null;
    precioSelecionado: number | null;
    multiplicador: number;
    subtotal: number;
}

interface PackagingCardProps {
    packaging: packaging;
    presupuesto: PackagingPresupuesto;
    onPrecioChange: (packagingId: number, proveedorName: string, precio: number) => void;
    onMultiplicadorChange: (packagingId: number, multiplicador: number) => void;
    formatCurrency: (value: number) => string;
}

export default function PackagingCard({packaging, presupuesto, onPrecioChange, onMultiplicadorChange, formatCurrency}: PackagingCardProps) {
    return (
        <section className='border-2 border-emerald-100 rounded-lg p-4 hover:border-emerald-200 transition-colors'>
            <div className='mb-4'>
                <span className='font-semibold text-gray-900 mb-2'>{packaging.title}</span>
                <p className='text-sm text-gray-600'>Cantidad: {packaging.cantidad} unidades</p>
            </div>
            <div className='space-y-4'>
                <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Proveedor y precio</label>
                    <select 
                        name="proveedor" 
                        id="proveedor" 
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 focus:border-emerald-600 sm:text-sm max-w-xs"
                        value={presupuesto?.proveedorSelecionado || ''}
                        onChange={e => {
                            const precio = packaging.precios.find(precio => precio.proveedor_name === e.target.value)
                            if (precio) {
                                onPrecioChange(packaging.id, e.target.value, precio.precio)
                            }
                        }}>
                        <option value="default">Selecciona un proveedor</option>
                        {packaging.precios?.map(precio => (
                            <option key={precio.proveedor_name} value={precio.proveedor_name}>
                            {precio.proveedor_name} - {formatCurrency(precio.precio)}
                            </option>
                        )) || <option>No hay precios disponibles</option>}
                    </select>
                </div>
                <div>
                    <label htmlFor="multiplicador" className='block text-sm font-medium text-gray-700 mb-1'>Multiplicador</label>
                    <input
                        type="number"
                        name="multiplicador" 
                        id="multiplicador" 
                        className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 focus:border-emerald-600 sm:text-sm max-w-xs"
                        value={presupuesto?.multiplicador || 1}
                        onChange={e => onMultiplicadorChange(packaging.id, parseFloat(e.target.value) || 0)}
                        />
                </div>
                {
                    presupuesto?.subtotal > 0 && (
                        <div className="bg-emerald-50 rounded-md p-4">
                            <div className='flex items-center justify-between'>
                                <span className='text-sm font-medium text-emerald-800'>Subtotal: </span>
                                <span className='text-lg font-bold text-emerald-900'>{formatCurrency(presupuesto.subtotal)}</span>
                            </div>
                        </div>
                    )
                }
            </div>
        </section>
    )
}
import { Package, UtensilsCrossed, BadgeDollarSign } from 'lucide-react'
import type { Receta } from '../entities/recetas'

export default function CardReceta({ receta }: { receta: Receta }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 max-w-3xl mx-auto space-y-6 mt-10">
      <h2 className="text-2xl font-bold text-emerald-dark">{receta.title}</h2>
      <p className="text-gray-600">{receta.descripcion}</p>

      {/* Ingredientes */}
      <div>
        <div className="flex items-center gap-2 text-emerald-dark font-semibold text-lg mb-2">
          <UtensilsCrossed size={20} /> Ingredientes
        </div>
        <ul className="space-y-3">
          {receta.ingredientes.map((ing) => (
            <li key={ing.id} className="border rounded-xl p-4">
              <p className="font-semibold">{ing.name} <span className="text-sm text-gray-500">({ing.cantidad_kg} kg)</span></p>
              <p className="text-gray-500 text-sm">{ing.descripcion}</p>
              <div className="mt-2 space-y-1">
                {ing.precios.map((precio, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <BadgeDollarSign size={16} className="text-emerald-light" />
                    <span className="font-medium">${precio.precio}</span> 
                    <span className="text-gray-500">– {precio.proveedor_name}</span>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Packaging */}
      <div>
        <div className="flex items-center gap-2 text-emerald-dark font-semibold text-lg mb-2">
          <Package size={20} /> Packaging
        </div>
        <ul className="space-y-3">
          {receta.packagings.map((pack) => (
            <li key={pack.id} className="border rounded-xl p-4">
              <p className="font-semibold">{pack.title} <span className="text-sm text-gray-500">(x{pack.cantidad})</span></p>
              <p className="text-gray-500 text-sm">{pack.descripcion}</p>
              <div className="mt-2 space-y-1">
                {pack.precios.map((precio, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <BadgeDollarSign size={16} className="text-emerald-light" />
                    <span className="font-medium">${precio.precio}</span> 
                    <span className="text-gray-500">– {precio.proveedor_name}</span>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

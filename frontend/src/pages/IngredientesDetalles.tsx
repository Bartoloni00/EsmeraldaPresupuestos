import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getIngredientes } from '../services/Ingredientes'
import type { Ingrediente } from '../entities/ingredientes'

export default function IngredienteDetalle() {
  const { ingrediente_id } = useParams<{ ingrediente_id: string }>()
  const [ingrediente, setIngrediente] = useState<Ingrediente | null>(null)

  useEffect(() => {
    if (ingrediente_id) {
      getIngredientes(Number(ingrediente_id))
        .then(ingredientes => setIngrediente(ingredientes[0] ?? null))
    }
  }, [ingrediente_id])
  

  if (!ingrediente) return <p>Cargando ingrediente...</p>

  return (
    <section className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md text-center mt-10">
      <h1 className="text-3xl font-semibold text-emerald-dark mb-4">
        {ingrediente.name}
      </h1>
      <p className="text-gray-700 mb-6">{ingrediente.descripcion}</p>
      
      <ul className="space-y-3">
        {ingrediente.precios.map(({ proveedor_name, precio }) => (
          <li key={proveedor_name} className="bg-emerald-light/10 p-3 rounded shadow-sm">
            <span className="font-medium text-gray-800">{proveedor_name}</span> lo vende por <span className="font-bold text-emerald-dark">${precio}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
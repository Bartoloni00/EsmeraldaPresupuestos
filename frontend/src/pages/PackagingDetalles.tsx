import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPackagings } from '../services/Packagins'
import type { Packagin } from '../entities/packaging'

export default function PackagingDetalle() {
  const { packaging_id } = useParams()
  const [packaging, setPackaging] = useState<Packagin | null>(null)

  useEffect(() => {
    if (!packaging_id) return

    const fetchPackaging = async () => {
      try {
        const data = await getPackagings(Number(packaging_id))
        setPackaging(data[0] ?? null)
      } catch (error) {
        console.error('Error al obtener packaging:', error)
      }
    }

    fetchPackaging()
  }, [packaging_id])

  if (!packaging) {
    return (
      <section className="p-4 text-center text-gray-600">
        <p>Cargando packaging...</p>
      </section>
    )
  }

  return (
    <section className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md text-center mt-10">
      <h1 className="text-3xl font-semibold text-emerald-dark mb-4">
        {packaging.title}
      </h1>
      <p className="text-gray-700 mb-6">{packaging.descripcion}</p>
      
      <ul className="space-y-3">
        {packaging.precios.map(({ proveedor_name, precio }) => (
          <li key={proveedor_name} className="bg-emerald-light/10 p-3 rounded shadow-sm">
            <span className="font-medium text-gray-800">{proveedor_name}</span> lo vende por <span className="font-bold text-emerald-dark">${precio}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
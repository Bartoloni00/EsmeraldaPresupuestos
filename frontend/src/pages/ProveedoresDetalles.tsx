import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProveedores } from '../services/Proveedores'
import type { Proveedor } from '../entities/proveedores'
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Building2
} from 'lucide-react'

export default function ProveedorDetalle() {
  const { proveedor_id } = useParams<{ proveedor_id: string }>()
  const [proveedor, setProveedor] = useState<Proveedor | null>(null)

  useEffect(() => {
    if (proveedor_id) {
      getProveedores(Number(proveedor_id)).then((data) =>
        setProveedor(data[0] ?? null)
      )
    }
  }, [proveedor_id])

  if (!proveedor) return <p className="text-center mt-10">Cargando proveedor...</p>

  return (
    <section className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md mt-10 space-y-4">
      <h1 className="text-3xl font-bold text-emerald-dark text-center">{proveedor.name}</h1>
      <p className="text-gray-700 text-center">{proveedor.descripcion}</p>

      <ul className="space-y-2 text-sm text-gray-800">
        <li className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-emerald-600" />
          {proveedor.telefono}
        </li>
        <li className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-emerald-600" />
          {proveedor.mail}
        </li>
        {proveedor.pagina && (
          <li className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-emerald-600" />
            <a
              href={proveedor.pagina}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:underline"
            >
              {proveedor.pagina}
            </a>
          </li>
        )}
        <li className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-600" />
          {proveedor.ciudad}, {proveedor.provincia}, {proveedor.pais}
        </li>
        {(proveedor.calle || proveedor.numero_calle) && (
          <li className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            {proveedor.calle ?? ''} {proveedor.numero_calle ?? ''}
          </li>
        )}
      </ul>
    </section>
  )
}
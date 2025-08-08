import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProveedores, deleteProveedor } from '../services/Proveedores'
import type { Proveedor } from '../entities/proveedores'
import {
  Mail,
  Phone,
  Globe,
  MapPin,
  Building2,
  Trash
} from 'lucide-react'

export default function ProveedorDetalle() {
  const navigate = useNavigate()
  const { proveedor_id } = useParams<{ proveedor_id: string }>()
  const [proveedor, setProveedor] = useState<Proveedor | null>(null)
  const [mostrarConfirmDelete, setMostrarConfirmDelete] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  useEffect(() => {
    if (proveedor_id) {
      getProveedores(Number(proveedor_id)).then((data) =>
        setProveedor(data[0] ?? null)
      )
    }
  }, [proveedor_id])


  
    const handleShowDeleteButton = () => {
      setMostrarConfirmDelete(prev => !prev)
    }
  
    const handleDelete = async () => {
      if (!proveedor_id) {
        setErrors(['No se encontró el ID del ingrediente.'])
        return
      }
  
      deleteProveedor(parseInt(proveedor_id))
        .then(() => {
          setMostrarConfirmDelete(false)
          navigate('/insumos')
        })
        .catch(async (error) => {
          try {
            if (error?.data) {
              const fieldErrors = Object.values(error.data)
                .flatMap((field: any) => field._errors ?? [])
                .filter((e) => typeof e === 'string' && e.trim() !== '')
  
              setErrors(fieldErrors.length ? fieldErrors : ['Ocurrió un error desconocido.'])
            } else {
              setErrors(['Error en la respuesta del servidor.'])
            }
          } catch {
            setErrors(['No se pudo conectar con el servidor.'])
          }
        })
    }

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
      <div className="mt-6 flex justify-center flex-col gap-4">
        <button onClick={handleShowDeleteButton} className="bg-red-400 text-dark font-bold py-2 px-4 rounded-lg shadow-md transition-colors hover:bg-red-500 hover:cursor-pointer">
          Eliminar proveedor
        </button>

        {mostrarConfirmDelete && (
          <div className='w-full shadow-lg bg-red-100 p-4 rounded-lg'>
            <div className='flex items-center justify-center gap-2 text-red-700 font-semibold text-lg mb-2 text-center w-full'>
              <Trash size={20} />
              <h2>¿Estás seguro de querer eliminar el proveedor: {proveedor.name}?</h2>
            </div>
            <div className='flex justify-center gap-4 mt-8'>
              <button onClick={handleDelete} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors hover:bg-red-600 hover:cursor-pointer md:w-10/12">Estoy seguro de querer eliminar</button>
              <button onClick={handleShowDeleteButton} className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-colors hover:bg-gray-600 hover:cursor-pointer md:w-2/12">Cancelar</button>
            </div>
          </div>
        )}

        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
            <ul className="list-disc pl-5 space-y-1">
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
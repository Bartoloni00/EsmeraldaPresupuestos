import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getPackagings, deletePackaging } from '../../services/Packagins'
import { useNavigate } from 'react-router-dom'
import type { Packagin } from '../../entities/packaging'
import {Trash} from 'lucide-react'
import { Link } from 'react-router-dom'

export type borrar = boolean

export default function PackagingDetalle() {
  const navigate = useNavigate()
  const { packaging_id } = useParams<{ packaging_id: string }>();
  const [packaging, setPackaging] = useState<Packagin | null>(null)
  const [mostrarConfirmDelete, setMostrarConfirmDelete] = useState(false);
  const [errors, setErrors] = useState<string[]>([])

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

  const handleShowDeleteButton = () => {
    setMostrarConfirmDelete(prev => !prev);
  }


  const handleDelete = async () => {
    if (!packaging_id) {
      setErrors(['No se encontró el ID del packaging.']);
      return;
    }

    deletePackaging(parseInt(packaging_id))
    .then (() => {
      setMostrarConfirmDelete(false);
      navigate('/insumos');
    
    })
    .catch(async (error) => {
      try {
        if (error?.data) {
          const fieldErrors = Object.values(error.data)
            .flatMap((field: any) => field._errors ?? [])
            .filter((e) => typeof e === 'string' && e.trim() !== '');
  
          setErrors(fieldErrors.length ? fieldErrors : ['Ocurrió un error desconocido.']);
        } else {
          setErrors(['Error en la respuesta del servidor.']);
        }
    
      } catch {
        setErrors(['No se pudo conectar con el servidor.']);
      }
    })
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

      <div className="mt-6 flex justify-center flex-col gap-4">
        <div className='flex items-center justify-center gap-4'>
          <Link to={`/packaging/${packaging.id}/update`} className="bg-yellow-400 text-dark font-bold py-2 px-4 rounded-lg shadow-md transition-colors hover:bg-yellow-500 hover:cursor-pointer">
            Editar packaging
          </Link>
          <button onClick={handleShowDeleteButton} className="bg-red-400 text-dark font-bold py-2 px-4 rounded-lg shadow-md transition-colors hover:bg-red-500 hover:cursor-pointer">
            Eliminar packaging
          </button>
        </div>
        {mostrarConfirmDelete && (
          <div className='w-full shadow-lg bg-red-100 p-4 rounded-lg'>
            <div className='flex items-center justify-center gap-2 text-red-700 font-semibold text-lg mb-2 text-center w-full'>
              <Trash size={20} />
              <h2>
                ¿Estas seguro de querer eliminar el packaging: {packaging.title}?
              </h2>
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
import { useEffect, useState } from 'react'
import { getRecetas, deleteReceta } from '../../services/Recetas'
import { useParams, useNavigate } from 'react-router-dom'
import type { Receta } from '../../entities/recetas'
import CardReceta from '../../components/CardReceta'
import { Trash } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Recetas() {
  const { receta_id } = useParams<{ receta_id: string }>()
  const navigate = useNavigate()
  const [mostrarConfirmDelete, setMostrarConfirmDelete] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [receta, setReceta] = useState<Receta | null>(null)

  useEffect(() => {
    if (receta_id) {
      getRecetas(Number(receta_id)).then(recetas => setReceta(recetas[0] ?? null))
    }
  }, [receta_id])

  const handleShowDeleteButton = () => {
      setMostrarConfirmDelete(prev => !prev)
    }
  
  const handleDelete = async () => {
    if (!receta_id) {
      setErrors(['No se encontró el ID del ingrediente.'])
      return
    }

    deleteReceta(parseInt(receta_id))
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


  return (
      <section className='grid grid-cols-1 gap-4 p-4 mx-auto'>
        {receta && <CardReceta receta={receta} />}
        <div className="mt-6 flex justify-center flex-col gap-4">
        <div className='flex items-center justify-center gap-4'>
          <Link to={`/recetas/${receta_id}/update`} className="bg-yellow-400 text-dark font-bold py-2 px-4 rounded-lg shadow-md transition-colors hover:bg-yellow-500 hover:cursor-pointer">
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
              <h2>¿Estás seguro de querer eliminar el receta: {receta?.title}?</h2>
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
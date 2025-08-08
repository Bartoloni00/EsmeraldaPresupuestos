import { useEffect, useState } from 'react'
import { getRecetas } from '../../services/Recetas'
import type { Receta } from '../../entities/recetas'
import Table from '../../components/Table'
import { Link } from 'react-router-dom'

export default function Recetas() {
  const [recetas, setRecetas] = useState<Receta[]>([])

  useEffect(() => {
    getRecetas().then(recetas => setRecetas(recetas))
  }, [])

  return (
    <section className="p-4 flex flex-col">
      <h1 className="text-2xl text-dark font-bold mb-4 text-center">Recetas</h1>
      <Link
        to="/recetas/nuevo"
        className="text-dark font-bold py-4 mb-2 w-full text-center bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors"
      >
        Agregar nueva receta
      </Link>
      <Table headerRows={['Titulo', 'Descripcion', 'Detalles']} data={
        recetas.map(receta => [
          receta.title,
          receta.descripcion,
          <Link to={`/recetas/${receta.id}`} className='text-blue-500 hover:underline'>Ver detalles</Link>
        ])
      }/>
    </section>
  )
}
import { useEffect, useState } from 'react'
import { getRecetas } from '../services/Recetas'
import type { Receta } from '../entities/recetas'
import Table from '../components/Table'
import { Link } from 'react-router-dom'

export default function Recetas() {
  const [recetas, setRecetas] = useState<Receta[]>([])

  useEffect(() => {
    getRecetas().then(recetas => setRecetas(recetas))
  }, [])

  return (
    <section className="p-4">
      <h1 className="text-2xl text-dark font-bold mb-4 text-center">Recetas</h1>
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
import { useEffect, useState } from 'react'
import { getRecetas } from '../services/Recetas'
import { useParams } from 'react-router-dom'
import type { Receta } from '../entities/recetas'
import CardReceta from '../components/CardReceta'

export default function Recetas() {
  const { receta_id } = useParams<{ receta_id: string }>()
    
  const [receta, setReceta] = useState<Receta | null>(null)

  useEffect(() => {
    if (receta_id) {
      getRecetas(Number(receta_id)).then(recetas => setReceta(recetas[0] ?? null))
    }
  }, [receta_id])

  return (
      <section className='grid grid-cols-1 gap-4 p-4 mx-auto'>
        {receta && <CardReceta receta={receta} />}
      </section>
  )
}
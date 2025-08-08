import { useEffect, useState } from 'react'
import { getIngredientes } from '../services/Ingredientes'
import type { Ingrediente } from '../entities/ingredientes'
import type { Packagin } from '../entities/packaging'
import type { Receta } from '../entities/recetas'
import { getPackagings } from '../services/Packagins'
import { getRecetas } from '../services/Recetas'
import InsumosPresupuestoSection from '../components/InsumosPresupuestoSection'
import RecetaPresupuestoSection from '../components/RecetaPresupuestoSection'

type Section = 'recetas' | 'insumos'

export default function Home() {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([])
  const [packagings, setPackagings] = useState<Packagin[]>([])
  const [recetas, setRecetas] = useState<Receta[]>([])

  const [section, setSection] = useState<Section>('recetas')

  useEffect(() => {
    getIngredientes().then(ingredientes => setIngredientes(ingredientes))
    getPackagings().then(packagings => setPackagings(packagings))
    getRecetas().then(recetas => setRecetas(recetas))
  }, [])

  const handleSectionChange = () => {
    if (section === 'recetas') {
      setSection('insumos')
    } else {
      setSection('recetas')
    }
  }

  return (
    <section className="p-4">
      <h1 className="text-2xl text-dark font-bold mb-4 text-center">Insumos</h1>
      <div className='flex justify-center gap-2'>
        <button
          onClick={() => handleSectionChange()}
          className={`${section === 'recetas' ? 'bg-emerald-600' : 'bg-gray-200'} text-center py-2 px-4 rounded-md text-sm font-medium text-gray-800 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600`}
        >
          Armar presupuesto por receta
        </button>
        <button
          onClick={() => handleSectionChange()}
          className={`${section === 'insumos' ? 'bg-emerald-600' : 'bg-gray-200'} text-center py-2 px-4 rounded-md text-sm font-medium text-gray-800 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600`}
        >
          Armar presupuesto personalizado
        </button>
      </div>
      {section === 'recetas' ? (
        <RecetaPresupuestoSection recetas={recetas} />
      ) : (
        <InsumosPresupuestoSection ingredientes={ingredientes} packagings={packagings} recetas={recetas} />
      )}
    </section>
  )
}
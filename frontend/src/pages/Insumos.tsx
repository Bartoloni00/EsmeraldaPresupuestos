import { getIngredientes } from '../services/Ingredientes'
import type { Ingrediente } from '../entities/ingredientes'
import type { Packagin } from '../entities/packaging'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPackagings } from '../services/Packagins'
import Table from '../components/Table'

export default function Insumos() {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([])
  const [packagings, setPackagings] = useState<Packagin[]>([])

  useEffect(() => {
    getIngredientes().then(ingredientes => setIngredientes(ingredientes))
    getPackagings().then(packagings => setPackagings(packagings))
  }, [])

  return (
    <section className="p-4">
      <h1 className="text-2xl text-dark font-bold mb-4 text-center">Insumos</h1>
      <section className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <Table headerRows={['Titulo', 'Descripción', 'Ver']} data={
            ingredientes.map(ingrediente => [
              ingrediente.name, 
              ingrediente.descripcion, 
              <Link
                to={`/ingredientes/${ingrediente.id}`}
                className="text-emerald-600 hover:underline font-medium"
              >
                Ver detalles
              </Link>,
              ])} />
        <Table headerRows={['Titulo', 'Descripción', 'Ver']} data={
            packagings.map(packaging => [
              packaging.title, 
              packaging.descripcion, 
              <Link
                to={`/packaging/${packaging.id}`}
                className="text-emerald-600 hover:underline font-medium"
              >
                Ver detalles
              </Link>,
              ])} />
      </section>
      </section>
  )
}
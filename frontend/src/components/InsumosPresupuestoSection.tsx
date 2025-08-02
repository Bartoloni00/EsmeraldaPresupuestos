import type { Ingrediente } from '../entities/ingredientes'
import type { Packagin } from '../entities/packaging'

export default function InsumosPresupuestoSection({ingredientes, packagings}: {ingredientes: Ingrediente[], packagings: Packagin[]}) {
  return (
    <section className="p-4">
      <select name="ingredinete" id="ingredinete" className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 focus:border-emerald-600 sm:text-sm max-w-xs">
        <option value="default">Selecciona un Ingredinete</option>
        {ingredientes.map(i => (
            <option key={i.id} value={i.id}>
            {i.name}
            </option>
        ))}
        </select>
        <select name="packaging" id="packaging" className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-emerald-600 focus:border-emerald-600 sm:text-sm max-w-xs">
        <option value="default">Selecciona un Packaging</option>
        {packagings.map(p => (
            <option key={p.id} value={p.id}>
            {p.title}
            </option>
        ))}
        </select>
    </section>
  )
}
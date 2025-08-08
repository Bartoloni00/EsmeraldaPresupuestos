import { useState, useEffect } from 'react'
import type { Ingrediente } from '../../entities/ingredientes'
import type { Proveedor } from '../../entities/proveedores'
import { getProveedores } from '../../services/Proveedores'
import { createIngrediente } from '../../services/Ingredientes'
import { useNavigate } from 'react-router-dom'

export default function CreateIngrediente() {
  const navigate = useNavigate()

  const [errors, setErrors] = useState<string[]>([])
  const [ingrediente, setIngrediente] = useState<Ingrediente>({
    name: '',
    descripcion: '',
    precios: [],
  })

  const [proveedores, setProveedores] = useState<Proveedor[]>([])

  useEffect(() => {
    getProveedores().then(proveedores => setProveedores(proveedores))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIngrediente(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePrecioChange = (index: number, field: string, value: string | number) => {
    const updatedPrecios = [...ingrediente.precios]
    updatedPrecios[index] = { ...updatedPrecios[index], [field]: Number(value) }
    setIngrediente(prev => ({ ...prev, precios: updatedPrecios }))
  }

  const addPrecio = () => {
    if (proveedores.length < 1) return ;
    ingrediente.precios.find(p => p.proveedor_id === proveedores[0]?.id || 0)
    setIngrediente(prev => ({
      ...prev,
      precios: [...prev.precios, { precio: 0, proveedor_id: proveedores[0]?.id || 0 }]
    }))
  }

  const removePrecio = (index: number) => {
    const updatedPrecios = ingrediente.precios.filter((_, i) => i !== index)
    setIngrediente(prev => ({ ...prev, precios: updatedPrecios }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createIngrediente(ingrediente)
  .then(() => navigate('/insumos'))
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
  });
  }

  return (
    <section className="p-6 max-w-2xl mx-auto bg-cream rounded-2xl shadow-lg ">
      <h1 className="text-3xl font-bold text-center text-dark mb-6">
        Agregar nuevo ingrediente
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            value={ingrediente.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 text-dark p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={ingrediente.descripcion}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 text-dark p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Precios por proveedor
          </label>

          {ingrediente.precios.map((item, index) => (
            <div key={index} className="flex gap-3 mb-2 items-center">
              <input
                type="number"
                value={item.precio}
                onChange={(e) => handlePrecioChange(index, 'precio', e.target.value)}
                placeholder="Precio"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 text-dark p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
            />
          <select
            value={item.proveedor_id}
            onChange={(e) => handlePrecioChange(index, 'proveedor_id', e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 text-dark p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {proveedores
            .filter(p => {
              const yaSeleccionadoEnOtro =
                ingrediente.precios.some((precio, i) => i !== index && precio.proveedor_id === p.id)
              const esElActual = p.id === item.proveedor_id
              return !yaSeleccionadoEnOtro || esElActual
            })
            .map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
              <button
                type="button"
                onClick={() => removePrecio(index)}
                className="text-red-500 hover:text-red-700 text-xl font-bold"
              >
                &times;
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addPrecio}
            className="mt-2 text-sm text-emerald-600 hover:underline hover:cursor-pointer"
          >
            + Agregar precio
          </button>
        </div>
        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
            <ul className="list-disc pl-5 space-y-1">
              {errors.map((error, i) => (
                <li key={i}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg shadow transition"
          >
            Crear Ingrediente
          </button>
        </div>
      </form>
    </section>
  )
}
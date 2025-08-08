import { useState, useEffect } from 'react'
import { createReceta } from '../../services/Recetas'
import { getPackagings } from '../../services/Packagins'
import { getIngredientes } from '../../services/Ingredientes'
import { useNavigate } from 'react-router-dom'
import type { CreateReceta, IngredienteReceta, PackagingReceta } from '../../entities/recetas'

interface IngredienteOption {
  id: number;
  name: string;
}

interface PackagingOption {
  id: number;
  title: string;
}

export default function CreateReceta() {
  const navigate = useNavigate()
  const [errors, setErrors] = useState<string[]>([])

  const [ingredientesList, setIngredientesList] = useState<IngredienteOption[]>([])
  const [packagingsList, setPackagingsList] = useState<PackagingOption[]>([])

  const [receta, setReceta] = useState<CreateReceta>({
    title: '',
    descripcion: '',
    ingredientes: [],
    packagings: []
  })

  useEffect(() => {
    Promise.all([getIngredientes(), getPackagings()])
      .then(([ingredientesRes, packagingsRes]) => {
        setIngredientesList(ingredientesRes)
        setPackagingsList(packagingsRes)
      })
      .catch(() => setErrors(['Error cargando ingredientes o packagings.']))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setReceta(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleIngredienteChange = (index: number, field: keyof IngredienteReceta, value: string | number) => {
    const updated = [...receta.ingredientes]
    updated[index] = { ...updated[index], [field]: field === 'ingrediente_id' ? Number(value) : parseFloat(String(value)) }
    setReceta(prev => ({ ...prev, ingredientes: updated }))
  }

  const handlePackagingChange = (index: number, field: keyof PackagingReceta, value: string | number) => {
    const updated = [...receta.packagings]
    updated[index] = { ...updated[index], [field]: Number(value) }
    setReceta(prev => ({ ...prev, packagings: updated }))
  }

  const addIngrediente = () => {
    setReceta(prev => ({
      ...prev,
      ingredientes: [...prev.ingredientes, { ingrediente_id: 0, cantidad_kg: 0 }]
    }))
  }

  const removeIngrediente = (index: number) => {
    setReceta(prev => ({
      ...prev,
      ingredientes: prev.ingredientes.filter((_, i) => i !== index)
    }))
  }

  const addPackaging = () => {
    setReceta(prev => ({
      ...prev,
      packagings: [...prev.packagings, { packaging_id: 0, cantidad: 1 }]
    }))
  }

  const removePackaging = (index: number) => {
    setReceta(prev => ({
      ...prev,
      packagings: prev.packagings.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createReceta(receta)
      .then(() => navigate('/recetas'))
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
    <section className="p-6 max-w-2xl mx-auto bg-cream rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold text-center text-dark mb-6">
        Crear nueva receta
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            name="title"
            value={receta.title}
            onChange={handleChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            name="descripcion"
            value={receta.descripcion}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-gray-300 p-2.5"
          />
        </div>

        {/* Ingredientes */}
          {receta.ingredientes.map((ing, index) => (
            <div key={index} className="flex gap-3 mb-2 items-center">
              <select
                value={ing.ingrediente_id}
                onChange={(e) => handleIngredienteChange(index, 'ingrediente_id', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 text-dark p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value={0}>Seleccione ingrediente</option>
                {ingredientesList
                  .filter(opt => {
                    const yaSeleccionadoEnOtro = receta.ingredientes
                      .some((otro, i) => i !== index && otro.ingrediente_id === opt.id)
                    const esElActual = opt.id === ing.ingrediente_id
                    return !yaSeleccionadoEnOtro || esElActual
                  })
                  .map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.name}</option>
                  ))}
              </select>

              <input
                type="number"
                step="0.001"
                placeholder="Cantidad (kg)"
                value={ing.cantidad_kg}
                onChange={(e) => handleIngredienteChange(index, 'cantidad_kg', e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 text-dark p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
              />

              <button type="button" onClick={() => removeIngrediente(index)} className="text-red-500 text-xl">&times;</button>
            </div>
          ))}
        <button
            type="button"
            onClick={addIngrediente}
            className="mt-2 text-sm text-emerald-600 hover:underline hover:cursor-pointer block"
          >
            + Agregar ingrediente
        </button>

        {/* Packagings */}
        {receta.packagings.map((pack, index) => (
          <div key={index} className="flex gap-3 mb-2 items-center">
            <select
              value={pack.packaging_id}
              onChange={(e) => handlePackagingChange(index, 'packaging_id', e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 text-dark p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value={0}>Seleccione packaging</option>
              {packagingsList
                .filter(opt => {
                  const yaSeleccionadoEnOtro = receta.packagings
                    .some((otro, i) => i !== index && otro.packaging_id === opt.id)
                  const esElActual = opt.id === pack.packaging_id
                  return !yaSeleccionadoEnOtro || esElActual
                })
                .map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.title}</option>
                ))}
            </select>

            <input
              type="number"
              placeholder="Cantidad"
              value={pack.cantidad}
              onChange={(e) => handlePackagingChange(index, 'cantidad', e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 text-dark p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
            />

            <button type="button" onClick={() => removePackaging(index)} className="text-red-500 text-xl">&times;</button>
          </div>
        ))}
       <button
            type="button"
            onClick={addPackaging}
            className="mt-2 text-sm text-emerald-600 hover:underline hover:cursor-pointer block"
          >
            + Agregar packaging
        </button>


        {/* Errores */}
        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded mb-4">
            <ul className="list-disc pl-5 space-y-1">
              {errors.map((error, i) => <li key={i}>{error}</li>)}
            </ul>
          </div>
        )}

        {/* Botón submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg shadow transition"
          >
            Crear receta
          </button>
        </div>
      </form>
    </section>
  )
}
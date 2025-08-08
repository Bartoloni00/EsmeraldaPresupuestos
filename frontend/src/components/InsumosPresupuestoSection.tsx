import { useState, useEffect } from 'react'
import { Calculator, Plus, X } from 'lucide-react'
import type { Ingrediente } from '../entities/ingredientes'
import type { Packagin } from '../entities/packaging'
import type { Receta } from '../entities/recetas'
import IngredienteSection from './IngredienteSection'
import PackagingSection from './PackagingSection'
import PresupuestoResumen from './PresupuestoResumen'
import type { IngredientePresupuesto } from './IngredienteCard'
import type { PackagingPresupuesto } from './PackagingCard'

interface PresupuestoTotal {
  ingredientes: number
  packagings: number
  total: number
  ganancia: number
}

interface RecetaSeleccionada {
  id: number
  title: string
  multiplicador: number
}

interface InsumosPresupuestoSectionProps {
  ingredientes: Ingrediente[]
  packagings: Packagin[]
  recetas: Receta[]
}

export default function InsumosPresupuestoSection({ 
  ingredientes, 
  packagings, 
  recetas 
}: InsumosPresupuestoSectionProps) {
  const [recetasSeleccionadas, setRecetasSeleccionadas] = useState<RecetaSeleccionada[]>([])
  const [ingredientesExtras, setIngredientesExtras] = useState<{ id: number; cantidad_kg: number }[]>([])
  const [packagingsExtras, setPackagingsExtras] = useState<{ id: number; cantidad: number }[]>([])
  
  const [ingredientesFinales, setIngredientesFinales] = useState<any[]>([])
  const [packagingsFinales, setPackagingsFinales] = useState<any[]>([])
  
  const [ingredientePresupuesto, setIngredientePresupuesto] = useState<Record<number, IngredientePresupuesto>>({})
  const [packagingPresupuesto, setPackagingPresupuesto] = useState<Record<number, PackagingPresupuesto>>({})
  const [presupuestoTotal, setPresupuestoTotal] = useState<PresupuestoTotal>({
    ingredientes: 0,
    packagings: 0,
    total: 0,
    ganancia: 0
  })

  // Calcular ingredientes y packagings finales cuando cambian las recetas o extras
  useEffect(() => {
    calcularInsumosFinales()
  }, [recetasSeleccionadas, ingredientesExtras, packagingsExtras, recetas, ingredientes, packagings])

  // Inicializar presupuestos cuando cambian los insumos finales
  useEffect(() => {
    inicializarPresupuestos()
  }, [ingredientesFinales, packagingsFinales])

  // Calcular total cuando cambian los presupuestos
  useEffect(() => {
    calcularPresupuestoTotal()
  }, [ingredientePresupuesto, packagingPresupuesto])

  const calcularInsumosFinales = () => {
    const ingredientesMap = new Map<number, { ingrediente: Ingrediente; cantidad_kg: number }>()
    const packagingsMap = new Map<number, { packaging: Packagin; cantidad: number }>()

    // Agregar ingredientes de recetas seleccionadas
    recetasSeleccionadas.forEach(recetaSeleccionada => {
      const receta = recetas.find(r => r.id === recetaSeleccionada.id)
      if (receta) {
        receta.ingredientes.forEach(ing => {
          const cantidadTotal = ing.cantidad_kg * recetaSeleccionada.multiplicador
          if (ingredientesMap.has(ing.id!)) {
            const existing = ingredientesMap.get(ing.id!)!
            existing.cantidad_kg += cantidadTotal
          } else {
            ingredientesMap.set(ing.id!, {
              ingrediente: ing,
              cantidad_kg: cantidadTotal
            })
          }
        })

        receta.packagings.forEach(pack => {
          const cantidadTotal = pack.cantidad * recetaSeleccionada.multiplicador
          if (packagingsMap.has(pack.id!)) {
            const existing = packagingsMap.get(pack.id!)!
            existing.cantidad += cantidadTotal
          } else {
            packagingsMap.set(pack.id!, {
              packaging: pack,
              cantidad: cantidadTotal
            })
          }
        })
      }
    })

    // Agregar ingredientes extras
    ingredientesExtras.forEach(extra => {
      const ingrediente = ingredientes.find(i => i.id === extra.id)
      if (ingrediente) {
        if (ingredientesMap.has(extra.id)) {
          const existing = ingredientesMap.get(extra.id)!
          existing.cantidad_kg += extra.cantidad_kg
        } else {
          ingredientesMap.set(extra.id, {
            ingrediente,
            cantidad_kg: extra.cantidad_kg
          })
        }
      }
    })

    // Agregar packagings extras
    packagingsExtras.forEach(extra => {
      const packaging = packagings.find(p => p.id === extra.id)
      if (packaging) {
        if (packagingsMap.has(extra.id)) {
          const existing = packagingsMap.get(extra.id)!
          existing.cantidad += extra.cantidad
        } else {
          packagingsMap.set(extra.id, {
            packaging,
            cantidad: extra.cantidad
          })
        }
      }
    })

    // Convertir a arrays finales
    const ingredientesFinalesArray = Array.from(ingredientesMap.values()).map(item => ({
      ...item.ingrediente,
      cantidad_kg: item.cantidad_kg
    }))

    const packagingsFinalesArray = Array.from(packagingsMap.values()).map(item => ({
      ...item.packaging,
      cantidad: item.cantidad
    }))

    setIngredientesFinales(ingredientesFinalesArray)
    setPackagingsFinales(packagingsFinalesArray)
  }

  const inicializarPresupuestos = () => {
    const newIngredientePresupuesto: Record<number, IngredientePresupuesto> = {}
    ingredientesFinales.forEach(ingrediente => {
      newIngredientePresupuesto[ingrediente.id] = {
        id: ingrediente.id,
        proveedorSeleccionado: null,
        precioSeleccionado: null,
        multiplicador: 1,
        subtotal: 0
      }
    })
    setIngredientePresupuesto(newIngredientePresupuesto)

    const newPackagingPresupuesto: Record<number, PackagingPresupuesto> = {}
    packagingsFinales.forEach(packaging => {
      newPackagingPresupuesto[packaging.id] = {
        id: packaging.id,
        proveedorSelecionado: null,
        precioSelecionado: null,
        multiplicador: 1,
        subtotal: 0
      }
    })
    setPackagingPresupuesto(newPackagingPresupuesto)
  }

  const calcularPresupuestoTotal = () => {
    const totalIngredientes = Object.values(ingredientePresupuesto).reduce((sum, item) => sum + item.subtotal, 0)
    const totalPackagings = Object.values(packagingPresupuesto).reduce((sum, item) => sum + item.subtotal, 0)
    const total = totalIngredientes + totalPackagings
    
    setPresupuestoTotal({
      ingredientes: totalIngredientes,
      packagings: totalPackagings,
      total,
      ganancia: total * 1.5
    })
  }

  const agregarReceta = () => {
    if (recetas.length > 0) {
      const recetaDisponible = recetas.find(r => 
        !recetasSeleccionadas.some(rs => rs.id === r.id)
      )
      if (recetaDisponible) {
        setRecetasSeleccionadas(prev => [...prev, {
          id: recetaDisponible.id!,
          title: recetaDisponible.title,
          multiplicador: 1
        }])
      }
    }
  }

  const eliminarReceta = (index: number) => {
    setRecetasSeleccionadas(prev => prev.filter((_, i) => i !== index))
  }

  const actualizarReceta = (index: number, field: keyof RecetaSeleccionada, value: any) => {
    setRecetasSeleccionadas(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const agregarIngredienteExtra = () => {
    if (ingredientes.length > 0) {
      const ingredienteDisponible = ingredientes.find(i => 
        !ingredientesExtras.some(ie => ie.id === i.id) &&
        !ingredientesFinales.some(inf => inf.id === i.id)
      )
      if (ingredienteDisponible) {
        setIngredientesExtras(prev => [...prev, {
          id: ingredienteDisponible.id!,
          cantidad_kg: 0.1
        }])
      }
    }
  }

  const eliminarIngredienteExtra = (index: number) => {
    setIngredientesExtras(prev => prev.filter((_, i) => i !== index))
  }

  const actualizarIngredienteExtra = (index: number, field: string, value: any) => {
    setIngredientesExtras(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: field === 'id' ? Number(value) : parseFloat(value) }
      return updated
    })
  }

  const agregarPackagingExtra = () => {
    if (packagings.length > 0) {
      const packagingDisponible = packagings.find(p => 
        !packagingsExtras.some(pe => pe.id === p.id) &&
        !packagingsFinales.some(pf => pf.id === p.id)
      )
      if (packagingDisponible) {
        setPackagingsExtras(prev => [...prev, {
          id: packagingDisponible.id!,
          cantidad: 1
        }])
      }
    }
  }

  const eliminarPackagingExtra = (index: number) => {
    setPackagingsExtras(prev => prev.filter((_, i) => i !== index))
  }

  const actualizarPackagingExtra = (index: number, field: string, value: any) => {
    setPackagingsExtras(prev => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: Number(value) }
      return updated
    })
  }

  const handleIngredientePrecioChange = (ingredienteId: number, proveedorName: string | null, precio: number | null) => {
    setIngredientePresupuesto(prev => {
      const updated = { ...prev }
      const ingrediente = ingredientesFinales.find(ing => ing.id === ingredienteId)
      const multiplicador = updated[ingredienteId]?.multiplicador || 1
      const cantidadKg = ingrediente?.cantidad_kg || 0

      updated[ingredienteId] = {
        ...updated[ingredienteId],
        proveedorSeleccionado: proveedorName,
        precioSeleccionado: precio,
        subtotal: precio ? precio * cantidadKg * multiplicador : 0
      }
      return updated
    })
  }

  const handleIngredienteMultiplicadorChange = (ingredienteId: number, multiplicador: number) => {
    setIngredientePresupuesto(prev => {
      const updated = { ...prev }
      const ingrediente = ingredientesFinales.find(ing => ing.id === ingredienteId)
      const precio = updated[ingredienteId]?.precioSeleccionado || 0
      const cantidadKg = ingrediente?.cantidad_kg || 0

      updated[ingredienteId] = {
        ...updated[ingredienteId],
        multiplicador,
        subtotal: precio * cantidadKg * multiplicador
      }
      return updated
    })
  }

  const handlePackagingPrecioChange = (packagingId: number, proveedorName: string, precio: number) => {
    setPackagingPresupuesto(prev => {
      const updated = { ...prev }
      const packaging = packagingsFinales.find(pack => pack.id === packagingId)
      const multiplicador = updated[packagingId]?.multiplicador || 1
      const cantidad = packaging?.cantidad || 0

      updated[packagingId] = {
        ...updated[packagingId],
        proveedorSelecionado: proveedorName,
        precioSelecionado: precio,
        subtotal: precio * cantidad * multiplicador
      }
      return updated
    })
  }

  const handlePackagingMultiplicadorChange = (packagingId: number, multiplicador: number) => {
    setPackagingPresupuesto(prev => {
      const updated = { ...prev }
      const packaging = packagingsFinales.find(pack => pack.id === packagingId)
      const precio = updated[packagingId]?.precioSelecionado || 0
      const cantidad = packaging?.cantidad || 0

      updated[packagingId] = {
        ...updated[packagingId],
        multiplicador,
        subtotal: precio * cantidad * multiplicador
      }
      return updated
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount)
  }

  return (
    <section className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Selector de presupuesto personalizado */}
      <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="h-6 w-6 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Presupuesto personalizado
          </h1>
        </div>

        {/* Recetas seleccionadas */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recetas base</h3>
            <button
              onClick={agregarReceta}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              <Plus size={16} />
              Agregar receta
            </button>
          </div>
          
          {recetasSeleccionadas.map((receta, index) => (
            <div key={index} className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
              <select
                value={receta.id}
                onChange={(e) => {
                  const nuevaReceta = recetas.find(r => r.id === Number(e.target.value))
                  if (nuevaReceta) {
                    actualizarReceta(index, 'id', Number(e.target.value))
                    actualizarReceta(index, 'title', nuevaReceta.title)
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                {recetas
                  .filter(r => r.id === receta.id || !recetasSeleccionadas.some(rs => rs.id === r.id))
                  .map(r => (
                    <option key={r.id} value={r.id}>{r.title}</option>
                  ))}
              </select>
              
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={receta.multiplicador}
                onChange={(e) => actualizarReceta(index, 'multiplicador', parseFloat(e.target.value) || 1)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md"
                placeholder="x1"
              />
              
              <button
                onClick={() => eliminarReceta(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Ingredientes extras */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Ingredientes extras</h3>
            <button
              onClick={agregarIngredienteExtra}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              <Plus size={16} />
              Agregar ingrediente
            </button>
          </div>
          
          {ingredientesExtras.map((ingrediente, index) => (
            <div key={index} className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
              <select
                value={ingrediente.id}
                onChange={(e) => actualizarIngredienteExtra(index, 'id', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                {ingredientes
                  .filter(i => i.id === ingrediente.id || (!ingredientesExtras.some(ie => ie.id === i.id) && !ingredientesFinales.some(inf => inf.id === i.id)))
                  .map(i => (
                    <option key={i.id} value={i.id}>{i.name}</option>
                  ))}
              </select>
              
              <input
                type="number"
                step="0.001"
                min="0.001"
                value={ingrediente.cantidad_kg}
                onChange={(e) => actualizarIngredienteExtra(index, 'cantidad_kg', e.target.value)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-md"
                placeholder="kg"
              />
              
              <button
                onClick={() => eliminarIngredienteExtra(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Packagings extras */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Packagings extras</h3>
            <button
              onClick={agregarPackagingExtra}
              className="flex items-center gap-2 px-3 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
            >
              <Plus size={16} />
              Agregar packaging
            </button>
          </div>
          
          {packagingsExtras.map((packaging, index) => (
            <div key={index} className="flex items-center gap-3 mb-3 p-3 bg-gray-50 rounded-lg">
              <select
                value={packaging.id}
                onChange={(e) => actualizarPackagingExtra(index, 'id', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              >
                {packagings
                  .filter(p => p.id === packaging.id || (!packagingsExtras.some(pe => pe.id === p.id) && !packagingsFinales.some(pf => pf.id === p.id)))
                  .map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
              </select>
              
              <input
                type="number"
                min="1"
                value={packaging.cantidad}
                onChange={(e) => actualizarPackagingExtra(index, 'cantidad', e.target.value)}
                className="w-24 px-3 py-2 border border-gray-300 rounded-md"
                placeholder="cant"
              />
              
              <button
                onClick={() => eliminarPackagingExtra(index)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Mostrar ingredientes y packagings finales si hay alguno */}
      {(ingredientesFinales.length > 0 || packagingsFinales.length > 0) && (
        <>
          {ingredientesFinales.length > 0 && (
            <IngredienteSection
              ingredientes={ingredientesFinales}
              ingredientePresupuesto={ingredientePresupuesto}
              onIngredientePrecioChange={handleIngredientePrecioChange}
              onIngredienteMultiplicadorChange={handleIngredienteMultiplicadorChange}
              formatCurrency={formatCurrency}
            />
          )}

          {packagingsFinales.length > 0 && (
            <PackagingSection
              packagings={packagingsFinales}
              packagingPresupuesto={packagingPresupuesto}
              onPackagingPrecioChange={handlePackagingPrecioChange}
              onPackagingMultiplicadorChange={handlePackagingMultiplicadorChange}
              formatCurrency={formatCurrency}
            />
          )}

          <PresupuestoResumen
            presupuestoTotal={presupuestoTotal}
            formatCurrency={formatCurrency}
          />
        </>
      )}
    </section>
  )
}
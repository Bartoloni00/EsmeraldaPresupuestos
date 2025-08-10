import type { Ingrediente } from './IngredienteCard'
import type { Receta } from '../entities/recetas'
import { useState, useEffect } from 'react'
import RecetaSelector from './RecetaSelector'
import IngredienteSection from './IngredienteSection'
import PackagingSection from './PackagingSection'
import PresupuestoResumen from './PresupuestoResumen'
import EmptyState from './EmptyState'
import type { IngredientePresupuesto } from './IngredienteCard'
import type { PackagingPresupuesto } from './PackagingCard'

interface PresupuestoTotal {
    ingredientes: number
    packagings: number
    total: number
    ganancia: number
}

export default function RecetaPresupuestoSection({recetas}: {recetas: Receta[]}) {
    const [selectedReceta, setSelectedReceta] = useState<Receta | null>(null)
    const [ingredientePresupuesto, setIngredientePresupuesto] = useState<Record<number, IngredientePresupuesto>>({})
    const [packagingPresupuesto, setPackagingPresupuesto] = useState<Record<number, PackagingPresupuesto>>({})
    const [presupuestoTotal, setPresupuestoTotal] = useState<PresupuestoTotal>({ingredientes: 0, packagings: 0, total: 0, ganancia: 0})
    useEffect(() => {
        if (recetas.length === 0 && !selectedReceta) {
            setSelectedReceta(recetas[0])
        }
    }, [recetas])

    useEffect(() => {
        if (selectedReceta) {
            const newIngredientePresupuesto: Record<number, IngredientePresupuesto> = {}
            selectedReceta.ingredientes.forEach(ingrediente => {
                if (ingrediente.id !== undefined) {
                    newIngredientePresupuesto[ingrediente.id] = {
                        id: ingrediente.id,
                        proveedorSeleccionado: null,
                        precioSeleccionado: null,
                        multiplicador: ingrediente.multiplicador || 1,
                        subtotal: 0
                    }
                }
                setIngredientePresupuesto(newIngredientePresupuesto)

                const newPackagingPresupuesto: Record<number, PackagingPresupuesto> = {}
                selectedReceta.packagings.forEach(packaging => {
                    if (packaging.id !== undefined) {
                        newPackagingPresupuesto[packaging.id] = {
                            id: packaging.id,
                            proveedorSelecionado: null,
                            precioSelecionado: null,
                            multiplicador: packaging.multiplicador || 1,
                            subtotal: 0
                        }
                    }
                    setPackagingPresupuesto(newPackagingPresupuesto)
                })
            })
        }
    },[selectedReceta])

    useEffect(() => {
        calcularPresupuestoTotal()
    }, [ingredientePresupuesto, packagingPresupuesto])
    
    const handleIngredientePrecioChange = (ingredienteId: number, proveedorName: string | null, precio: number | null): void => {
        setIngredientePresupuesto(prev => {
            const updated = {...prev}
            const ingrediente = selectedReceta?.ingredientes.find(ing => ing.id === ingredienteId)
            const multiplicador = updated[ingredienteId]?.multiplicador || 1
            const cantidadKg = ingrediente?.cantidad_kg || 0

            updated[ingredienteId] = {
                ...updated[ingredienteId],
                proveedorSeleccionado: proveedorName,
                precioSeleccionado: precio,
                subtotal: precio? precio  * cantidadKg * multiplicador : 0
            }
            return updated
        })
    }

    const handleIngredienteMultiplicadorChange = (ingredienteId: number, multiplicador: number) => {
        setIngredientePresupuesto(prev => {
            const updated = {...prev}
            const ingrediente = selectedReceta?.ingredientes.find(ing => ing.id === ingredienteId)
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
            const updated = {...prev}
            const packaging = selectedReceta?.packagings.find(pack => pack.id === packagingId)
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
            const updated = {...prev}
            const packaging = selectedReceta?.packagings.find(pack => pack.id === packagingId)
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

    const calcularPresupuestoTotal = () => {
        const totalIngredientes = Object.values(ingredientePresupuesto).reduce((sum, item) => sum + item.subtotal,0)
        const totalPackagings = Object.values(packagingPresupuesto).reduce((sum, item) => sum + item.subtotal, 0)
        setPresupuestoTotal({
            ingredientes: totalIngredientes,
            packagings: totalPackagings,
            total: totalIngredientes + totalPackagings,
            ganancia: totalIngredientes + totalPackagings * 1.5
        })
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-ES',{
            style: 'currency',
            currency: 'ARS'
        }).format(amount)
    }

    if(!recetas.length) return <EmptyState/>
  return (
    <section className='max-w-6xl mx-auto p-6 space-y-8'>
        <RecetaSelector
            recetas={recetas}
            selectedReceta={selectedReceta}
            onRecetaChange={setSelectedReceta}
        />

       {selectedReceta && (
        <>
            <IngredienteSection
                ingredientes={selectedReceta.ingredientes as Ingrediente[]}
                ingredientePresupuesto={ingredientePresupuesto}
                onIngredientePrecioChange={handleIngredientePrecioChange}
                onIngredienteMultiplicadorChange={handleIngredienteMultiplicadorChange}
                formatCurrency={formatCurrency}
            />
            <PackagingSection
                packagings={selectedReceta.packagings}
                packagingPresupuesto={packagingPresupuesto}
                onPackagingPrecioChange={handlePackagingPrecioChange}
                onPackagingMultiplicadorChange={handlePackagingMultiplicadorChange}
                formatCurrency={formatCurrency}
            />

            <PresupuestoResumen
                presupuestoTotal={presupuestoTotal}
                formatCurrency={formatCurrency}
            />
        </>
       )} 
    </section>
    )
}
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Recetas from './pages/recetas/Recetas'
import Proveedores from './pages/proveedores/Proveedores'
import Insumos from './pages/Insumos'
import IngredientesDetalles from './pages/ingredientes/IngredientesDetalles'
import PackagingDetalles from './pages/packagings/PackagingDetalles'
import ProveedoresDetalles from './pages/proveedores/ProveedoresDetalles'
import RecetaDetalles from './pages/recetas/RecetaDetalles'
import Navbar from './components/Navbar'
import CreateIngrediente from './pages/ingredientes/CreateIngrediente'
import CreatePackaging from './pages/packagings/CreatePackaging'
import CreateReceta from './pages/recetas/CreateReceta'
import CreateProveedor from './pages/proveedores/CreateProveedor'

import UpdatePackaging from './pages/packagings/UpdatePackaging'
import UpdateProveedor from './pages/proveedores/UpdateProveedor'
import UpdateIngrediente from './pages/ingredientes/UpdateIngrediente'
import UpdateReceta from './pages/recetas/UpdateReceta.tsx'

function App() {
  return (
    <>
    <Navbar />
      <main className="min-h-screen bg-cream max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recetas" element={<Recetas />} />
            <Route path="/proveedores" element={<Proveedores />} />
            <Route path="/insumos" element={<Insumos />} />
            <Route path="/ingredientes/nuevo" element={<CreateIngrediente />} />
            <Route path="/packaging/nuevo" element={<CreatePackaging />} />
            <Route path="/ingredientes/:ingrediente_id" element={<IngredientesDetalles />} />
            <Route path="/packaging/:packaging_id" element={<PackagingDetalles/>} />
            <Route path='/proveedores/nuevo' element={<CreateProveedor />} />
            <Route path='/proveedores/:proveedor_id' element={<ProveedoresDetalles />} />
            <Route path="/recetas/nuevo" element={<CreateReceta />} />
            <Route path="/recetas/:receta_id" element={<RecetaDetalles />} />
            <Route path="/packaging/:packaging_id/update" element={<UpdatePackaging />} />
            <Route path="/proveedores/:proveedor_id/update" element={<UpdateProveedor />} />
            <Route path="/ingredientes/:ingrediente_id/update" element={<UpdateIngrediente />} />
            <Route path="/recetas/:receta_id/update" element={<UpdateReceta />} />
          </Routes>
      </main>
    </>
  )
}

export default App

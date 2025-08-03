import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Recetas from './pages/Recetas'
import Proveedores from './pages/Proveedores'
import Insumos from './pages/Insumos'
import IngredientesDetalles from './pages/IngredientesDetalles'
import PackagingDetalles from './pages/PackagingDetalles'
import ProveedoresDetalles from './pages/ProveedoresDetalles'
import RecetaDetalles from './pages/RecetaDetalles'
import Navbar from './components/Navbar'
import CreateIngrediente from './pages/CreateIngrediente'
import CreatePackaging from './pages/CreatePackaging'

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
            <Route path='/proveedores/:proveedor_id' element={<ProveedoresDetalles />} />
            <Route path="/recetas/:receta_id" element={<RecetaDetalles />} />
          </Routes>
      </main>
    </>
  )
}

export default App

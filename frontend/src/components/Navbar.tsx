import { Link } from 'react-router-dom'
import { Gem, House, CookingPot, Store, Carrot } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="block w-full max-w-screen-lg px-4 py-2 mx-auto bg-cream shadow-md rounded-md lg:px-8 lg:py-3 mt-10">
      <div className="container flex flex-wrap items-center justify-between mx-auto text-dark">
        <Link to="/" className="mr-4 block cursor-pointer py-1.5 text-base font-semibold">
          <Gem />
        </Link>
    
        <div className="hidden lg:block">
          <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="p-1 text-sm">
              <Link to="/" className="flex items-center gap-x-2">
                <House />
                Inicio
              </Link>
            </li>
            <li className="p-1 text-sm">
              <Link to="/recetas" className="flex items-center gap-x-2">
                <CookingPot/>
                Recetas
              </Link>
            </li>
            <li className="p-1 text-sm">
              <Link to="/proveedores" className="flex items-center gap-x-2">
                <Store/>
                Proveedores
              </Link>
            </li>
            <li className="p-1 text-sm">
              <Link to="/insumos" className="flex items-center gap-x-2">
                <Carrot />
                Insumos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>)
}
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import { getProveedores } from "../../services/Proveedores";
import { Link } from "react-router-dom";

export default function Proveedores() {
  const [proveedores, setProveedores] = useState<any[]>([])

  useEffect(() => {
    getProveedores().then(proveedores => setProveedores(proveedores))
  }, [])
  return (
    <section className="p-4 flex flex-col">
      <h1 className="text-2xl text-dark font-bold mb-4 text-center">Lista de Proveedores</h1>
      <Link
        to="/proveedores/nuevo"
        className="text-dark font-bold py-4 mb-2 w-full text-center bg-emerald-600 rounded-lg hover:bg-emerald-500 transition-colors"
      >
        Agregar nuevo proveedor
      </Link>
      <Table headerRows={["Nombre", "Descripción", "Teléfono", "Dirección", "Ver"]} data={
        proveedores.map(p => [
          p.name, 
          p.descripcion,
          p.telefono,
          p.calle ? `${p.calle}, ${p.numero_calle}, ${p.ciudad}, ${p.provincia}, ${p.pais}` : 'Ubicación no disponible',
          <Link
            to={`/proveedores/${p.id}`}
            className="text-emerald-600 hover:underline font-medium"
          >
            Ver detalles
          </Link>,
        ])} 
      />
    </section>
  )
}
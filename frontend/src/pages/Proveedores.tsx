import Table from "../components/Table";
import { useEffect, useState } from "react";
import { getProveedores } from "../services/Proveedores";
import { Link } from "react-router-dom";

export default function Proveedores() {
  const [proveedores, setProveedores] = useState<any[]>([])

  useEffect(() => {
    getProveedores().then(proveedores => setProveedores(proveedores))
  }, [])
  return (
    <section className="p-4">
      <h1 className="text-2xl text-dark font-bold mb-4 text-center">Lista de Proveedores</h1>
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
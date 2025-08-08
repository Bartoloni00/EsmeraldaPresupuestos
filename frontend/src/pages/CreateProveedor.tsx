import { useState } from 'react'
import type { Proveedor } from '../entities/proveedores'
import { createProveedor } from '../services/Proveedores'
import { useNavigate } from 'react-router-dom'
import BaseInput from '../components/BaseInput'

export default function CreateProveedor() {
  const navigate = useNavigate()

  const [errors, setErrors] = useState<string[]>([])
  const [proveedor, setProveedor] = useState<Proveedor>({
    name: '',
    descripcion: '',
    telefono: '',
    mail: '',
    pagina: '',
    pais: '',
    provincia: '',
    ciudad: '',
    calle: '',
    numero_calle: '',
  })

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  const { name, value, type } = e.target

  setProveedor(prev => ({
    ...prev,
    [name]: type === 'number'
      ? value === ''
        ? ''
        : Number(value)
      : value
  }))
}

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createProveedor(proveedor)
  .then(() => navigate('/proveedores'))
  .catch(async (error) => {
    try {
      if (error?.data) {
        const fieldErrors = Object.values(error.data)
          .flatMap((field: any) => field._errors ?? [])
          .filter((e) => typeof e === 'string' && e.trim() !== '');
        console.log(error)

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
        Agregar nuevo proveedor
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        <BaseInput
          label="Nombre"
          name="name"
          value={proveedor.name}
          onChange={handleChange}
          placeholder="Nombre del proveedor"
        />

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            name="descripcion"
            value={proveedor.descripcion}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 text-dark p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        <BaseInput
          label=" Teléfono"
          name="telefono"
          value={proveedor.telefono}
          onChange={handleChange}
          placeholder="Teléfono del proveedor"
          type='number'
        />

        <BaseInput
          label="Email"
          name="mail"
          value={proveedor.mail}
          onChange={handleChange}
          placeholder="Email del proveedor"
          type='email'
        />

        <BaseInput
          label="Página web"
          name="pagina"
          value={proveedor.pagina ?? ''}
          onChange={handleChange}
          placeholder="Página web del proveedor"
          type='text'
          isOpcional={true}
        />

        <BaseInput
          label="Pais"
          name="pais"
          value={proveedor.pais ?? 'Argentina'}
          onChange={handleChange}
          placeholder="Pais del proveedor"
        />

        <BaseInput
          label="Provincia"
          name="provincia"
          value={proveedor.provincia ?? 'Santa Fe'}
          onChange={handleChange}
          placeholder="Provincia del proveedor"
        />

        <BaseInput
          label="Ciudad"
          name="ciudad"
          value={proveedor.ciudad ?? 'Rosario'}
          onChange={handleChange}
          placeholder="Ciudad del proveedor"
        />

        <BaseInput
          label="Calle"
          name="calle"
          value={proveedor.calle ?? ''}
          onChange={handleChange}
          placeholder="Calle del proveedor"
          type='text'
          isOpcional={true}
        />

        <BaseInput
          label="Número de calle"
          name="numero_calle"
          value={proveedor.numero_calle ?? ''}
          onChange={handleChange}
          placeholder="Número de calle del proveedor"
          type='number'
          isOpcional={true}
        />

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
            Agregar proveedor
          </button>
        </div>
      </form>
    </section>
  )
}
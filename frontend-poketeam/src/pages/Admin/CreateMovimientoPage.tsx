// src/pages/Admin/CreateOrEditMovimientoPage.tsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createMovimiento, updateMovimiento, getMovimientoById } from '../../api/movimiento.api'
import type { CreateMovimientoInput, Movimiento } from '../../types/movimiento.types'

const CreateOrEditMovimientoPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()

  const [formData, setFormData] = useState<CreateMovimientoInput>({
    nombre: '',
    tipo: '',
    categoria: 'físico',  // ✅ minúscula directamente para el enum
    poder: null,
    pp: 0,
    descripcion: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const fetchMovimiento = async () => {
      setLoading(true)
      try {
        const movimiento: Movimiento = await getMovimientoById(Number(id))
        setFormData({
          nombre: movimiento.nombre,
          tipo: movimiento.tipo,
          categoria: movimiento.categoria,
          poder: movimiento.poder ?? null,
          pp: movimiento.pp,
          descripcion: movimiento.descripcion
        })
      } catch (err) {
        console.error('❌ Error al cargar el movimiento:', err)
        setError('No se pudo cargar el movimiento para edición.')
      } finally {
        setLoading(false)
      }
    }

    fetchMovimiento()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : (name === 'categoria' ? value.toLowerCase() : value)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (id) {
        await updateMovimiento(Number(id), formData)
        alert('✅ Movimiento actualizado correctamente')
      } else {
        await createMovimiento(formData)
        alert('✅ Movimiento creado correctamente')
      }
      navigate('/admin/movimientos')
    } catch (err) {
      console.error('❌ Error al guardar el movimiento:', err)
      setError('Error al guardar el movimiento. Verifica los datos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {id ? 'Editar Movimiento' : 'Crear Movimiento'}
      </h1>

      {loading && <p className="text-center mb-4 text-blue-600">🔄 Procesando...</p>}
      {error && <p className="text-center mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="tipo" className="block text-sm font-medium mb-1">Tipo</label>
          <input
            type="text"
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="categoria" className="block text-sm font-medium mb-1">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          >
            <option value="físico">Físico</option>
            <option value="especial">Especial</option>
            <option value="estado">Estado</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="poder" className="block text-sm font-medium mb-1">Poder</label>
            <input
              type="number"
              id="poder"
              name="poder"
              value={formData.poder ?? ''}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="pp" className="block text-sm font-medium mb-1">Puntos de Poder (PP)</label>
            <input
              type="number"
              id="pp"
              name="pp"
              value={formData.pp ?? ''}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={3}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Guardando...' : id ? 'Actualizar Movimiento' : 'Crear Movimiento'}
        </button>
      </form>
    </div>
  )
}

export default CreateOrEditMovimientoPage

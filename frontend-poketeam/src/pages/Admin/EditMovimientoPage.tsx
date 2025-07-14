import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getMovimientoById, updateMovimiento } from '../../api/movimiento.api'
import type { UpdateMovimientoInput, CreateMovimientoInput } from '../../types/movimiento.types'

const EditMovimientoPage = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [formData, setFormData] = useState<Partial<CreateMovimientoInput>>({
    nombre: '',
    tipo: '',
    categoria: 'físico',
    poder: 0,
    pp: 0,
    descripcion: ''
  })

  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    const fetchMovimiento = async () => {
      setLoading(true)
      try {
        const movimiento = await getMovimientoById(Number(id))
        setFormData({
          nombre: movimiento.nombre,
          tipo: movimiento.tipo,
          categoria: movimiento.categoria || 'Físico',
          poder: movimiento.poder ?? 0,
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.nombre || !formData.tipo || !formData.categoria) {
      setError('Completa todos los campos requeridos')
      return
    }
    setLoading(true)
    try {
      const updatedData: UpdateMovimientoInput = {
        ...formData,
        categoria: (formData.categoria || 'Físico')
      }
      await updateMovimiento(Number(id), updatedData)
      alert('✅ Movimiento actualizado correctamente')
      navigate('/admin/movimientos')
    } catch (err) {
      console.error('❌ Error al actualizar movimiento:', err)
      setError('Error al actualizar el movimiento.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Editar Movimiento</h1>

      {loading && <p className="text-center mb-4 text-blue-600">🔄 Cargando...</p>}
      {error && <p className="text-center mb-4 text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre ?? ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="tipo" className="block text-sm font-medium mb-1">Tipo</label>
          <input
            type="text"
            id="tipo"
            name="tipo"
            value={formData.tipo ?? ''}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="categoria" className="block text-sm font-medium mb-1">Categoría</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria ?? 'Físico'}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="Físico">Físico</option>
            <option value="Especial">Especial</option>
            <option value="Estado">Estado</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="poder" className="block text-sm font-medium mb-1">Poder</label>
            <input
              type="number"
              id="poder"
              name="poder"
              value={formData.poder ?? 0}
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
              value={formData.pp ?? 0}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion ?? ''}
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
          {loading ? 'Guardando...' : 'Actualizar Movimiento'}
        </button>
      </form>
    </div>
  )
}

export default EditMovimientoPage

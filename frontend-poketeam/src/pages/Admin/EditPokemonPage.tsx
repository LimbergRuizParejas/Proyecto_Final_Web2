import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getPokemonById, updatePokemon } from '../../api/pokemon.api'
import type { Pokemon } from '../../types/pokemon.types'
import type { ChangeEvent, FormEvent } from 'react'

const EditPokemonPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<Pokemon | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const BASE_URL = (import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000').replace(/\/$/, '')

  useEffect(() => {
    if (!id) return
    getPokemonById(Number(id))
      .then(data => setFormData(data))
      .catch(() => setError('❌ Error al cargar el Pokémon'))
      .finally(() => setLoading(false))
  }, [id])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return
    const { name, value } = e.target

    if (name in formData.stats) {
      setFormData({
        ...formData,
        stats: { ...formData.stats, [name]: Number(value) }
      })
    } else if (name === 'habilidades') {
      setFormData({
        ...formData,
        habilidades: value.split(',').map(h => h.trim())
      })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!id || !formData) return

    try {
      const payload = new FormData()
      payload.append('nombre', formData.nombre)
      payload.append('tipo1', formData.tipo1)
      payload.append('tipo2', formData.tipo2 || '')
      payload.append('descripcion', formData.descripcion || '')
      payload.append('habilidades', formData.habilidades?.join(',') || '')
      payload.append('statsBase', JSON.stringify(formData.stats))
      if (file) payload.append('imagen', file)

      await updatePokemon(Number(id), payload)
      setSuccess('✅ Pokémon actualizado correctamente')
      setTimeout(() => navigate('/admin/pokemon'), 1200)
    } catch {
      setError('❌ Error al actualizar el Pokémon')
    }
  }

  if (loading) return <p className="p-6 text-center">🔄 Cargando Pokémon...</p>
  if (error) return <p className="p-6 text-center text-red-600">{error}</p>
  if (!formData) return null

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Editar Pokémon</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Imagen actual */}
        <div>
          <label htmlFor="imagen" className="block text-sm font-medium">Imagen actual</label>
          {formData.imagen && (
            <div className="mb-2">
              <img
                src={`${BASE_URL}/${formData.imagen.replace(/^\//, '')}`}
                alt={`Imagen de ${formData.nombre}`}
                className="w-32 h-32 object-contain border rounded"
              />
            </div>
          )}
          <input
            id="imagen"
            type="file"
            onChange={handleFileChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="tipo1" className="block text-sm font-medium">Tipo primario</label>
          <input
            id="tipo1"
            name="tipo1"
            value={formData.tipo1}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="tipo2" className="block text-sm font-medium">Tipo secundario (opcional)</label>
          <input
            id="tipo2"
            name="tipo2"
            value={formData.tipo2 || ''}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion || ''}
            onChange={handleChange}
            rows={3}
            className="w-full border px-4 py-2 rounded resize-none"
          />
        </div>

        <div>
          <label htmlFor="habilidades" className="block text-sm font-medium">Habilidades (separadas por coma)</label>
          <input
            id="habilidades"
            name="habilidades"
            value={formData.habilidades?.join(', ') || ''}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(formData.stats).map(([stat, value]) => (
            <div key={stat}>
              <label htmlFor={stat} className="block text-xs font-medium capitalize">{stat}</label>
              <input
                id={stat}
                name={stat}
                type="number"
                value={value}
                onChange={handleChange}
                className="border px-4 py-2 rounded w-full"
              />
            </div>
          ))}
        </div>

        {success && <p className="text-green-600 text-sm">{success}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  )
}

export default EditPokemonPage

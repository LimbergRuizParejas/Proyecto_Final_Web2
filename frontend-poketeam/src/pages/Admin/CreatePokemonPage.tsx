import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPokemon } from '../../api/pokemon.api'
import type { ChangeEvent, FormEvent } from 'react'

const CreatePokemonPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: '',
    tipo1: '',
    tipo2: '',
    descripcion: '',
    habilidades: '',
    stats: { hp: 0, atk: 0, def: 0, sp_atk: 0, sp_def: 0, speed: 0 }
  })
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Manejar cambios en inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name in formData.stats) {
      setFormData(prev => ({
        ...prev,
        stats: { ...prev.stats, [name]: Number(value) }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  // Manejar submit del form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    try {
      const payload = new FormData()
      payload.append('nombre', formData.nombre.trim())
      payload.append('tipo1', formData.tipo1.trim())
      payload.append('tipo2', formData.tipo2.trim())
      payload.append('descripcion', formData.descripcion.trim())
      payload.append('habilidades', formData.habilidades.trim())
      payload.append('statsBase', JSON.stringify(formData.stats))
      if (file) payload.append('imagen', file)

      await createPokemon(payload)
      setSuccess('✅ Pokémon creado correctamente.')

      // Limpiar formulario
      setFormData({
        nombre: '',
        tipo1: '',
        tipo2: '',
        descripcion: '',
        habilidades: '',
        stats: { hp: 0, atk: 0, def: 0, sp_atk: 0, sp_def: 0, speed: 0 }
      })
      setFile(null)

      // Redirigir después de un segundo
      setTimeout(() => navigate('/admin/pokemon'), 1200)
    } catch (err) {
      console.error('❌ Error al crear el Pokémon:', err)
      setError('Error al crear el Pokémon. Verifica los datos o intenta más tarde.')
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Crear Nuevo Pokémon</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium">Nombre</label>
          <input
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ej: Pikachu"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Tipo principal */}
        <div>
          <label htmlFor="tipo1" className="block text-sm font-medium">Tipo principal</label>
          <input
            id="tipo1"
            name="tipo1"
            value={formData.tipo1}
            onChange={handleChange}
            placeholder="Ej: Eléctrico"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Tipo secundario */}
        <div>
          <label htmlFor="tipo2" className="block text-sm font-medium">Tipo secundario</label>
          <input
            id="tipo2"
            name="tipo2"
            value={formData.tipo2}
            onChange={handleChange}
            placeholder="Ej: Acero (opcional)"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="descripcion" className="block text-sm font-medium">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción breve del Pokémon"
            className="w-full border p-2 rounded"
            rows={3}
          />
        </div>

        {/* Habilidades */}
        <div>
          <label htmlFor="habilidades" className="block text-sm font-medium">Habilidades</label>
          <input
            id="habilidades"
            name="habilidades"
            value={formData.habilidades}
            onChange={handleChange}
            placeholder="Separadas por coma"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(formData.stats).map(([stat, value]) => (
            <div key={stat}>
              <label htmlFor={stat} className="block text-xs font-medium capitalize">{stat}</label>
              <input
                id={stat}
                name={stat}
                type="number"
                value={value}
                onChange={handleChange}
                placeholder={`Stat: ${stat}`}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          ))}
        </div>

        {/* Imagen */}
        <div>
          <label htmlFor="imagen" className="block text-sm font-medium">Imagen</label>
          <input
            id="imagen"
            type="file"
            accept="image/*"
            onChange={e => e.target.files?.[0] && setFile(e.target.files[0])}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Mensajes */}
        {success && <p className="text-green-600 text-sm">{success}</p>}
        {error && <p className="text-red-600 text-sm">{error}</p>}

        {/* Botón */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full transition"
        >
          Crear Pokémon
        </button>
      </form>
    </div>
  )
}

export default CreatePokemonPage

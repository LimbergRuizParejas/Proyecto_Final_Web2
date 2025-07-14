// src/pages/User/TeamEditorPage.tsx
import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getEquipoById, updateEquipo } from '../../api/team.api'
import type { Equipo, UpdateEquipoInput } from '../../types/equipo.types'
import EquipoResumen from '../../components/Team/EquipoResumen'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const TeamEditorPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [equipo, setEquipo] = useState<Equipo | null>(null)
  const [nombreEquipo, setNombreEquipo] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const fetchEquipo = useCallback(async () => {
    const parsedId = Number(id)
    if (!parsedId || isNaN(parsedId)) {
      console.warn('🚨 ID inválido, redirigiendo...')
      navigate('/home')
      return
    }

    setLoading(true)
    try {
      const equipoData = await getEquipoById(parsedId)
      console.log('✅ Equipo obtenido:', equipoData)
      setEquipo(equipoData)
      setNombreEquipo(equipoData.name || equipoData.nombre || '')
    } catch (err) {
      console.error('❌ Error al cargar equipo:', err)
      navigate('/home')
    } finally {
      setLoading(false)
    }
  }, [id, navigate])

  useEffect(() => {
    fetchEquipo()
  }, [fetchEquipo])

  const handleUpdateNombre = async () => {
    if (!equipo) return
    setSaving(true)
    try {
      const payload: UpdateEquipoInput = { nombre: nombreEquipo }
      await updateEquipo(equipo.id, payload)
      alert('✅ Nombre del equipo actualizado con éxito.')
      setEquipo({ ...equipo, name: nombreEquipo })
    } catch (err) {
      console.error('❌ Error al actualizar nombre:', err)
      alert('Error al actualizar el nombre del equipo.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="p-6 text-center">🔄 Cargando equipo...</p>
  }

  if (!equipo) {
    return <p className="p-6 text-center text-red-600">No se encontró el equipo.</p>
  }

  const pokemones = equipo.pokemones || equipo.equipoPokemon || []

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Editando equipo: {equipo.name || equipo.nombre || '-'}
      </h1>

      <div className="mb-8 border rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold mb-4">Resumen del equipo</h2>

        <div className="space-y-3">
          <div>
            <label htmlFor="nombreEquipo" className="block text-sm font-medium mb-1">
              Nombre del equipo:
            </label>
            <input
              id="nombreEquipo"
              type="text"
              placeholder="Nombre del equipo"
              value={nombreEquipo}
              onChange={(e) => setNombreEquipo(e.target.value)}
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleUpdateNombre}
              disabled={saving}
              className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
            >
              {saving ? 'Guardando...' : 'Actualizar nombre'}
            </button>
          </div>

          <p><strong>ID:</strong> {equipo.id}</p>
          <p><strong>Usuario ID:</strong> {equipo.userId || equipo.usuarioId || '-'}</p>
          <p><strong>Creado:</strong> {equipo.createdAt ? new Date(equipo.createdAt).toLocaleString() : '-'}</p>
          <p><strong>Actualizado:</strong> {equipo.updatedAt ? new Date(equipo.updatedAt).toLocaleString() : '-'}</p>
        </div>
      </div>

      <div className="mb-6">
        <EquipoResumen equipo={equipo} />
      </div>

      {pokemones.length === 0 ? (
        <div className="text-center mt-6">
          <p className="mb-4 text-gray-600 italic">Este equipo aún no tiene Pokémon.</p>
          <Link
            to={`/team/${equipo.id}/pokemon/create`}
            className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 focus:ring-2 focus:ring-green-400 transition"
          >
            Agregar primer Pokémon
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {pokemones.map((poke) => (
            <div key={poke.id} className="border rounded p-4 shadow text-center">
              <img
                src={`${BASE_URL}/uploads/${poke.pokemon.imagen}`}
                alt={poke.pokemon.nombre}
                className="w-20 h-20 mx-auto object-contain"
                onError={(e) => (e.currentTarget.src = '/placeholder.png')}
              />
              <h3 className="mt-2 font-semibold">{poke.apodo || poke.pokemon.nombre}</h3>
              <button
                onClick={() => navigate(`/team/${equipo.id}/pokemon/${poke.id}`)}
                className="mt-2 bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 text-sm"
              >
                Editar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TeamEditorPage

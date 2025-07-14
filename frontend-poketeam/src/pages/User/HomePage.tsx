import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEquiposByUsuario } from '../../api/team.api'
import type { Equipo } from '../../types/equipo.types'
import TeamCard from '../../components/Team/TeamCard'

const HomePage = () => {
  const [equipos, setEquipos] = useState<Equipo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        // Obtener el usuario del localStorage
        const userString = localStorage.getItem('user')
        if (!userString) {
          console.warn('🚨 No hay usuario logueado en localStorage')
          setEquipos([])
          setError('No hay usuario logueado.')
          return
        }

        const user: { id?: number } = JSON.parse(userString)
        if (!user?.id) {
          console.warn('🚨 Usuario inválido en localStorage')
          setEquipos([])
          setError('Usuario inválido.')
          return
        }

        // Solicitar los equipos asociados al usuario
        const equipos = await getEquiposByUsuario(user.id)
        console.log('✅ Equipos obtenidos:', equipos)
        setEquipos(equipos)
      } catch (err) {
        console.error('❌ Error al obtener equipos:', err)
        setEquipos([])
        setError('Error al obtener los equipos.')
      } finally {
        setLoading(false)
      }
    }

    fetchEquipos()
  }, [])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Mis Equipos Pokémon</h1>

      {/* Botón para crear un nuevo equipo */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => navigate('/team/new')}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Crear nuevo equipo
        </button>
      </div>

      {/* Si está cargando, muestra un mensaje */}
      {loading ? (
        <p className="text-center">🔄 Cargando equipos...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : equipos.length === 0 ? (
        <p className="text-center text-gray-600">Aún no tienes equipos creados.</p>
      ) : (
        // Mostrar los equipos si están disponibles
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
          {equipos.map((equipo) => (
            <TeamCard key={equipo.id} equipo={equipo} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage

// src/hooks/useEquipos.ts
import { useEffect, useState } from 'react'
import { getEquiposByUsuario } from '../api/team.api'
import type { Equipo } from '../types/equipo.types'

export const useEquipos = (usuarioId?: number) => {
  const [equipos, setEquipos] = useState<Equipo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!usuarioId) {
      console.warn('🚨 No hay usuario ID, limpiando equipos.')
      setEquipos([])
      setLoading(false)
      return
    }

    const fetchEquipos = async () => {
      try {
        setLoading(true)
        const equiposData = await getEquiposByUsuario(usuarioId)
        console.log('✅ Equipos cargados:', equiposData)
        setEquipos(equiposData)
      } catch (err) {
        console.error('❌ Error al obtener equipos:', err)
        setEquipos([])
      } finally {
        setLoading(false)
      }
    }

    fetchEquipos()
  }, [usuarioId])

  return { equipos, loading }
}

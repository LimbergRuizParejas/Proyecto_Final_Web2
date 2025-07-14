import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { createEquipo } from '../../api/team.api'
import type { CreateEquipoInput } from '../../types/equipo.types'
import type { AxiosError } from 'axios'

type CreateEquipoConUsuario = CreateEquipoInput & { usuarioId: number }

interface ApiErrorResponse {
  msg?: string
}

const CreateTeamPage = () => {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<CreateEquipoInput>()
  const navigate = useNavigate()

  const onSubmit = async (data: CreateEquipoInput) => {
    const userString = localStorage.getItem('user')
    if (!userString) {
      alert('Debes estar logueado para crear un equipo.')
      return
    }

    const user = JSON.parse(userString)

    const payload: CreateEquipoConUsuario = {
      ...data,
      usuarioId: user.id,
    }

    try {
      const equipo = await createEquipo(payload)
      console.log('✅ Equipo creado con éxito:', equipo)

      if (equipo.id) {
        navigate(`/team/${equipo.id}`)
      } else {
        alert('Equipo creado pero sin ID válido para redireccionar.')
      }

    } catch (err: unknown) {
      if (isAxiosErrorWithMsg(err)) {
        console.error('❌ Error al crear el equipo:', err.response?.data || err.message)
        alert('Error al crear el equipo: ' + (err.response?.data?.msg || err.message))
      } else {
        console.error('❌ Error inesperado:', err)
        alert('Error inesperado al crear el equipo.')
      }
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Crear nuevo equipo</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('nombre', { required: true })}
          placeholder="Nombre del equipo"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition"
        >
          {isSubmitting ? 'Creando equipo...' : 'Crear equipo'}
        </button>
      </form>
    </div>
  )
}

// helper fuera del componente
function isAxiosErrorWithMsg(error: unknown): error is AxiosError<ApiErrorResponse> {
  return typeof error === 'object' &&
    error !== null &&
    'isAxiosError' in error
}

export default CreateTeamPage

import { useForm } from 'react-hook-form'
import type { LoginInput } from '../../types/user.types'
import { loginUser } from '../../api/auth.api'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { AxiosError } from 'axios'

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (data: LoginInput) => {
    try {
      const res = await loginUser(data)
      console.log('🔑 Respuesta del backend:', res.data)

      const { user, token } = res.data.data

      if (!user || !token) {
        setError('Respuesta del servidor incompleta.')
        return
      }

      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))

      if (user.rol === 'admin') {
        navigate('/admin')
      } else {
        navigate('/home')
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ msg: string }>
      console.error('Error al iniciar sesión:', axiosError)
      if (axiosError.response?.data?.msg) {
        setError(axiosError.response.data.msg)
      } else {
        setError('Usuario o contraseña incorrectos.')
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4 py-12">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 w-full max-w-sm bg-white p-8 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-red-600">Iniciar Sesión</h2>

        <div className="space-y-4">
          <div>
            <input
              {...register('username', { required: 'El nombre de usuario es obligatorio' })}
              type="text"
              placeholder="Nombre de usuario"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          <div>
            <input
              {...register('password', { required: 'La contraseña es obligatoria' })}
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
          >
            Iniciar Sesión
          </button>

          <p className="text-sm text-center text-gray-600">
            ¿No tienes una cuenta?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-red-600 hover:underline"
            >
              Regístrate aquí
            </button>
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm

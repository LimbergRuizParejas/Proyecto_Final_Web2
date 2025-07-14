
import { useForm } from 'react-hook-form'
import type { RegisterInput } from '../../types/user.types'
import { registerUser } from '../../api/auth.api'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AxiosError } from 'axios'

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (data: RegisterInput) => {
    try {
      await registerUser(data)
      navigate('/login')
    } catch (err) {
      const axiosError = err as AxiosError<{ msg: string }>
      console.error('Error en el registro:', axiosError)
      if (axiosError.response?.data?.msg) {
        setError(axiosError.response.data.msg)
      } else {
        setError('No se pudo registrar. Intenta con otro correo o nombre.')
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-md mx-auto bg-white p-6 rounded-lg shadow"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Crear cuenta</h2>

      <input
        {...register('nombre', { required: 'El nombre es obligatorio' })}
        placeholder="Nombre completo"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre.message}</p>}

      <input
        {...register('email', { required: 'El correo es obligatorio' })}
        type="email"
        placeholder="Correo electrónico"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

      <input
        {...register('password', { required: 'La contraseña es obligatoria' })}
        type="password"
        placeholder="Contraseña"
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Registrarse
      </button>
    </form>
  )
}

export default RegisterForm

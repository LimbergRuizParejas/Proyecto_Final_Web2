import { useEffect, useState } from 'react'
import {
  getAllUsers,
  deleteUser,
  toggleUserRole,
  updateUserPassword,
} from '../../api/user.api'
import type { User } from '../../types/user.types'

const UsersAdminPage = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    console.log('🔄 Cargando usuarios desde el servidor...')
    try {
      setLoading(true)
      const res = await getAllUsers()
      console.log('🌐 Respuesta del backend:', res.data)

      if (res.data.success) {
        setUsers(res.data.data)
        console.log(`✅ Usuarios cargados correctamente: ${res.data.data.length}`)
      } else {
        console.warn('⚠️ Respuesta inesperada del backend:', res.data)
        alert('No se pudieron cargar los usuarios.')
      }
    } catch (err) {
      console.error('❌ Error al obtener usuarios:', err)
      alert('Hubo un error al cargar los usuarios.')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return
    console.log(`🗑 Eliminando usuario ID: ${id}`)
    try {
      await deleteUser(id)
      alert('Usuario eliminado correctamente.')
      await fetchUsers()
    } catch (err) {
      console.error('❌ Error al eliminar usuario:', err)
      alert('No se pudo eliminar el usuario.')
    }
  }

  const handleToggleRole = async (id: number) => {
    if (!confirm('¿Cambiar el rol de este usuario?')) return
    console.log(`🔄 Cambiando rol del usuario ID: ${id}`)
    try {
      const res = await toggleUserRole(id)
      console.log(`✅ Nuevo rol asignado: ${res.data.data.rol}`)
      alert(`Rol cambiado a ${res.data.data.rol}`)
      await fetchUsers()
    } catch (err) {
      console.error('❌ Error al cambiar el rol del usuario:', err)
      alert('No se pudo cambiar el rol del usuario.')
    }
  }

  const handleChangePassword = async (id: number) => {
    const newPassword = prompt('Ingrese la nueva contraseña para este usuario:')
    if (!newPassword || newPassword.trim() === '') {
      alert('Contraseña no válida o vacía.')
      return
    }
    console.log(`🔑 Cambiando contraseña del usuario ID: ${id}`)
    try {
      await updateUserPassword(id, newPassword)
      alert('Contraseña actualizada correctamente.')
    } catch (err) {
      console.error('❌ Error al cambiar la contraseña:', err)
      alert('No se pudo cambiar la contraseña.')
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Administración de Usuarios</h1>

      {loading ? (
        <p className="text-center text-lg">🔄 Cargando usuarios...</p>
      ) : users.length === 0 ? (
        <p className="text-center text-gray-600">No hay usuarios registrados en el sistema.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-400">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Nombre</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Rol</th>
                <th className="border px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td className="border px-4 py-2">{u.nombre}</td>
                  <td className="border px-4 py-2">{u.email}</td>
                  <td className="border px-4 py-2">{u.rol}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Eliminar
                    </button>
                    <button
                      onClick={() => handleToggleRole(u.id)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      Cambiar Rol
                    </button>
                    <button
                      onClick={() => handleChangePassword(u.id)}
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      Cambiar Contraseña
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UsersAdminPage

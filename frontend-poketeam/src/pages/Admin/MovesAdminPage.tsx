import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getMovimientos, deleteMovimiento } from '../../api/movimiento.api'
import type { Movimiento } from '../../types/movimiento.types'

const MovesAdminPage = () => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchMovimientos = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await getMovimientos()
        console.log('✅ [Movimientos recibidos]:', data)
        setMovimientos(data)
      } catch (err) {
        console.error('❌ [Error al cargar movimientos]:', err)
        setError('No se pudieron cargar los movimientos. Intenta nuevamente.')
      } finally {
        setLoading(false)
      }
    }

    fetchMovimientos()
  }, [])

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Estás seguro de eliminar este movimiento?')) return
    try {
      await deleteMovimiento(id)
      setMovimientos((prev) => prev.filter((m) => m.id !== id))
      alert('✅ Movimiento eliminado correctamente')
    } catch (err) {
      console.error('❌ [Error al eliminar movimiento]:', err)
      setError('No se pudo eliminar el movimiento.')
    }
  }

  const handleCreate = () => navigate('/admin/movimientos/create')

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Administrar Movimientos</h1>

      <button
        onClick={handleCreate}
        className="mb-6 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
      >
        ➕ Crear Movimiento
      </button>

      {loading && (
        <p className="text-center text-lg text-blue-600 animate-pulse">
          🔄 Cargando movimientos...
        </p>
      )}

      {error && (
        <p className="text-center text-red-600">{error}</p>
      )}

      {!loading && !error && movimientos.length === 0 && (
        <p className="text-center text-gray-600">No hay movimientos registrados.</p>
      )}

      {!loading && !error && movimientos.length > 0 && (
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full table-auto border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Nombre</th>
                <th className="py-2 px-4 border-b">Tipo</th>
                <th className="py-2 px-4 border-b">Categoría</th>
                <th className="py-2 px-4 border-b">Poder</th>
                <th className="py-2 px-4 border-b">PP</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {movimientos.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                  <td className="border px-4 py-2">{m.nombre}</td>
                  <td className="border px-4 py-2">{m.tipo}</td>
                  <td className="border px-4 py-2">{m.categoria}</td>
                  <td className="border px-4 py-2">{m.poder ?? '—'}</td>
                  <td className="border px-4 py-2">{m.pp}</td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/movimientos/${m.id}/edit`)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded transition"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
                    >
                      Eliminar
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

export default MovesAdminPage

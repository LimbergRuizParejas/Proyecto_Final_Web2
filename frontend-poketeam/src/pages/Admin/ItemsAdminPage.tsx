import { useEffect, useState } from 'react'
import {
  getItems,
  createItem,
  updateItem,
  deleteItem
} from '../../api/item.api'
import type { Item } from '../../types/item.types'

const ItemsAdminPage = () => {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const res = await getItems()
      setItems(res) // ✅ YA es un array, no necesitas `.data`
    } catch (err) {
      console.error('❌ Error al cargar ítems:', err)
      alert('No se pudieron cargar los ítems.')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    const nombre = prompt('Nombre del ítem:')
    if (!nombre?.trim()) return alert('El nombre es obligatorio.')
    const descripcion = prompt('Descripción del ítem:')
    if (!descripcion?.trim()) return alert('La descripción es obligatoria.')

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.click()

    input.onchange = async () => {
      if (!input.files?.length) return
      const file = input.files[0]
      const formData = new FormData()
      formData.append('nombre', nombre)
      formData.append('descripcion', descripcion)
      formData.append('imagen', file)

      try {
        await createItem(formData)
        alert('Ítem creado correctamente.')
        fetchItems()
      } catch (err) {
        console.error('❌ Error al crear ítem:', err)
        alert('No se pudo crear el ítem.')
      }
    }
  }

  const handleEdit = (item: Item) => {
    const nombre = prompt('Nuevo nombre:', item.nombre)
    if (!nombre?.trim()) return alert('El nombre es obligatorio.')
    const descripcion = prompt('Nueva descripción:', item.descripcion)
    if (!descripcion?.trim()) return alert('La descripción es obligatoria.')

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.click()

    input.onchange = async () => {
      const formData = new FormData()
      formData.append('nombre', nombre)
      formData.append('descripcion', descripcion)
      if (input.files?.length) {
        formData.append('imagen', input.files[0])
      }

      try {
        await updateItem(item.id, formData)
        alert('Ítem actualizado correctamente.')
        fetchItems()
      } catch (err) {
        console.error('❌ Error al actualizar ítem:', err)
        alert('No se pudo actualizar el ítem.')
      }
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('¿Seguro que deseas eliminar este ítem?')) return
    try {
      await deleteItem(id)
      alert('Ítem eliminado correctamente.')
      fetchItems()
    } catch (err) {
      console.error('❌ Error al eliminar ítem:', err)
      alert('No se pudo eliminar.')
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Administración de Ítems</h1>

      <div className="mb-6">
        <button
          onClick={handleCreate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Crear Ítem
        </button>
      </div>

      {loading ? (
        <p className="text-center text-lg">🔄 Cargando ítems...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-600">No hay ítems registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-400">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">Nombre</th>
                <th className="border px-4 py-2">Descripción</th>
                <th className="border px-4 py-2">Imagen</th>
                <th className="border px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.nombre}</td>
                  <td className="border px-4 py-2">{item.descripcion}</td>
                  <td className="border px-4 py-2">
                    {item.imagen ? (
                      <img
                        src={`http://localhost:3000/${item.imagen}`}
                        alt={item.nombre}
                        className="w-16 h-16 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder.png'
                        }}
                      />
                    ) : (
                      <span className="text-gray-400">Sin imagen</span>
                    )}
                  </td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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

export default ItemsAdminPage

import { Link } from 'react-router-dom'

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Panel de Administración
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link
            to="/admin/pokemon"
            className="bg-blue-600 text-white text-center p-6 rounded-lg shadow hover:bg-blue-700 transition transform hover:-translate-y-1 hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2">Administrar Pokémon</h2>
            <p className="text-sm opacity-90">Gestiona todos los Pokémon disponibles</p>
          </Link>

          <Link
            to="/admin/movimientos"
            className="bg-green-600 text-white text-center p-6 rounded-lg shadow hover:bg-green-700 transition transform hover:-translate-y-1 hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2">Administrar Movimientos</h2>
            <p className="text-sm opacity-90">Agrega, edita y elimina movimientos</p>
          </Link>

          <Link
            to="/admin/items"
            className="bg-purple-600 text-white text-center p-6 rounded-lg shadow hover:bg-purple-700 transition transform hover:-translate-y-1 hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2">Administrar Ítems</h2>
            <p className="text-sm opacity-90">Administra objetos equipables</p>
          </Link>

          <Link
            to="/admin/users"
            className="bg-yellow-500 text-white text-center p-6 rounded-lg shadow hover:bg-yellow-600 transition transform hover:-translate-y-1 hover:scale-105"
          >
            <h2 className="text-xl font-semibold mb-2">Administrar Usuarios</h2>
            <p className="text-sm opacity-90">Gestión de roles y permisos de usuarios</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage

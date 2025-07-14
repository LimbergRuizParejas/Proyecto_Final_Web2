// src/components/UI/Navbar.tsx
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          PokéTeam Builder
        </Link>
        <div className="space-x-4">
          <Link to="/home" className="hover:underline">
            Inicio
          </Link>
          <Link to="/equipos" className="hover:underline">
            Mis Equipos
          </Link>
          <Link to="/crear" className="hover:underline">
            Crear Equipo
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

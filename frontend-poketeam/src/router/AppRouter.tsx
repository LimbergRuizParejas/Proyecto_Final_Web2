// src/router/AppRouter.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'

// ====================
// Auth pages
// ====================
import LoginPage from '../pages/Auth/LoginPage'
import RegisterPage from '../pages/Auth/RegisterPage'

// ====================
// User pages
// ====================
import HomePage from '../pages/User/HomePage'
import TeamEditorPage from '../pages/User/TeamEditorPage'
import PokemonConfigPage from '../pages/User/PokemonConfigPage'
import CreateTeamPage from '../pages/User/CreateTeamPage'
import PokemonCreatePage from '../pages/User/PokemonCreatePage'

// ====================
// Admin pages
// ====================
import DashboardPage from '../pages/Admin/DashboardPage'
import PokemonAdminPage from '../pages/Admin/PokemonAdminPage'
import ItemsAdminPage from '../pages/Admin/ItemsAdminPage'
import MovesAdminPage from '../pages/Admin/MovesAdminPage'
import UsersAdminPage from '../pages/Admin/UsersAdminPage'
import CreatePokemonPage from '../pages/Admin/CreatePokemonPage'
import EditPokemonPage from '../pages/Admin/EditPokemonPage'
import CreateMovimientoPage from '../pages/Admin/CreateMovimientoPage'
import EditMovimientoPage from '../pages/Admin/EditMovimientoPage'

// ====================
// Tipos y helpers
// ====================
interface PrivateRouteProps {
  children: ReactElement
  onlyAdmin?: boolean
}

type LocalUser = {
  id: number
  nombre: string
  email: string
  rol: string
}

/**
 * Componente PrivateRoute para proteger rutas
 * - Valida si hay token
 * - Valida si el rol es admin (cuando se indica `onlyAdmin`)
 */
const PrivateRoute = ({ children, onlyAdmin = false }: PrivateRouteProps) => {
  const token = localStorage.getItem('token')
  let user: LocalUser | null = null

  try {
    user = JSON.parse(localStorage.getItem('user') || 'null')
  } catch (err) {
    console.warn('⚠️ Error al parsear el user desde localStorage:', err)
    user = null
  }

  console.debug('🔍 Acceso protegido:', { token, user, onlyAdmin })

  if (!token) return <Navigate to="/login" replace />
  if (onlyAdmin && user?.rol !== 'admin') return <Navigate to="/home" replace />

  return children
}

// ====================
// AppRouter principal
// ====================
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* ====================
            Auth
        ==================== */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ====================
            Usuario normal
        ==================== */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/team/new"
          element={
            <PrivateRoute>
              <CreateTeamPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/team/:id"
          element={
            <PrivateRoute>
              <TeamEditorPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/team/:teamId/pokemon/create"
          element={
            <PrivateRoute>
              <PokemonCreatePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/team/:teamId/pokemon/:pokemonId"
          element={
            <PrivateRoute>
              <PokemonConfigPage />
            </PrivateRoute>
          }
        />

        {/* ====================
            Admin
        ==================== */}
        <Route
          path="/admin"
          element={
            <PrivateRoute onlyAdmin>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/pokemon"
          element={
            <PrivateRoute onlyAdmin>
              <PokemonAdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/pokemon/new"
          element={
            <PrivateRoute onlyAdmin>
              <CreatePokemonPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/pokemon/:id/edit"
          element={
            <PrivateRoute onlyAdmin>
              <EditPokemonPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/items"
          element={
            <PrivateRoute onlyAdmin>
              <ItemsAdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/movimientos"
          element={
            <PrivateRoute onlyAdmin>
              <MovesAdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/movimientos/create"
          element={
            <PrivateRoute onlyAdmin>
              <CreateMovimientoPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/movimientos/:id/edit"
          element={
            <PrivateRoute onlyAdmin>
              <EditMovimientoPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute onlyAdmin>
              <UsersAdminPage />
            </PrivateRoute>
          }
        />

        {/* ====================
            Fallback (404)
        ==================== */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default AppRouter

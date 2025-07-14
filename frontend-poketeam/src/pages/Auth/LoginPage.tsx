import LoginForm from '../../components/Auth/LoginForm'

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h1>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage

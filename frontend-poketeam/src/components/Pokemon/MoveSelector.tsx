
import type { EquipoPokemon } from '../../types/equipoPokemon.types'
import type { Movimiento } from '../../types/movimiento.types'

interface Props {
  equipoPokemon: EquipoPokemon
  onChange: (movimientos: Movimiento[]) => void
}

const MoveSelector = ({ equipoPokemon, onChange }: Props) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Movimientos</h2>
      <ul className="space-y-1">
        {equipoPokemon.movimientos.map((mov, i) => (
          <li key={i} className="flex justify-between">
            <span>{mov.nombre}</span>
            <span className="text-sm text-gray-500">{mov.tipo} - {mov.categoria}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onChange([])}
        className="mt-3 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Limpiar movimientos
      </button>
    </div>
  )
}

export default MoveSelector

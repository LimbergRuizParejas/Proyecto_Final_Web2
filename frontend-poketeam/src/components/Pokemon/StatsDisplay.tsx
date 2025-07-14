import type { EquipoPokemon } from '../../types/equipoPokemon.types'

const StatsDisplay = ({ equipoPokemon }: { equipoPokemon: EquipoPokemon }) => {
  const statsFinales = equipoPokemon.statsFinales

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Estadísticas finales</h2>
      <ul className="space-y-1">
        {Object.entries(statsFinales).map(([stat, valor]) => (
          <li key={stat} className="flex justify-between">
            <span className="capitalize">{stat}</span>
            <span>{valor}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StatsDisplay

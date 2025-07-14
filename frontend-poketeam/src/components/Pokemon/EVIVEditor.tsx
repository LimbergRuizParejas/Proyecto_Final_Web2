import { useState } from 'react'
import type { EquipoPokemon } from '../../types/equipoPokemon.types'

interface EVIVEditorProps {
  equipoPokemon: EquipoPokemon
  onChange: (evs: EquipoPokemon['evs'], ivs: EquipoPokemon['ivs'], naturaleza: string) => void
}

const EVIVEditor = ({ equipoPokemon, onChange }: EVIVEditorProps) => {
  const [editableEVs, setEditableEVs] = useState(equipoPokemon.evs)
  const [editableIVs, setEditableIVs] = useState(equipoPokemon.ivs)

  const handleEVChange = (stat: string, value: number) => {
    setEditableEVs((prevEVs) => ({
      ...prevEVs,
      [stat]: value,
    }))
  }

  const handleIVChange = (stat: string, value: number) => {
    setEditableIVs((prevIVs) => ({
      ...prevIVs,
      [stat]: value,
    }))
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">EVs / IVs</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* EVs Section */}
        <div>
          <h3 className="font-semibold mb-1">EVs</h3>
          <ul>
            {Object.entries(equipoPokemon.evs).map(([stat, value]) => (
              <li key={stat} className="flex justify-between mb-2">
                <label htmlFor={stat} className="block">
                  {stat.toUpperCase()}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id={stat}
                    type="number"
                    min="0"
                    max="252"
                    value={editableEVs[stat as keyof EquipoPokemon['evs']]}
                    onChange={(e) =>
                      handleEVChange(stat, Math.min(Math.max(Number(e.target.value), 0), 252))
                    }
                    className="w-16 px-2 py-1 border rounded"
                    placeholder="0"
                    title={`EV de ${stat}`}
                  />
                  <span>/ 252</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* IVs Section */}
        <div>
          <h3 className="font-semibold mb-1">IVs</h3>
          <ul>
            {Object.entries(equipoPokemon.ivs).map(([stat, value]) => (
              <li key={stat} className="flex justify-between mb-2">
                <label htmlFor={stat} className="block">
                  {stat.toUpperCase()}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    id={stat}
                    type="number"
                    min="0"
                    max="31"
                    value={editableIVs[stat as keyof EquipoPokemon['ivs']]}
                    onChange={(e) =>
                      handleIVChange(stat, Math.min(Math.max(Number(e.target.value), 0), 31))
                    }
                    className="w-16 px-2 py-1 border rounded"
                    placeholder="0"
                    title={`IV de ${stat}`}
                  />
                  <span>/ 31</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Nature Section */}
      <p className="mt-4 text-sm text-gray-600">
        Naturaleza: <strong>{equipoPokemon.naturaleza}</strong>
      </p>

      {/* Save Changes Button */}
      <button
        onClick={() => onChange(editableEVs, editableIVs, equipoPokemon.naturaleza)}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Confirmar cambios
      </button>
    </div>
  )
}

export default EVIVEditor

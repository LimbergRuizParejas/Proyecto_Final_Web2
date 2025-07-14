import { useForm, type SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import type { EquipoPokemon } from '../../types/equipoPokemon.types'
import type { Pokemon } from '../../types/pokemon.types'
import type { Item } from '../../types/item.types'
import { natures } from '../../utils/natures'
import Input from '../UI/Input'
import Button from '../UI/Button'

export interface EquipoPokemonFormData {
  pokemonId: number
  itemId: number | null
  habilidad: string
  naturaleza: string
  apodo: string
  movimientos: string[]
  evHp: number
  evAtk: number
  evDef: number
  evSpa: number
  evSpd: number
  evSpe: number
  ivHp: number
  ivAtk: number
  ivDef: number
  ivSpa: number
  ivSpd: number
  ivSpe: number
}

interface Props {
  initialData?: EquipoPokemon
  onSubmit: (data: EquipoPokemonFormData) => void
  pokemonList: Pokemon[]
  itemList: Item[]
  loading?: boolean
  maxPokemonReached: boolean
}

const PokemonForm = ({
  initialData,
  onSubmit,
  pokemonList,
  itemList,
  loading = false,
  maxPokemonReached
}: Props) => {
  const [habilidades, setHabilidades] = useState<string[]>([])
  const [movimientosDisponibles, setMovimientosDisponibles] = useState<Pokemon['movimientos']>([])
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState<Pokemon | null>(null)

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors }
  } = useForm<EquipoPokemonFormData>({
    defaultValues: {
      pokemonId: initialData?.pokemonId || 0,
      itemId: initialData?.itemId ?? null,
      habilidad: initialData?.habilidad || '',
      naturaleza: initialData?.naturaleza || '',
      apodo: initialData?.apodo || '',
      movimientos: initialData?.movimientos?.map((m) => typeof m === 'string' ? m : m.nombre) || [],
      evHp: initialData?.evs?.hp || 0,
      evAtk: initialData?.evs?.atk || 0,
      evDef: initialData?.evs?.def || 0,
      evSpa: initialData?.evs?.spa || 0,
      evSpd: initialData?.evs?.spd || 0,
      evSpe: initialData?.evs?.spe || 0,
      ivHp: initialData?.ivs?.hp || 31,
      ivAtk: initialData?.ivs?.atk || 31,
      ivDef: initialData?.ivs?.def || 31,
      ivSpa: initialData?.ivs?.spa || 31,
      ivSpd: initialData?.ivs?.spd || 31,
      ivSpe: initialData?.ivs?.spe || 31
    }
  })

  const selectedPokemonId = watch('pokemonId')

  useEffect(() => {
    const selected = pokemonList.find((p) => p.id === selectedPokemonId)
    if (selected) {
      setPokemonSeleccionado(selected)
      setHabilidades(selected.habilidades || [])
      setMovimientosDisponibles(selected.movimientos || [])
    } else {
      setPokemonSeleccionado(null)
      setHabilidades([])
      setMovimientosDisponibles([])
    }
  }, [selectedPokemonId, pokemonList])

  const onFormSubmit: SubmitHandler<EquipoPokemonFormData> = (data) => {
    const totalEVs = data.evHp + data.evAtk + data.evDef + data.evSpa + data.evSpd + data.evSpe
    if (totalEVs > 508) {
      setError('evHp', { type: 'manual', message: 'La suma total de EVs no puede superar 508' })
      return
    }
    const ivs = [data.ivHp, data.ivAtk, data.ivDef, data.ivSpa, data.ivSpd, data.ivSpe]
    if (ivs.some((iv) => iv < 0 || iv > 31)) {
      setError('ivHp', { type: 'manual', message: 'Los IVs deben estar entre 0 y 31' })
      return
    }
    if (data.movimientos.length > 4) {
      setError('movimientos', { type: 'manual', message: 'No puedes seleccionar más de 4 movimientos' })
      return
    }
    if (maxPokemonReached) {
      setError('pokemonId', { type: 'manual', message: 'El equipo ya tiene 6 Pokémon.' })
      return
    }
    onSubmit(data)
  }

  const movimientoOptions = movimientosDisponibles.map((m) => ({
    value: m.nombre,
    label: `${m.nombre} (${m.tipo} - ${m.categoria} - ${m.poder || 'Sin poder'})`
  }))

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{initialData ? 'Editar Pokémon' : 'Agregar Pokémon'}</h2>

      {pokemonSeleccionado && (
        <div className="flex items-center gap-4">
          <img src={pokemonSeleccionado.imagen} alt={pokemonSeleccionado.nombre} className="w-20 h-20" />
          <div className="flex gap-2">
            {[pokemonSeleccionado.tipo1, pokemonSeleccionado.tipo2].filter(Boolean).map((tipo) => (
              <span key={tipo} className="px-2 py-1 text-xs font-semibold rounded bg-gray-200">{tipo}</span>
            ))}
          </div>
        </div>
      )}

      <Input label="Apodo" type="text" {...register('apodo')} />

      <Select
        options={pokemonList.map((p) => ({ value: p.id, label: p.nombre }))}
        placeholder="Selecciona un Pokémon..."
        defaultValue={initialData?.pokemonId ? { value: initialData.pokemonId, label: pokemonList.find(p => p.id === initialData.pokemonId)?.nombre || '' } : null}
        onChange={(option) => setValue('pokemonId', option?.value ?? 0)}
        classNamePrefix="react-select"
      />

      <Select
        options={itemList.map((item) => ({ value: item.id, label: item.nombre }))}
        placeholder="Selecciona un ítem..."
        defaultValue={initialData?.itemId ? { value: initialData.itemId, label: itemList.find(i => i.id === initialData.itemId)?.nombre || '' } : null}
        onChange={(option) => setValue('itemId', option?.value ?? null)}
        classNamePrefix="react-select"
        isClearable
      />

      <Select
        options={habilidades.map((h) => ({ value: h, label: h }))}
        placeholder="Selecciona una habilidad..."
        defaultValue={initialData?.habilidad ? { value: initialData.habilidad, label: initialData.habilidad } : null}
        onChange={(option) => setValue('habilidad', option?.value ?? '')}
        classNamePrefix="react-select"
        isClearable
      />

      <Select
        isMulti
        options={movimientoOptions}
        placeholder="Selecciona hasta 4 movimientos..."
        defaultValue={initialData?.movimientos?.map((m) => {
          const nombre = typeof m === 'string' ? m : m.nombre
          const match = movimientosDisponibles.find((mov) => mov.nombre === nombre)
          return {
            value: nombre,
            label: match ? `${match.nombre} (${match.tipo} - ${match.categoria} - ${match.poder || 'Sin poder'})` : nombre
          }
        }) || []}
        onChange={(options) => {
          const selected = (options || []).map((opt) => opt.value)
          if (selected.length > 4) {
            setError('movimientos', { type: 'manual', message: 'No puedes seleccionar más de 4 movimientos' })
          } else {
            setError('movimientos', undefined as never)
            setValue('movimientos', selected)
          }
        }}
        classNamePrefix="react-select"
        isClearable
      />

      {errors.movimientos?.message && (
        <p className="text-red-500 text-sm">{errors.movimientos.message}</p>
      )}

      <div>
        <label className="block text-sm font-medium">Naturaleza</label>
        <select {...register('naturaleza', { required: true })} className="w-full border rounded px-3 py-2">
          <option value="">Selecciona una naturaleza</option>
          {natures.map((n) => (
            <option key={n.nombre} value={n.nombre}>{n.nombre}</option>
          ))}
        </select>
        {errors.naturaleza && <p className="text-red-500 text-sm">Requerido</p>}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {([
          ['evHp', 'HP (EV)'], ['evAtk', 'Atk (EV)'], ['evDef', 'Def (EV)'],
          ['evSpa', 'Spa (EV)'], ['evSpd', 'Spd (EV)'], ['evSpe', 'Spe (EV)'],
          ['ivHp', 'HP (IV)'], ['ivAtk', 'Atk (IV)'], ['ivDef', 'Def (IV)'],
          ['ivSpa', 'Spa (IV)'], ['ivSpd', 'Spd (IV)'], ['ivSpe', 'Spe (IV)']
        ] as const).map(([key, label]) => (
          <Input
            key={key}
            label={label}
            type="number"
            {...register(key, { valueAsNumber: true })}
          />
        ))}
      </div>

      <Button type="submit" disabled={loading || maxPokemonReached}>
        {loading ? 'Guardando...' : initialData ? 'Actualizar Pokémon' : 'Agregar al equipo'}
      </Button>
    </form>
  )
}

export default PokemonForm

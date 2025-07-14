module.exports = (sequelize, DataTypes) => {
  const EquipoPokemon = sequelize.define(
    "EquipoPokemon",
    {
      apodo: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Apodo personalizado del Pokémon en el equipo"
      },
      habilidad: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Habilidad seleccionada para el Pokémon"
      },
      naturaleza: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Naturaleza del Pokémon (afecta stats finales)"
      },
      evs: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
        comment: "Effort Values (EVs) del Pokémon"
      },
      ivs: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
        comment: "Individual Values (IVs) del Pokémon"
      },
      movimientos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
        comment: "Lista de movimientos seleccionados"
      },
      finalStats: {
        type: DataTypes.JSONB,
        allowNull: true,
        comment: "Stats finales calculados con EVs, IVs y naturaleza"
      }
    },
    {
      tableName: "equipo_pokemon",  // nombre real de la tabla
      underscored: true,             // genera columnas snake_case automáticamente
      timestamps: true,
      comment: "Pokémon pertenecientes a equipos personalizados"
    }
  )

  EquipoPokemon.associate = (models) => {
    // Un EquipoPokemon pertenece a un Team
    EquipoPokemon.belongsTo(models.Team, {
      foreignKey: { name: "team_id", allowNull: false },
      as: "team"
    })

    // Un EquipoPokemon pertenece a un Pokémon base
    EquipoPokemon.belongsTo(models.Pokemon, {
      foreignKey: { name: "pokemon_id", allowNull: false },
      as: "pokemon"
    })

    // Un EquipoPokemon puede tener un Item equipado
    EquipoPokemon.belongsTo(models.Item, {
      foreignKey: { name: "item_id", allowNull: true },
      as: "item"
    })
  }

  return EquipoPokemon
}

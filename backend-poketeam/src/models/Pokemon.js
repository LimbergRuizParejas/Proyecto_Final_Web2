module.exports = (sequelize, DataTypes) => {
  const Pokemon = sequelize.define(
    "Pokemon",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "El nombre no puede estar vacío." },
        },
        comment: "Nombre del Pokémon",
      },
      imagen: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Ruta o URL de la imagen del Pokémon (puede ser null)",
      },
      tipo1: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "El tipo1 no puede estar vacío." },
        },
        comment: "Tipo principal del Pokémon (Ej: 'Fuego')",
      },
      tipo2: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Tipo secundario del Pokémon (Ej: 'Volador', opcional)",
      },
      habilidades: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        defaultValue: [],
        comment: "Array con habilidades disponibles del Pokémon",
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: "Descripción breve del Pokémon",
      },
      statsBase: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: {
          hp: 0,
          atk: 0,
          def: 0,
          sp_atk: 0,
          sp_def: 0,
          speed: 0,
        },
        comment: "Stats base en JSONB (HP, Ataque, Defensa, etc.)",
      },
    },
    {
      tableName: "pokemon", // 👈 usa exactamente el nombre de tu tabla
      underscored: true,    // created_at, updated_at en vez de createdAt, updatedAt
      timestamps: true,
      comment: "Tabla de Pokémon disponibles en el juego",
    }
  );

  // ===========================
  // Relaciones del modelo
  // ===========================
  Pokemon.associate = (models) => {
    // Relación con EquipoPokemon: un Pokémon puede estar en muchos equipos
    Pokemon.hasMany(models.EquipoPokemon, {
      foreignKey: "pokemon_id",
      as: "equipos",
    });

    // Relación con Movimiento mediante tabla intermedia MovimientoPokemon
    Pokemon.belongsToMany(models.Movimiento, {
      through: models.MovimientoPokemon,
      foreignKey: "pokemon_id",
      otherKey: "movimiento_id",
      as: "movimientos",
    });
  };

  return Pokemon;
};

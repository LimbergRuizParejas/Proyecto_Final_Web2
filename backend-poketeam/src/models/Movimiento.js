

module.exports = (sequelize, DataTypes) => {
  const Movimiento = sequelize.define(
    "Movimiento",
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoria: {
        type: DataTypes.ENUM("físico", "especial", "estado"),
        allowNull: false,
      },
      poder: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "Movimientos",
      timestamps: true, 
      underscored: false,
    }
  );

  Movimiento.associate = (models) => {
    Movimiento.belongsToMany(models.Pokemon, {
      through: models.MovimientoPokemon,
      foreignKey: "movimientoId",
      otherKey: "pokemonId",
      as: "pokemons",
    });
  };

  return Movimiento;
};

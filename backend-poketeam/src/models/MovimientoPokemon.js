
module.exports = (sequelize, DataTypes) => {
  const MovimientoPokemon = sequelize.define("MovimientoPokemon", {
    movimientoId: {
      type: DataTypes.INTEGER,
      field: 'movimiento_id',
      references: {
        model: 'Movimientos',
        key: 'id'
      }
    },
    pokemonId: {
      type: DataTypes.INTEGER,
      field: 'pokemon_id',
      references: {
        model: 'Pokemon',
        key: 'id'
      }
    }
  }, {
    tableName: 'MovimientoPokemons',
    timestamps: false
  });

  return MovimientoPokemon;
};

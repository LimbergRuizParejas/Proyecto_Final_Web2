module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define("Team", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Team.associate = models => {
    Team.belongsTo(models.User, {
      foreignKey: "userId",
      as: "usuario"
    });

    Team.hasMany(models.EquipoPokemon, {
      foreignKey: "teamId",
      as: "pokemones"
    });
  };

  return Team;
};

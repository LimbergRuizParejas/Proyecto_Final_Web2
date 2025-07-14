module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define("Item", {
    nombre: { type: DataTypes.STRING, allowNull: false },
    descripcion: DataTypes.STRING,
    imagen: DataTypes.STRING
  });

  Item.associate = models => {
    Item.hasMany(models.EquipoPokemon, { foreignKey: "itemId" });
  };

  return Item;
};

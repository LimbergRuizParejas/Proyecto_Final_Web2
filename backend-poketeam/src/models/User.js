module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Team, { foreignKey: "userId" });
  };

  return User;
};

const Sequelize = require('sequelize')
const sequelize = require('../config/database')

const db = {}

console.log('🚀 Inicializando modelos...')


db.User = require('./User')(sequelize, Sequelize.DataTypes)
db.Team = require('./Team')(sequelize, Sequelize.DataTypes)
db.Pokemon = require('./Pokemon')(sequelize, Sequelize.DataTypes)
db.EquipoPokemon = require('./EquipoPokemon')(sequelize, Sequelize.DataTypes)
db.Item = require('./Item')(sequelize, Sequelize.DataTypes)
db.Movimiento = require('./Movimiento')(sequelize, Sequelize.DataTypes)
db.MovimientoPokemon = require('./MovimientoPokemon')(sequelize, Sequelize.DataTypes)


Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    console.log(`🔗 Ejecutando asociación para: ${modelName}`)
    db[modelName].associate(db)
  }
})


db.sequelize = sequelize
db.Sequelize = Sequelize

console.log('✅ Modelos cargados correctamente:', Object.keys(db))

module.exports = db

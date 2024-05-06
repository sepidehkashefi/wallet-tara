const connection = require('../config/connection.config')
const Sequelize = require('sequelize')
const db = {}
db.Sequelize = Sequelize
db.Op = Sequelize.Op
db.connection = connection


db.user = require('./user.model')(connection, Sequelize);




module.exports = db
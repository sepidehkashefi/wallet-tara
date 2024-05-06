const connection = require('../config/connection.config')
const Sequelize = require('sequelize')
const db = {}
db.Sequelize = Sequelize
db.Op = Sequelize.Op
db.connection = connection


db.user = require('./user.model')(connection, Sequelize);
db.account = require('./account.model')(connection, Sequelize);
db.transaction = require('./transaction.model')(connection, Sequelize);


//user && account
db.account.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'users'
})
db.user.hasMany(db.account, {
    foreignKey: 'userId',
    as: 'accounts'
})



//user && transaction
db.transaction.belongsTo(db.user, {
    foreignKey: 'u_id',
    as: 'users'
})
db.user.hasMany(db.transaction, {
    foreignKey: 'u_id',
    as: 'transactions'
})



//account && transaction
db.transaction.belongsTo(db.account, {
    foreignKey: 'a_id',
    as: 'accounts'
})
db.account.hasMany(db.transaction, {
    foreignKey: 'a_id',
    as: 'transactions'
})



module.exports = db
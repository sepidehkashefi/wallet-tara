const { Sequelize } = require('sequelize').Sequelize
let Config = require('./db.config.js')
let config
const dialect = 'mysql'


switch (dialect) {
    case 'mySql':
        config = Config.mySql
        break;
    case 'mssql':
        config = Config.anotherDB
        break;
    default:
        config = Config.mySql
        break;
}


const connection = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        // logging: false,
        charset: 'utf8',
        collate: 'utf8_persian_ci',
        host: config.HOST,
        dialect: config.dialect,
        define: {
            timestamps: true,
            freezeTableName: true,
            underscored: false,
        },
        dialectOptions: {
            useUTC: true, //for reading from database
            dateStrings: true,
            instanceName: config.dialectOptions.instanceName,
            options: { "requestTimeout": 300000 }
        },
        operatorsAliases: false,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle,

        }
    }
)

module.exports = connection
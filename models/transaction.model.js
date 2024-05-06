
const bcrypt = require('bcryptjs')
const { account } = require('.')

module.exports = (connection, Sequelize) => {
    const Transaction = connection.define('transaction', {
        t_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        wage: {
            type: Sequelize.FLOAT,
        },
        operationType: {
            type: Sequelize.ENUM({
                values: ['withdraw', 'deposit']
            },
            ),
            validate: {
                isIn: [['withdraw', 'deposit']]
            }
        },
        done: {
            type: Sequelize.BOOLEAN,
        },
       amount : {
            type: Sequelize.STRING,
        },

    }, {
        indexes: [
            {
                using: 'BTREE',
                fields: ['t_id']
            },
        ],
    })
    return Transaction
}
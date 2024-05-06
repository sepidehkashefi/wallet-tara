
const bcrypt = require('bcryptjs')

module.exports = (connection, Sequelize) => {
    const Account = connection.define('account', {
        a_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        bankName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter your bankName',
                },
            }
        },
        branchName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please enter your branchName',
                },
            }
        },
        branchCode: {
            type: Sequelize.STRING,
        },
        cardNumber: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: 16,
                notNull: {
                    msg: 'Please enter your cardNumber',
                },
            }
        },
        iban: {
            type: Sequelize.STRING,
        },
        cvv2: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        userId: {
            type: Sequelize.UUID,
        },

    }, {
        indexes: [
            {
                using: 'BTREE',
                fields: ['a_id']
            },
        ],
    })
    return Account
}
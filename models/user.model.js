
const bcrypt = require('bcryptjs')

module.exports = (connection, Sequelize) => {
    const User = connection.define('user', {
        u_id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        firstName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [4, 15],
                notNull: {
                    msg: 'Please enter your firstName',
                },
            }
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [4, 15],
                notNull: {
                    msg: 'Please enter your lastName',
                },
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,


        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            notNull: {
                msg: 'Please enter your email',
            },
        },
        isAdmin: {
            type: Sequelize.BOOLEAN,

        },
        isActive: {
            type: Sequelize.ENUM({
                values: ['initial', 'active', 'notactive']
            },
            ),
            validate: {
                isIn: [['initial', 'active', 'notactive']]
            }
        },
        identityId: {//شناسنامه
            type: Sequelize.STRING,
            allowNull: false,

        },
        nationalCard: {// شماره ملی
            type: Sequelize.STRING,

        },
        job: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,

        },
        address: {
            type: Sequelize.STRING,
        },
        balance: {
            type: Sequelize.STRING,
        },
        otp: {
            type: Sequelize.STRING,
        },
    }, {
        indexes: [
            {
                using: 'BTREE',
                fields: ['u_id']
            },
        ],
    })
    return User
}
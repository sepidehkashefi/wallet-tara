
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
            set(value) {
                this.setDataValue('password', bcrypt.hashSync(value))
            },
            validate: {
                len: [4, 15],
                notNull: {
                    msg: 'Please enter your password',
                },
            }
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
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                len: [10, 10],
                notNull: {
                    msg: 'Please enter your identityId',
                },
            }
        },
        nationalCard: {// شماره ملی
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                len: [4, 10],
                notNull: {
                    msg: 'Please enter your nationalCard',
                },
            }
        },
        job: {
            type: Sequelize.STRING,
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                is: /(\+98|0)9\d{9}$/i
            },
            unique: {
                args: true,
                msg: "mobileValidate"
            }
        },
        address: {
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
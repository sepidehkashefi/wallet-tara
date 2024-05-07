module.exports = (app) => {

    const user = require('./user.routes')(app)
    const account = require('./account.routes')(app)
    const transaction = require('./transaction.routes')(app)
    const admin = require('./admin.routes')(app)
}


const web3Controller = require('../controllers/web3.controller')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, Content-Type, Accept'
        )
        req.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        next()
    })



    app.get('/web3/balance', web3Controller.returnAccountBalance)


}
const controller = require('../controllers/transaction.controller')
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')
const Validator = require('../middleware/validator.middleware')

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'Origin, Content-Type, Accept'
		)
		req.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
		next()
	})

	app.post('/transaction/add', [auth.verifyToken], controller.add)//- `POST /wallet/deposit`: Deposit funds (bank or crypto).- `POST /wallet/withdraw`: Request a withdrawal.

}
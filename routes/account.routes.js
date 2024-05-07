const controller = require('../controllers/account.controller')
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


	app.post('/bank-accounts', [auth.verifyToken, Validator('account')], controller.add)//Add a new bank account.
	app.delete('/bank-accounts/:a_id', [auth.verifyToken], controller.delete)// `DELETE /bank-accounts/{id}`: Delete a bank account.
	app.get('/account/list', [auth.verifyToken], controller.list) // `GET /bank-accounts`: List user bank accounts.
}
const controller = require('../controllers/user.controller')
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


	app.post('/auth/signup', [Validator('register')], controller.signup) // POST add user
	app.post('/auth/signin', [Validator('login')], controller.signin) // POST login
	app.post('/user/requestotp', controller.requestOtp)// OTP request
	app.post('/user/sendotp', controller.sendOtp) // user send OTP
	app.get('/user/getwalletbalance', [auth.verifyToken], controller.getWalletBalance)// GET /wallet/balance
	
}
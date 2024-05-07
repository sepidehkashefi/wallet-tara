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


	app.post('/user/add', [Validator('register')], controller.add) //`POST /auth/signup`
	app.post('/user/login', [Validator('login')], controller.login) //`POST /auth/signin`

	app.patch('/user/activeuser', [auth.verifyToken, admin.isAdmin], controller.activeUser)
	app.get('/user/list', [auth.verifyToken, admin.isAdmin], controller.list)

	app.post('/user/requestotp', controller.requestOtp)// OTP request
	app.post('/user/sendotp', controller.sendOtp) // user send OTP

	app.get('/user/getwalletbalance', [auth.verifyToken], controller.getWalletBalance)// GET /wallet/balance
	

}
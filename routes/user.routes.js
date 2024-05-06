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


	app.post('/user/add',[Validator('register')], controller.add)
	app.patch('/user/activeuser', [auth.verifyToken, admin.isAdmin], controller.activeUser)
	app.post('/user/login', [Validator('login')], controller.login)
	app.get('/user/list', [auth.verifyToken, admin.isAdmin], controller.list)
}
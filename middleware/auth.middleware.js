
const config = require('../config/auth.config.js')
const db = require('../models')
const User = db.user
const jwt = require('jsonwebtoken')

const verifyToken = (_req, _res, _next) => {

	const authHeader = _req.headers['authorization']
	if (authHeader && authHeader.toLowerCase().includes('bearer')) {
		const bearer = authHeader.split(' ')
		const bearerToken = bearer[1]
		_req.token = bearerToken
	}
	
	token = _req.token
	if (!token) {

		// if (_req.route.path == '/qa/listbyviewCount') {
		// 	_req.isListByViewCount = true
		// 	return _next()

		// } else {

			return _res.status(401).send({
				message: 'توکن وجود ندارد'
			})
		//}

	}
	jwt.verify(token, config.secret, async (err, decoded) => {
		if (err) {
			return _res.status(402).send({ message: 'دسترسی لازم وجود ندارد' })
		}

		await User.findOne({
			where: {
				email: decoded.name.trim(),
			}
		})
			.then(_result => {

				if (_result) {
					_req.userId = decoded.id
					return _next()
				}
				else {
					return _res.status(401).send({ message: 'دسترسی لازم وجود ندارد' })
				}

			}).catch(error => {
				return _res.status(401).send({ message: 'خطا در سمت سرور' })
			})
	})

}

const authJwt = { verifyToken }


module.exports = authJwt
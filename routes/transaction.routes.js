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
	app.get('/transaction/accept/:t_id/confirm', [auth.verifyToken, admin.isAdmin], controller.acceptTransaction) // `POST /admin/withdrawals/{id}/approve`: Approve a withdrawal and assign a receipt.
	app.get('/transaction/withdrawals/list', controller.listOfWithdrawals)//GET /admin/withdrawals: List pending withdrawals for approval.
	app.get('/transaction/deposits/list', controller.listOfDeposits)//GET /admin/deposits: List pending deposits for confirmation.
	app.get('/transaction/all/list', [auth.verifyToken, admin.isAdmin], controller.transactionLists)//GET /admin/transactions: List all transactions.
}
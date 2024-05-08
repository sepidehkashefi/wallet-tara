const transactionController = require('../controllers/transaction.controller')
const userController = require('../controllers/user.controller')
const auth = require('../middleware/auth.middleware')
const admin = require('../middleware/admin.middleware')
const Validator = require('../middleware/validator.middleware')
const fs = require("fs")
const uploadFile = require('../middleware/upload.middleware')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, Content-Type, Accept'
        )
        req.ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        next()
    })



    app.patch('/admin/activateuser', [auth.verifyToken, admin.isAdmin], userController.activateUser)
    app.get('/admin/getuserlist', [auth.verifyToken, admin.isAdmin], userController.getUserList)

    app.post('/admin/transaction/:t_id/approve', [auth.verifyToken, admin.isAdmin, uploadFile.single('file')], transactionController.acceptTransaction)// Approve a withdrawal or deposit and assign a receipt.
    app.get('/admin/withdrawals', [auth.verifyToken, admin.isAdmin], transactionController.listOfWithdrawals)// List pending withdrawals for approval.
    app.get('/admin/deposits', [auth.verifyToken, admin.isAdmin], transactionController.listOfDeposits)// List pending deposits for confirmation.
    app.get('/admin/transactions', [auth.verifyToken, admin.isAdmin], transactionController.transactionLists)//List all transactions.

}
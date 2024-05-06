
const Transaction = require('../models').transaction;
const User = require('../models').user;
const db = require('../models')
const Op = db.Op
const resMessage = require('../config/responseMessage.config');
var jwt = require('jsonwebtoken');


// localhost:8888/transaction/add
// method post
exports.add = async (_req, _res) => {

    if (_req.body.a_id && _req.body.u_id && _req.body.operationType && _req.body.amount) {
        try {
            _req.body.done = false
            await Transaction.create({ ..._req.body, wage: process.env.FEE })
            _res.send({ message: resMessage.OK_200.success })

        } catch (error) {

            _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error, error })
        }
    }
    else {
        _res.status(400).send({ message: resMessage.BAD_REQUEST_400.error_input })
    }
}


// localhost:8888/transaction/accept/:t_id
// method get
exports.acceptTransaction = async (_req, _res) => {

    try {


        const transaction = await Transaction.findOne({ where: { t_id: _req.params.t_id, done: false } })

        if (transaction.length == 0) {
            return _res.status(404).send({ message: resMessage.NOT_FOUND_404.not_found })
        }

        const wage = transaction.wage
        const operationType = transaction.operationType
        const amount = transaction.amount
        const value = amount - (amount * wage)


        await User.findOne({ where: { u_id: transaction.u_id } }).then(async (result) => {

            if (operationType == 'deposit') {

                await User.update({ balance: Number(result.balance) + value }, { where: { u_id: transaction.u_id } })
                await Transaction.update({ done: true }, { where: { t_id: transaction.t_id } })


            } else
                if (operationType == 'withdraw') {

                    await User.update({ balance: Number(result.balance) - value }, { where: { u_id: transaction.u_id } })
                    await Transaction.update({ done: true }, { where: { t_id: transaction.t_id } })


                }


        })

        return _res.send({ message: resMessage.OK_200.success })


    } catch (error) {
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}




// localhost:8888/transaction/list
// method get
exports.transactionLists = async (_req, _res) => {

    try {

        const transactions = await Transaction.findAll()

        return _res.send({ message: resMessage.OK_200.success, transactions })


    } catch (error) {
        console.log(error)
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}



// localhost:8888/transaction/list/withdrawals
// method get
exports.listOfWithdrawals = async (_req, _res) => {

    try {

        const transactions = await Transaction.findAll({where:{operationType:"withdraw",done:0}})

        return _res.send({ message: resMessage.OK_200.success, transactions })


    } catch (error) {
        console.log(error)
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}



// localhost:8888/transaction/list/deposits
// method get
exports.listOfDeposits = async (_req, _res) => {

    try {

        const transactions = await Transaction.findAll({where:{operationType:"deposit",done:0}})

        return _res.send({ message: resMessage.OK_200.success, transactions })


    } catch (error) {
        console.log(error)
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}

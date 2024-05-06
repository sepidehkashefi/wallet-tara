
const Account = require('../models').account;
const db = require('../models')
const Op = db.Op
const resMessage = require('../config/responseMessage.config');
var jwt = require('jsonwebtoken');

// localhost:8888/user/add
// method post
exports.add = async (_req, _res) => {

    if (_req.body.bankName && _req.body.branchName && _req.body.branchCode && _req.body.cardNumber && _req.body.cvv2 && _req.body.userId) {
        try {
            const account = await Account.findAll({ where: { cardNumber: _req.body.cardNumber } })
            if (account.length > 0) {
                return _res.status(400).send({ message: resMessage.BAD_REQUEST_400.duplicate_record })
            }
            await Account.create(_req.body)
            _res.send({ message: resMessage.OK_200.success })

        } catch (error) {

            _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error, error })
        }
    }
    else {
        _res.status(400).send({ message: resMessage.BAD_REQUEST_400.error_input })
    }
}


// localhost:8888/account/delete/:a_id
// method delete
exports.delete = async (_req, _res) => {
    try {
        await Account.destroy({ where: { a_id: _req.params.a_id } })
        _res.send({ message: resMessage.OK_200.success })
    } catch (error) {
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}

// localhost:8888/account/list
// method get
exports.list = async (_req, _res) => {

    try {

        const accounts = await Account.findAll()
        return _res.send({ message: resMessage.OK_200.success, accounts })

    } catch (error) {

        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }
}

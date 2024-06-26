
const User = require('../models').user;
const db = require('../models')
const Op = db.Op
const resMessage = require('../config/responseMessage.config');
var jwt = require('jsonwebtoken');


// localhost:8888/auth/signup
// method post
exports.signup = async (_req, _res) => {

    if (_req.body.email && _req.body.password) {
        try {
            const user = await User.findAll({ where: { email: _req.body.email } })
            if (user.length > 0) {
                return _res.status(400).send({ message: resMessage.BAD_REQUEST_400.duplicate_record })
            }
            await User.create({ ..._req.body, isActive: "initial", isAdmin: 0 })
            _res.send({ message: resMessage.OK_200.success })

        } catch (error) {

            _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error, error })
        }
    }
    else {
        _res.status(400).send({ message: resMessage.BAD_REQUEST_400.error_input })
    }
}





// localhost:8888/admin/addadmin
// method post
exports.addAdmin = async (_req, _res) => {

    if (_req.body.email && _req.body.password) {
        try {
            const user = await User.findAll({ where: { email: _req.body.email } })
            if (user.length > 0) {
                return _res.status(400).send({ message: resMessage.BAD_REQUEST_400.duplicate_record })
            }
            await User.create({ ..._req.body, isActive: "initial", isAdmin: 1 })
            _res.send({ message: resMessage.OK_200.success })

        } catch (error) {

            _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error, error })
        }
    }
    else {
        _res.status(400).send({ message: resMessage.BAD_REQUEST_400.error_input })
    }
}







// localhost:8888/user/activateuser
// method patch
exports.activateUser = async (_req, _res) => {

    if (_req.body.email && _req.body.isActive) {
        try {
            const user = await User.findAll({ where: { email: _req.body.email } })
            if (user.length == 0) {
                return _res.status(404).send({ message: resMessage.NOT_FOUND_404.not_found })
            }
            await User.update({ isActive: _req.body.isActive }, {
                where: {
                    email: _req.body.email
                }
            })
            _res.send({ message: resMessage.OK_200.success })

        } catch (error) {
            _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
        }
    }
    else {
        _res.status(400).send({ message: resMessage.BAD_REQUEST_400.error_input })
    }
}


// localhost:8888/user/getUserList
// method get
exports.getUserList = (_req, _res) => {

    User.findAll()
        .then(_result => {

            if (_result.length > 0)
                _res.status(200).send(_result)

            else
                _res.status(200).send([])
        })
        .catch((error) => {

            _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error, error })
        })
}


// localhost:8888/auth/signin
// method post
exports.signin = async (_req, _res) => {

    if (_req.body.email && _req.body.email.trim().length > 0 &&
        _req.body.password && _req.body.password.trim().length > 0) {

        await User.findOne({
            where: {
                [Op.and]: [{ email: _req.body.email, password: _req.body.password }]
            }

        }).then(async (_result) => {

            if (_result) {

                var token = jwt.sign({ name: _req.body.email, id: _result.u_id, isAdmin: _result.isAdmin }, 'tara');
                _res.status(200).send({ message: resMessage.OK_200, token })
            }

        })
            .catch(error => {
                _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error, error })
            })
    }
    else
        _res.status(400).send({ message: resMessage.BAD_REQUEST_400.error_input })
}


// localhost:8888/user/requestotp
// method post
exports.requestOtp = async (_req, _res) => {

    if (_req.body.email && _req.body.email.trim().length > 0) {

        await User.findOne({
            where: {
                email: _req.body.email
            }

        }).then(async (_result) => {

            if (_result) {

                const randomNum = Math.random() * 9000
                const formattedRandomNum = Math.floor(randomNum)

                await User.update({ otp: formattedRandomNum }, {
                    where: {
                        email: _req.body.email
                    }
                })

                _res.status(200).send({ message: resMessage.OK_200, formattedRandomNum })
            }

        })
            .catch(error => {

                _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error, error })
            })

    }
    else
        _res.status(400).send({ message: resMessage.BAD_REQUEST_400.error_input })
}

// localhost:8888/user/requestotp
// method post
exports.sendOtp = async (_req, _res) => {

    if (_req.body.email && _req.body.email.trim().length > 0 && _req.body.otp) {

        await User.findOne({
            where: {
                [Op.and]: [{ email: _req.body.email, otp: _req.body.otp }]
            }

        }).then(async (_result) => {

            if (_result) {

                await User.update({ isActive: 'active' }, { where: { email: _req.body.email } })
                _res.status(200).send({ message: resMessage.OK_200 })
            }

        })
            .catch(error => {
                _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error, error })
            })
    }
    else
        _res.status(400).send({ message: resMessage.BAD_REQUEST_400.error_input })
}

// localhost:8888/user/getwalletbalance
// method get
exports.getWalletBalance = async (_req, _res) => {


    await User.findOne({ where: { u_id: _req.userId } }).then(async (_result) => {

        if (_result) {
            _res.status(200).send({ message: resMessage.OK_200, balance: _result.balance })
        }

    })
        .catch(error => {
            _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error, error })
        })
}


// localhost:8888/user/getwalletbalance
// method get
exports.getWalletBalance = async (_req, _res) => {


    await User.findOne({
        where: {
            u_id: _req.userId
        }

    }).then(async (_result) => {

        if (_result) {
            _res.status(200).send({ message: resMessage.OK_200, balance: _result.balance })
        }

    })
        .catch(error => {
            _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error, error })
        })
}

const User = require('../models').user;
const db = require('../models')
const Op = db.Op
const resMessage = require('../config/responseMessage.config');
var jwt = require('jsonwebtoken');
const { isAdmin } = require('../middleware/admin.middleware');

// localhost:8888/user/add
// method post
exports.add = async (_req, _res) => {

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
// localhost:8888/user/activeuser
// method patch
exports.activeUser = async (_req, _res) => {

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


// localhost:8888/user/list
// method get
exports.list = (_req, _res) => {
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


// localhost:8888/user/login
// method post
exports.login = async (_req, _res) => {

    if (_req.body.email && _req.body.email.trim().length > 0 &&
        _req.body.password && _req.body.password.trim().length > 0) {


        await User.findOne({
            where: {
                [Op.or]: [{ email: _req.body.email, password: _req.body.password }]
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
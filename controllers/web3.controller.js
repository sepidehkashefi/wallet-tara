
const User = require('../models').user;
const db = require('../models')
const Op = db.Op
const resMessage = require('../config/responseMessage.config');
var jwt = require('jsonwebtoken');


// localhost:8888/web3//signup
// method post
exports.returnAccountBalance = async (_req, _res) => {

    try {
        var Web3 = require("web3");
        var url = 'https://bsc-mainnet.nodereal.io/v1/fefe30a9ba314a97beee4c450d8c8999';
        var web3 = new Web3(url);
        var address = '0x25aFB2951F370d90Fd7aAe9008b01Cc104c5FF5E';
        var balance = await web3.eth.getBalance(address);
        balance = web3.utils.fromWei(balance, 'ether');
        _res.status(200).send({ message: resMessage.OK_200.success,balance })

    }

    catch (err) {

        console.log(err)
        _res.status(500).send({ message: resMessage.INTERNAL_SERVER_500.server_error })
    }


}




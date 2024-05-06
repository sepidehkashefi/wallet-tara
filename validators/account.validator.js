//* validators/register.validator.js
const Joi = require('joi');


const accountSchema = Joi.object({
    bankName: Joi.string().min(1).required(),
    branchName: Joi.string().min(1).required(),
    branchCode: Joi.string(),
    cardNumber: Joi.string().required(),
    iban: Joi.string(),
    cvv2: Joi.number().required(),
    nationalCard: Joi.string(),
    userId:Joi.required()

});

module.exports = accountSchema;
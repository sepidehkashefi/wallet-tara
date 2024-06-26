//* validators/register.validator.js
const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    password: Joi.string().min(4).required(),
    isActive: Joi.string(),
    isAdmin: Joi.string(),
    identityId: Joi.string().required(),
    nationalCard: Joi.string(),
    job: Joi.string(),
    phone: Joi.number().required(),
    address: Joi.string(),
    balance: Joi.string(),
  
});

module.exports = registerSchema;
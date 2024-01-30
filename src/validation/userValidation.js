import Joi from "joi";

const registerUserValidation = Joi.object({
    username : Joi.string().max(100).required(),
    email : Joi.string().max(100).required(),
    password : Joi.string().max(100).required()
})

const loginUserValidation = Joi.object({
    username : Joi.string().max(100).required(),
    password : Joi.string().max(100).required()
})

const getUserValidation = Joi.string().max(100).required()
const getTokenValidation = Joi.string().required()

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    getTokenValidation
}
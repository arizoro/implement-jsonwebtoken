import express from 'express'
import userController from '../controller/userController.js'

const publicApi = express.Router()

publicApi.post('/api/users', userController.register)
publicApi.post('/api/users/login', userController.login)

export {
    publicApi
}
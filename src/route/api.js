import express from 'express'
import userController from '../controller/userController.js'
import { verifyToken } from '../middleware/tokenVerify.js'
// import { refreshToken } from '../middleware/refreshToken.js'

import cookieParser from 'cookie-parser'


const api = express.Router()
api.use(cookieParser())
// api.use(verifyToken)
api.get('/api/users/current',verifyToken, userController.get)
api.get('/api/users/token', userController.refreshToken)
api.delete('/api/users/logout', userController.logout)

export {
    api
}
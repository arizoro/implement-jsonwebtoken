import { prismaClient } from "../database/prisma.js"
import userService from "../service/userService.js"
import jwt from 'jsonwebtoken'

const register = async(req, res,next) => {
    try {
        const result = await userService.register(req.body)
        res.status(200).json({
            data : result
        })

    } catch (error) {
        next(error)
    }
}

const login = async(req,res,next) => {
    try {
        const {username, password} = req.body
        const acces_token = jwt.sign({username, password}, process.env.ACCES_TOKEN,{
            expiresIn : '20s'
        })
        const result = await userService.login(req.body)
        console.log(result)
        res.cookie('token', result , {
            httpOnly : true,
            maxAge : 24 * 60 * 60 * 1000
        })

        res.status(200).json({
            token : acces_token
        })
    } catch (error) {
        next(error)
    }
}

const get = async(req, res, next) => {
    try {
        const username = req.user.username
        const result = await userService.get(username)
        res.status(200).json({
            data : result
        })
    } catch (error) {
        next(error)
    }
}

const refreshToken = async(req,res,next) => {
    try {
        const token = req.cookies.token.token
        const result = await userService.refreshToken(token)    
        jwt.verify(token, process.env.REFRESH_TOKEN, (err,decoded) => {
            if(err)return res.status(401).json({
                errors : "Unauthorize"
            })
            const username = result.username
            const password = result.password
            const acces_token = jwt.sign({username, password}, process.env.ACCES_TOKEN,{
                expiresIn : '20s'
            })
            res.json({
                token : acces_token
            })
        })
    } catch (error) {
        next(error)
    }
}

const logout = async(req, res, next) => {
    try {
        const token = req.cookies.token.token
        const result = await userService.logout(token)
        res.status(200).json("ok")
    } catch (error) {
        next(error)
    }
}

export default {
    register,
    login,
    get,
    refreshToken,
    logout
}
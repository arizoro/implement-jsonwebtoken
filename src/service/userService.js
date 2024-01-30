import {prismaClient} from "../database/prisma.js"
import { ResponseError } from "../errors/error.js"
import { getTokenValidation, getUserValidation, loginUserValidation, registerUserValidation } from "../validation/userValidation.js"
import { validate } from "../validation/validation.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const register = async(request) => {
    const user = validate(registerUserValidation, request)
    const countUser = prismaClient.user.count({
        where : {
            username : user.username
        }
    })

    if(countUser === 1){
        throw new ResponseError(400 , "Username Already Exist")
    }

    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.user.create({
        data : user,
        select: {
            username: true,
            email : true
        }
    })
}

const login = async(request) => {
    const userLogin = validate(loginUserValidation, request)
    const user = await prismaClient.user.findUnique({
        where : {
            username : userLogin.username
        },
        select : {
            username : true,
            password : true
        }
    })

    if(!user){
        throw new ResponseError(404, "User is not found")
    }

    const passwordValid = await bcrypt.compare(userLogin.password, user.password)

    if(!passwordValid){
        throw new ResponseError(404, 'Username or password invalid')
    }
    const username = user.username
    const password = user.password
    const refreshToken = jwt.sign({username, password} , process.env.REFRESH_TOKEN,{
        expiresIn : '1d'
    })

    return prismaClient.user.update({
        data : {
            token : refreshToken
        },
        where : {
            username : userLogin.username
        },
        select : {
            token : true
        }

    })
}

const get = async(username) => {
    username = validate(getUserValidation, username)

    const user = await prismaClient.user.findUnique({
        where : {
            username : username
        },
        select : {
            username: true,
            email : true
        }
    })

    if(!user){
        throw new ResponseError(404, "User is not found")
    }

    return user
}

const refreshToken = async(token) => {
    token = validate(getTokenValidation,token)

    const userToken = await prismaClient.user.findFirst({
        where : {
            token : token
        }
    })

    if(!userToken){
        throw new ResponseError(401, "Unauthorize")
    }
    return userToken
}

const logout = async(token) => {
    token = validate(getTokenValidation, token)
    const user = await prismaClient.user.findFirst({
        where : {
            token : token
        }
    })
    if(!user){
        throw new ResponseError(204, "User not found")
    }

    return prismaClient.user.update({
        where : {
            username : user.username
        },
        data : {
            token : null
        },
        select : {
            username : true
        }
    })
}

export default {
    register,
    login,
    get,
    refreshToken,
    logout
}
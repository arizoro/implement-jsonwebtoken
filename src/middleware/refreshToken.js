import jwt from 'jsonwebtoken'
import { prismaClient } from '../database/prisma.js'

export const refreshToken = async(req, res) => {
    try {
        const refreshToken = req.cookies.token
        console.log(refreshToken)
        if(!refreshToken)return res.status(401).json({
            errors : "Unauthorize"
        })
    
        const user = await prismaClient.user.findFirst({
            where : {
                token : refreshToken
            }
        })
        if(!user)return res.status(401).json({
            errors : 'Unauthorize'
        })
    
        jwt.verify(token, process.env.REFRESH_TOKEN, (err,decoded) => {
            if(err)return res.status(401).json({
                errors : "Unauthorize"
            })
            const username = user.username
            const password = user.password
            const acces_token = jwt.sign({username, password}, process.env.ACCES_TOKEN,{
                expiresIn : '20s'
            })
            res.json({
                token : acces_token
            })
        })
    } catch (error) {
        console.log(error)
    }

}
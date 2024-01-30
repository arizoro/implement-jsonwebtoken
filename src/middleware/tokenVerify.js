import jwt from 'jsonwebtoken'
import { prismaClient } from '../database/prisma.js'

export const verifyToken = async(req,res, next) => {
    const header = req.headers['authorization']
    // console.log(req.cookies)
    const { username } = req.body
    const token = header && header.split(' ')[1]
    const user = prismaClient.user.findFirst({
        where : {
            username : username
        }
    })
    if(token == null)return res.sendStatus(401)
    jwt.verify(token, process.env.ACCES_TOKEN,(err,decoded) => {
        if(err){
            return res.sendStatus(403)
        }
        user.username = decoded.username
        req.user = user
        next()
    })
}
import { ResponseError } from "../errors/error.js"

export const errorMiddleware = async(err,req,res,next) => {
    if(!err){
        next()
        return
    }

    if(err instanceof ResponseError){
        res.status(err.status).json({
            err : err.message
        }).end()
    }else{
        res.status(500).json({
            err : err.message
        }).end()
    }
}

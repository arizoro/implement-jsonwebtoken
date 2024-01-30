import { ResponseError } from "../errors/error.js"

export const validate = (schema, request) => {
    const result = schema.validate(request ,{
        abortEarly: false,
        allowUnknown: false
    })

    if(result.error){
        throw new ResponseError(404, result.error.message)
    }else{
        return result.value
    }
}



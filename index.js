import express from 'express'
import 'dotenv/config'
import { errorMiddleware } from './src/middleware/errorMiddleware.js'
import { publicApi } from './src/route/publicApi.js'
import cors from 'cors'
import { api } from './src/route/api.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(cors())
app.use(express.json())
api.use(cookieParser())
app.use(publicApi)
app.use(api)

app.use(errorMiddleware)

app.listen(3000, () => {
    console.log('server running in port 3000')
})
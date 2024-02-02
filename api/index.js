import  express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Mongodb Connected!')
}).catch((err)=>{
    console.log(err.message)
})

const app = express()

const port = 3000
app.listen(port, ()=>{
    console.log(`Server running on port:${port}`)
})
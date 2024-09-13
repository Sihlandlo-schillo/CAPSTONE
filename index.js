import express from 'express'
import cors from 'cors'
// import the router

import usersRouter from './routes/usersRouter.js'
import itemsRouter from './routes/itemsRouter.js'

let port = process.env.PORT || 6262

const app = express()
app.use(cors({
    // BELOW, allow backend to accept information (also on front-end 'store')
    origin:['https://capstone-4b7d8.web.app/','*'],
    credentials:true
}))                                                                                                                                 
app.use(express.json())

app.use(express.static('public')) // Don't know what it is for
//use the router
app.use('/users', usersRouter)
app.use('/items', itemsRouter)

app.listen(port,()=>{
    console.log('http://localhost:' +port);
})

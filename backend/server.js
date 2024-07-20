import express from 'express'
import cors from 'cors'
import { connectDb } from './config/db.js'
import foodRouter from './routes/foodRoutes.js'
import userRouter from './routes/userRoutes.js'
import 'dotenv/config'
import cartRouter from './routes/cartRouter.js'
import orderRouter from './routes/orderRouter.js'


// aap config
const app = express()
const port = 8080

// middleware
app.use(express.json())
app.use(cors())

// DB conntection
connectDb();

// api end point
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'));
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter)
app.get("/", (req,res)=>{
    res.send("Api Wroking")
})

app.listen(port,()=>{
    console.log(`Server Stared on http://localhost:${port}`);
})

// mongodb+srv://root:root1234@cluster0.8idgwua.mongodb.net/?
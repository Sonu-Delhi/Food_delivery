import express from 'express'
import autMiddleware from '../middleware/auth.js'
import { placeOrder } from '../controllers/orderController.js'

const orderRouter = express.Router()
orderRouter.post("/place",autMiddleware,placeOrder)

export default orderRouter;
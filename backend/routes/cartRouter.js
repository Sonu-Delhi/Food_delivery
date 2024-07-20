import express from 'express'
import { addToCart, removeFromCart ,getCart } from '../controllers/cartController.js'
import autMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();
cartRouter.post("/add",autMiddleware,addToCart);
cartRouter.post("/remove",autMiddleware,removeFromCart);
cartRouter.post("/get",autMiddleware,getCart);

export default cartRouter;
import userModel from '../models/userModel.js';
import autMiddleware from '../middleware/auth.js';

//  Add items to user cart
 const addToCart = async (req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId]++;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({
            success:true,
            message:"Added to cart"
        })
    }catch (error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
 }
//  Remove items from user cart
 const removeFromCart = async (req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,
            message:"Remove from cart"
        })

    }catch (error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
 }


//  fetchuser cart Data 
 const getCart = async (req,res)=>{
    try{
        let userData = await userModel.findById(req.body.userId);
        res.json({
            success:true,
            cartData:userData.cartData
        })
    }catch (error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Server error"
        })
    }
 }

 export {
    addToCart,
    removeFromCart,
    getCart
 }
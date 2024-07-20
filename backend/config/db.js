import mongoose from "mongoose";

export const connectDb = async()=>{
    await mongoose.connect('mongodb+srv://root:root1234@cluster0.8idgwua.mongodb.net/food-del').then(()=>{
        console.log("Db connected");
    })
}
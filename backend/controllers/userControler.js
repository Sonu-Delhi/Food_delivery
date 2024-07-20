import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator";

// Login User

const loginUser = async (req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message: "User does not exists"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Incorrect password"
            });
        }

        // Create and send JWT
        const token = createToken(user._id);
        res.json({
            success: true,
            token,
        });
    }catch (err){
        console.log(err);
        res.json({
            success:false,
            message:"Error"
        })
    }
}

// Create token
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

// Register User

const registerUser = async (req,res)=>{
    const {name,password,email} = req.body;
    try{
        // Checking user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.status(400).json({
                success:false,
                message: "User already exists"
            });
        }
        // Validating email format & strong password
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success:false,
                message: "Please enter valid email"
            });
        }

        if(password.length<8){
            return res.status(400).json({
                success:false,
                message: "Please enter a strong password"
            });
        }
        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Creating new user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        // Saving user
        const user = await newUser.save()
        const token = createToken(user._id);
        res.json({success:true,token});
    }catch (err){
        console.log(err);
        res.json({
            success:false,
            message: "Something went wrong. Please try again"
        })
    }
}

export {
    loginUser,
    registerUser
}
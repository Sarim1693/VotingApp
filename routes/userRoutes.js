const express=require('express');
const router=express.Router();
const User=require('./../models/user');
const sendOtp=require('./../utils/sendOtp');
const Vote=require('./../models/vote');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const authenticateUser=require('./../auth');
router.post('/signup', async(req, res)=>{
    try{
        const {username, email, password, role}=req.body;
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({meassage: 'User already exists with this email'});
        }
          const newUser = new User({
            username,
            email,
            password, 
            role: role || 'user' 
        });
        await newUser.save();
       
        res.status(200).json({message: 'SignUp Successfull'});
    }
    catch(err){
        console.log('Error Occured ', err);
        res.status(500).json({err: 'Internal Server Error'});
    }
});
router.post('/login',async (req, res)=>{
    const {email, password}=req.body;
    try{
        const isUser= await User.findOne({email});
        if(!isUser){
            return res.status(401).json({message: 'Email not found'});
        }
        const isMatch= await bcrypt.compare(password, isUser.password);
        if(!isMatch){
            return res.status(401).json({message: 'Incorrect Password '});
        }
        const token=jwt.sign(
            {userId:user._id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXPIRES_IN}
        );
        res.status(200).json({message: 'Login Successfull', token});
    }
    catch(err){
        console.log('Error Occured ', err);
        res.status(500).json({err: 'Internal Server Error'});
    }
});
const otpStore={};
router.post('/send-otp', async(req, res)=>{
    const {email}=req.body;
    const otp=Math.floor(100000+Math.random()*900000).toString();
    try{
        await sendOtp(email, otp);
        otpStore[email]=otp;
        res.status(200).json({message: 'OTP Sent Successfully'});
    }
    catch(err){
        console.log('Error Occured ', err);
        res.status(500).json({err: 'Unable to send OTP'});
    }
});
router.post('/verify-otp', async(req, res)=>{
    const {email, otp}=req.body;
    if(otpStore[email]===otp){
        delete otpStore[email];
        return res.status(200).json({message: 'Otp Verfied Sccessfully'});
    }
    else{
        return res.status(500).json({err: 'Inavlid or Expired OTP'});
    }
});
router.get('/result', async(req, res)=>{
    try{
        const result= await Vote.aggregate([
            {
                $group:{
                    _id:"$option",
                    count:{$sum:1} 
                }
            }
        ]);
        res.status(200).json(result);
    }
    catch(err){
        console.log('Error Occured ', err);
        res.status(500).json({err: "Error while fetching result"});
    }
})
module.exports=router;
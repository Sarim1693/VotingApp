const express=require('express');
const jwt=require('jsonwebtoken');
const User=require('./../models/user');
const router=express.Router();
const bcrypt=require('bcrypt');
router.post('/admin/login', async(req, res)=>{
    const {email, password}=req.body;
    try{
        const admin=await User.findOne({email});
        if(!admin){
            return res.status(404).json({message:'Invalid email'});
        }
        const isMatch=await bcrypt.compare(password, admin.password);
        if(!isMatch){
            return res.status(401).json({message: "Invalid Password"});
        }
        const token=jwt.sign(
            {userId:admin._id, role:admin.role},
            process.env.JWT_SECRET,
            {expiresIn:'1d'},
        );
        res.status(200).json({message: 'Login Successfull', token});
    }
    catch(err){
        console.log('Error Occured ', err);
        res.status(500).json({err: 'Internal Server Error'});
    }
});
module.exports=router;
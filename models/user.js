const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        default:false
    },
    otp:{
        type:String
    },
    otpExpiry:{
        type:Date
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user'
    }
});
userSchema.pre('save', async function(next){
    const user=this;
    if(!user.isModified('password')) return next();
    try{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(this.password, salt);
        this.password=hashedPassword;
        next();
    }
    catch(err){
        return next(err);
    }
});
const user=mongoose.model('User', userSchema);
module.exports=user;
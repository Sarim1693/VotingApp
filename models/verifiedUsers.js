const mongoose=require('mongoose');
const verifiedUserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    verifiedAt:{
        type:Date,
        default:Date.now()
    }
});
const VerifiedUser=mongoose.model('VerifiedUser', verifiedUserSchema);
module.exports=VerifiedUser;
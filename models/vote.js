const mongoose=require('mongoose');
const voteSchmea=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    option:{
        type:String,
        required:true
    },
    votedAt:{
        type:Date,
        default:Date.now()
    }
});
const vote=mongoose.model('vote', voteSchmea);
module.exports=vote;
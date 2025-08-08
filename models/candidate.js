const mongoose=require('mongoose');
const candidateSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    voteCount:{
        type:Number,
        default:0
    }
});
const candidate=mongoose.model('candidate', candidateSchema);
module.exports=candidate;
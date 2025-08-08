const jwt=require('jsonwebtoken');
const authorizeUser=(req, res, next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.stat
    }
}
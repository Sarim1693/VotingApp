const jwt=require('jsonwebtoken');
const authenticateUser=(req, res, next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({err: 'Token Not Found'});
    }
    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }
    catch(err){
        console.log('Error Occured ', err);
        res.status(500).json({err: 'Internal Server Error'});
    }
}
const authenticateAdmin=(req, res, next)=>{
    if(req.user.role!=='admin'){
        return res.status(403).json({message: "admin only"});
    }
    next();
}
module.exports={authenticateUser, authenticateAdmin};
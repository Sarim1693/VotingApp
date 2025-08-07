const mongoose=require('mongoose');
const mongoUrl=process.env.MONGO_URL;
mongoose.connect(mongoUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const db=mongoose.connection;
db.on('connected', ()=>{
    console.log('Databse Connected');
});
 db.on('disconnected', ()=>{
    console.log('Databse Disconnected');
 });
db.on('error', (err)=>{
    console.log('Error Occured in Databse ', err);
});
module.exports=db;
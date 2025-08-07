const express=require('express');
require('dotenv').config();
const app=express();
app.use(express.json());
const PORT=process.env.PORT||3000
const db=require('./db');
const userRoutes=require('./routes/userRoutes');
app.use('/user', userRoutes);
app.listen(PORT, ()=>{
    console.log(`Server is Running at port ${PORT}`)
})
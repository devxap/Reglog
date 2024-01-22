const express=require('express');
const mongoose=require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const Role=require('./models/Role');
require('dotenv').config();
const app=express();

const config=require('./config');

app.use(express.json());
app.use('/auth',authRoutes);
app.use('/user',userRoutes);

const PORT=process.env.PORT || 3000;
config.initConfig();
app.listen(PORT,()=>{
    console.log(`Server is listening at port: ${PORT}`);
})

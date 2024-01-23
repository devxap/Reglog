const express=require('express');
const mongoose=require('mongoose');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const Role=require('./models/Role');
const config=require('./config');
const app=express();

mongoose.connect(config.mongoURI,{useNewUrlParser: true, useUnifiedTopology:true})
.then(()=>{
    console.log("Mongo Connected");
    initial();
});
app.use(express.json());
app.use('/auth',authRoutes);
app.use('/user',userRoutes);

const PORT=process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log(`Server is listening at port: ${PORT}`);
})

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
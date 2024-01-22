const Role = require('./models/Role');
const mongoose=require('mongoose');

async function Roleinit() {
    try {
        var count = await Role.estimatedDocumentCount();
        if (count != 0) {
            return;
        }

        Role.insertMany([{ name: "user" }, { name: "admin" }, { name: "moderator" }]);
    } catch (error) {
        console.log("config->Roleinit" + error);
    }
}

const dbinit = async () =>{
    await mongoose.connect(process.env.mongoURI,{useNewUrlParser: true, useUnifiedTopology:true});
}

const initConfig = async () => {
    await dbinit();
    await Roleinit();
}

exports.initConfig = initConfig;
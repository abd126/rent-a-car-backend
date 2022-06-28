const mongoose = require("mongoose");
const env = require("./envConfig")

const connect = async() =>{
    try {
     await  mongoose.connect(env.MONGO_URL);
     console.log("database connected");
    } catch (error) {
       console.log(error.message) ;
    }
};

module.exports = connect;
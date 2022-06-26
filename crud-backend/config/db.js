const mongoose = require("mongoose");
const env = require("./envConfig")

const connect = async() =>{
    try {
     await  mongoose.connect(env.MONGO_URL);
     mongoose.connection.on("connected", () => console.log("mongoose connected"));
    } catch (error) {
        mongoose.connection.on("error", (error) => console.log(error));
    }
};

module.exports = connect;
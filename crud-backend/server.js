const express = require("express");
const env = require("./config/envConfig");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const connect = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const app = express();

//connect database
connect();

//add midleware
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}));
//user routes
app.use("/api" , userRoutes);
//category routes
app.use("/api" , categoryRoutes);
//product routes
app.use("/api" , productRoutes);
//cart routes
app.use("/api" , cartRoutes);


const port = env.PORT || 5000;

app.get("/" , (req, res)=>{
    res.json({msg: "welcome to Daraz!!!"})
});

// const User = require("./models/user")

// const input = {
//     name : "almas",
//     email: "almas@gmail.com",
//     password : "123456",
//     role : "admin"
// };
// const user = new User(input);
// user.save((err, document)=>{
//     if(err){
//         console.log(err)
//         console.log(document)
//     }
// });



app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
});
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        unique : true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin'],
    }
});

// UserSchema.pre("save" , function(next){
//     if(!this.isModified("password"))
//     return next();
//     bcrypt.hash(this.password , 10 , (err, passwordHash)=> {
//         if(err){
//             return next(err);
//             this.password = passwordHash;
//             next();
//         }
//     });
// });


// UserSchema.methods.comparePassword = function (password , cb) {
//     bcrypt.compare(password , this.password,(err, isMatch)=>{
//         if(err){
//             return cb(err);
//         }else {
//             if(!isMatch){
//                 return cb(null , isMatch);
//                 return cb(null , this);
//             }
//         }
//     });
// };


const userModel = mongoose.model("User" , UserSchema);
module.exports = userModel;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const User  = require("../models/user");

const cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

passport.use(new jwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "AlmasAnsari"
}, (payload , done)=>{
    User.findById({_id : payload.sub} , (err, user)=>{
        if(err){
          return  done(err, false);
        }
        if(user){
            return done(null , user);
        }else{
            return done(null , false);
        }
    });
}));


passport.use(new LocalStrategy((name,password,done)=>{
    User.findOne({name}, (err,user)=> {
        //if some error in db
        if(err){
            return done(err);
        }
        ///if user does not exist
        if(!user){
            return done(null , false);
            user.comparePassword(password , done)
        }
    })
}))

module.exports =passport
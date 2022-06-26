const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config/envConfig")

// module.exports.authorization = async(req , res, next) =>{
//     const headerToken = req.headers.token;
//     if (headerToken) {
//         const token = headerToken.split("Bearer ")[1];
//         const verified = jwt.verify(token , JWT_SECRET);
//         if (verified) {
//             next();
//         } else {
//             return res.status(401).json({errors:[{msg : "please add a valid token"}]});
//         }
//         console.log(headerToken)
//     } else {
//         return res.status(401).json({errors : [{msg : "please add token"}]});
//     }
// };


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, JWT_SECRET , (err, user) => {
        if (err) res.status(403).json("Token is not valid!");
        req.user = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  };
  
  const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.admin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  
  const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.admin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  
  module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  };

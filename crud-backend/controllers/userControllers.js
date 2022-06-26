const { validationResult } = require("express-validator");
const { hashedPassword, createToken, comparePassword } = require("../services/authServices");
const userModel = require("../models/user");
///route post /api/register
module.exports.register = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        const { name, email, password } = req.body;
        try {
            const emailExist = await userModel.findOne({ email });
            if (!emailExist) {
                const hashed = await hashedPassword(password);
                const user = await userModel.create({
                    name,
                    email,
                    password: hashed,

                });
                var token = createToken({ id: user._id, name: user.name });

                return res.status(201).json({ msg: "your account has been created", token })
            } else {
                return res.status(401).json({ errors: [{ msg: `${email} is already taken` }] })
            }
        } catch (errors) {
            console.log(errors.message)
            return res.status(500).json()
        }
    } else {
        //validation failed
        return res.status(400).json({ errors: errors.array() })
    }
};


///route post /api/login

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        try {
            const user = await userModel.findOne({ email })
            if (user) {
                if (await comparePassword(password, user.password)) {
                    var token = createToken({ id: user._id, name: user.name });
                    if (user.admin) {
                        return res.status(201).json({ token, admin: true })
                    } else {
                        return res.status(201).json({ token, admin: false })
                    }

                } else {
                    return res.status(401).json({ errors: [{ msg: "password not matched" }] })
                }
            } else {
                return res.status(401).json({ errors: [{ msg: `${email} is not found` }] })

            }
        } catch (errors) {
            console.log(errors.message)
            return res.status(500).json("server internal errors")
        }
    } else {
        return res.status(401).json({ errors: errors.array() })
    }
}

/// get all users////

module.exports.allUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
}


//// get user////

module.exports.user = async (req, res) => {
    const { id } = req.params.id;
    console.log(id)
    try {
        const user = await userModel.findById( id);
        res.status(200).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }
};

// ///delete user///



const userModel = require("../models/user.model")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function register(req, res) {

    const { email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "user Already exists"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        email: email,
        password: hashPassword
    })

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRED)

    res.cookie("token", token);

    res.status(201).json({
        message: "register successfully",
        user
    })

};

async function login(req, res) {

    const { email, password } = req.body;

    const user = await userModel.findOne({ email});

    if(!user){
        return res.status(401).json({
            message:"user invalid"
        })
    }

    const ispasswordValid = await bcrypt.compare(password, user.password);

    if(!ispasswordValid){
        return res.status(401).json({
            message:"password invalid"
        })
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRED)

    res.cookie("token", token);

    res.status(200).json({
        message:"login successfully",
        user
    })
    


}

module.exports = { register, login}
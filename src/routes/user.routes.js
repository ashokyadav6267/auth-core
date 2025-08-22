const express = require('express');
const jwt = require('jsonwebtoken')
const userController = require("../controllers/user.controllers")

const router = express.Router();


router.get("/profile", (req, res, next) =>{

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:'token not found'
        })
    }

    try {

        const decoded =  jwt.verify(token, process.env.JWT_SECRED);
        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(401).json({
            message:"invalid token"
        })
    }


}, userController.profile )

module.exports = router;
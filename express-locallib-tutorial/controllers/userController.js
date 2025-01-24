const user = require('../models/user');

const asyncHandler = require('express-async-handler');

const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");



exports.userSignup = asyncHandler(async (req, res, next)=> {

    try{
        const {name, email, password, createdAt, updatedAt} = req.body;

    const existinguser = await user.findOne({email});

    if (existinguser){
        res.status(400).json({message: "user already exist"});
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new user({
        name,
        email,
        password:hashpassword,
        createdAt,
        updatedAt
    }); 

    const savedUser = await newUser.save()
    const {role, ...userdata} = savedUser._doc;
    res.status(201).json(userdata)
    } catch(error){
        next(error);
    }
    
    
});

exports.userList = asyncHandler(async (req, res, next)=>{
    const get_users = await user.find().exec();
    res.status(200).json(get_users);
}) 

exports.userLogin = asyncHandler(async (req, res, next)=>{
    const {email, password} = req.body;
    try{
        const userExist = await user.findOne({email}).select('+password');

        if(!userExist) return res.status(201).json({message:'user does not exist'});

        const passwordExist = await bcrypt.compare(password, userExist.password);

        if (!passwordExist) return res.status(401).json({message:"Invalid Email or password, pls try again."});

        function generateaccessToken(userExist){
            let userId = userExist._id;
            // let userEmail = userExist._email;
            return jwt.sign({userId}, process.env.SECRET_ACCESS_TOKEN, {expiresIn: '20m'});
        };

        let options = {
            maxAge: 20 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite:"None"
        }
        const accessToken = generateaccessToken(userExist);
        console.log(accessToken);
        res.cookie("SessionID", accessToken, options);
        res.status(200).json({message: "You have successfully logged in ", accessToken})

    }catch(error){
        next(error);
    }

});
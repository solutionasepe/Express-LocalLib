const user = require('../models/user')

const asyncHandler = require('express-async-handler')

const bcrypt = require('bcrypt')

exports.userLogin = asyncHandler(async (req, res, next)=> {

    try{
        const {name, email, password, role, createdAt, updatedAt} = req.body;

    const existinguser = await user.findOne({email});

    if (existinguser){
        res.status(400).json({message: "user already exist"});
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new user({
        name,
        email,
        password:hashpassword,
        role,
        createdAt,
        updatedAt
    });

    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
    } catch(error){
        next(error);
    }
    
    
});

exports.userList = asyncHandler(async (req, res, next)=>{
    const get_users = await user.find().exec();
    res.status(200).json(get_users);
}) 
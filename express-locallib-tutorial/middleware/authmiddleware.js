const User = require('../models/user');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');


exports.Verify = asyncHandler (async function (req, res, next){
    console.log("Incoming request:", req.headers);
    // let token = req.cookies.SessionID;
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    // if(!authHeader) return res.sendStatus(401);
    if (!authHeader) return res.status(401).json({ message: "Unauthorized: No token provided" });

    const token =  authHeader.split(' ')[1];
    console.log(token);
    if(!token) return res.sendStatus(401);
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, async function (err, decoded){
        if (err) return res.status(400).json({message: "This session has expired pls login again"});
        // console.log(process.env.SECRET_ACCESS_TOKEN);
        let{userId} = decoded;
        let user = await User.findById(userId);
        let{password, ...userdata} = user._doc;
        req.user = userdata;
        console.log(`this is fine`)
        next();
    });
});

exports.VerifyRole = function(userRole)
{return asyncHandler(async function(req, res, next){console.log("Incoming request:", req.headers);
    // let token = req.cookies.SessionID;
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    // if(!authHeader) return res.sendStatus(401);
    if (!authHeader) return res.status(401).json({ message: "Unauthorized: No token provided" });

    const token =  authHeader.split(' ')[1];
    console.log(token);
    if(!token) return res.sendStatus(401);
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, async function (err, decoded){
        if (err) return res.status(400).json({message: "This session has expired pls login again"});
        // console.log(process.env.SECRET_ACCESS_TOKEN);
        let{userId} = decoded;
        let user = await User.findById(userId);
        if(user.role !== userRole)
            return res.status(401).json({message:"You're not authprised to view this page"});
        next();
    })
    
    });
};


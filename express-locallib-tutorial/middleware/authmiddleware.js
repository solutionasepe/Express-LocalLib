const User = require('../models/user');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');


exports.Verify = asyncHandler (async function (req, res, next){
    console.log({req})
    // let token = req.cookies.SessionID;
    const authheader = req.header['cookies'];


    if(!authheader) return res.sendStatus(401);
    // if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    let cookie = authheader.split("=")[1];
    jwt.verify(cookie, process.env.SECRET_ACCESS_TOKEN, async function (err, decoded){
        if (err) return res.status(400).json({message: "This session has expired pls login again"});
        // console.log(process.env.SECRET_ACCESS_TOKEN);
        let{userId} = decoded;
        let user = await User.findById(userId);
        let{password, ...userdata} = user._doc;
        req.user = userdata;
        console.log(`this is fine`)
        next();
    });
    next()
});

// const util = require('util');
// const jwtVerify = util.promisify(jwt.verify);

// exports.Verify = asyncHandler(async function (req, res, next) {
//     const token = req.cookies.SessionID;

//     if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

//     try {
//         const decoded = await jwtVerify(token, process.env.SECRET_ACCESS_TOKEN);
//         const { userId } = decoded;

//         const user = await User.findById(userId);
//         if (!user) return res.status(404).json({ message: "User not found" });

//         const { password, ...userdata } = user._doc;
//         req.user = userdata;

//         next();
//     } catch (err) {
//         console.error(err);
//         return res.status(400).json({ message: "This session has expired, please log in again" });
//     }
// });


exports.VerifyRole = function(userRole){ 
    return asyncHandler(async function(req, res, next){
    const user = req.user;
    const{role} = user;

    if(role !== userRole){
        return res.status(401).json({message:"You're not authprised to view this page"});
    }

    next();
});
}

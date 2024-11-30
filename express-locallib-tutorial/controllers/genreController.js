const Genre = require("../models/genre");

const asyncHandler = require("express-async-handler");

exports.genre_list = asyncHandler(async (req, res, next)=>{
    // res.send("NOT IMPLEMENTED: Genre list");
    const genre = await Genre.find().exec();
    res.status(200).json(genre);
});

exports.genre_details = asyncHandler(async (req, res, next)=>{
    res.send(`NOT IMPLEMENTED: Genre detail: ${res.params.id}`);
});

exports.genre_create_get = asyncHandler(async(req, res, next)=>{
    res.send("NOT IMPLEMENTED: Genre Create GET");
});

exports.genre_create_post = asyncHandler(async(req, res, next)=>{
    // res.send("NOT IMPLEMENTED: Genre Create POST");
    try{
        const{name} = req.body;

        if(!name){
            res.status(400).json({error:"Name of the genre is required"});
        }

        const genre = new Genre({name});
        const saveGenre = await genre.save();
        res.status(201).json(saveGenre);
    } catch(error){
        next(error);
    }
});

exports.genre_update_get = asyncHandler(async(req, res, next)=>{
    res.send("NOT IMPLEMENTED: Genre update GET");
});

exports.genre_update_post = asyncHandler(async(req, res, next)=>{
    res.send("NOT IMPLEMENTED: Genre update POST");
});

exports.genre_delete_get = asyncHandler(async(req, res, next)=>{
    res.send("NOT IMPLEMENTED: Genre delete GET");
});

exports.genre_delete_post = asyncHandler(async(req, res, next)=>{
    res.send("NOT IMPLEMENTED: Genre delete POST");
});
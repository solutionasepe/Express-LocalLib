const Genre = require("../models/genre");
const Book = require("../models/book")

const asyncHandler = require("express-async-handler");
const genre = require("../models/genre");

exports.genre_list = asyncHandler(async (req, res, next)=>{
    // res.send("NOT IMPLEMENTED: Genre list");
    const genre = await Genre.find().exec();
    res.status(200).json(genre);
});

exports.genre_details = asyncHandler(async (req, res, next)=>{
    // res.send(`NOT IMPLEMENTED: Genre detail: ${res.params.id}`);

    try{
        const[genre, genreInBook] = await promise.all([
            Genre.findById(req.params.id).exec(),
            Bookook.findById({genre: req.params.id}, "title summary").exec()
        ])
    
        if (genre === null){
            res.status(400).json({Error:"Genre does not exist"});
        }
    
        res.status(200).json([genre, genreInBook]);
    } catch(error){
        next(error);
    }
    
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
    // res.send("NOT IMPLEMENTED: Genre update GET");

    try{
        const {name} = req.body;

    const genre_update = await Genre.findByIdAndUpdate(
        req.params.id,
        {name},
        {new:true, runValidators: true}
    )

    if(!genre_update){
        res.status(401).json({error:"No genre avaibalble to be updated"});
    }

    const savedGenreUpdate = await genre_update.save();
    res.status(201).json({message:"your genre is sucessfully updated"}, savedGenreUpdate);
    }catch(error){
        next(error);
    }
    
});

// exports.genre_update_post = asyncHandler(async(req, res, next)=>{
//     // res.send("NOT IMPLEMENTED: Genre update POST");
// });

exports.genre_delete_get = asyncHandler(async(req, res, next)=>{
    // res.send("NOT IMPLEMENTED: Genre delete GET");
    const genre_delete = await Genre.findByIdAndDelete(req.params.id);

    if (!genre_delete){
        res.status(404).json({error:"genere object not found"});
    }

    res.status(200).json({message:"The genre is deleted sucessfully"}, genre_delete);
});

// exports.genre_delete_post = asyncHandler(async(req, res, next)=>{
//     res.send("NOT IMPLEMENTED: Genre delete POST");
// // });
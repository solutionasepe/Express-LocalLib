const Author = require("../models/author");

const asyncHandler = require("express-async-handler");
const { find } = require("../models/book");

exports.author_list = asyncHandler(async function(req, res, next){
    // res.send("NOT IMPLEMENTED: Author List");
    const allauthors = await Author.find({}, "firstName familyName");
    res.json(allauthors);

});

exports.author_detail = asyncHandler(async (req, res, next) =>{
    res.send(`NOT IMPLEMENTED: Author details: ${res.params.id}`);
});

exports.author_create_get = asyncHandler(async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: Author create GET");
});

exports.author_create_post = asyncHandler(async (req, res, next) =>{
    // res.send("NOT IMPLEMENTED: Author create POST");
    try {
        const {firstName, familyName, date_of_birth, date_of_death} = req.body;

        if (!firstName || !familyName){
            res.status(400).json({error:"firstName and familyName are required"})
            return;
        }

        const author = new Author({
            firstName,
            familyName,
            date_of_birth,
            date_of_death
        });

        const savedAuthor = await author.save();
        res.status(201).json(savedAuthor);

    }

    catch(error){
        next(error);
    }
    
});

exports.author_delete_get = asyncHandler(async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: Author delete GET");
});

exports.author_delete_post = asyncHandler(async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: Author delete POST");
});

exports.author_update_get = asyncHandler(async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: Author update GET");
});

exports.author_update_post = asyncHandler(async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: Author update POST");
});
const Book = require("../models/book");

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: site home page");
});

exports.book_list = asyncHandler(async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: Book List");
});

exports.book_details = asyncHandler(async (req, res, next) =>{
    res.send(`NOT IMPLEMENTED: BOOK DETAILS: ${req.params.id}`);
});

exports.book_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMETED: Book create GET");
});

exports.book_create_post = asyncHandler(async (req, res, next)=>{
    res.send("NOT IMPLEMENTED: Book create POST")
});

exports.book_update_get = asyncHandler(async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: Book update GET");
});

exports.book_update_post = asyncHandler(async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: Book update POST");
});

exports.book_delete_get = asyncHandler(async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: Book delete GET");
});

exports.book_delete_post = asyncHandler(async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: Book detele POST");
});


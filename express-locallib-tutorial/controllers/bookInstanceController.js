const BookInstance = require("../models/bookinstance");

const asyncHandler = require("express-async-handler");

exports.bookinstance_list = asyncHandler(async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: BookInstance List");
});

exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Book Instance details: ${req.params.id}`);
});

exports.bookinstance_create_get = asyncHandler(async (req, res, next )=> {
    res.send("NOT IMPLEMENTED: bookInstance create GET");
});

exports.bookinstance_create_post = asyncHandler(async (req, res, next)=> {
    res.send("NOT IMPLEMENTED: bookInstance create POST");
});

exports.bookinstance_update_get = asyncHandler(async (req, res, next)=> {
    res.send("NOT IMPLEMENTED: bookInstance cupdate GET");
});

exports.bookinstance_update_post = asyncHandler(async (req, res, next)=> {
    res.send("NOT IMPLEMENTED: bookInstance update POST");
});

exports.bookinstance_delete_get = asyncHandler(async (req, res, next)=> {
    res.send("NOT IMPLEMENTED: bookInstance delete GET");
});

exports.bookinstance_delete_post = asyncHandler(async (req, res, next)=> {
    res.send("NOT IMPLEMENTED: bookInstance delete POST");
});
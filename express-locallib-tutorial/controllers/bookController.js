const Book = require("../models/book");
const BookInstance = require("../models/bookinstance")

const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: site home page");
});

exports.book_list = asyncHandler(async (req, res, next) =>{
    // res.send("NOT IMPLEMENTED: Book List");
    const book = await Book.find({}, "title author").sort({title: 1}).populate("author").exec();
    res.status(200).json(book);
});

exports.book_details = asyncHandler(async (req, res, next) =>{
    // res.send(`NOT IMPLEMENTED: BOOK DETAILS: ${req.params.id}`);
    const[book, bookinstance] = await Promise.all([
        Book.findById(req.params.id).populate("author").populate('genre').exec(),
        BookInstance.find({book:req.params.id}).exec(),
    ]);

    if(book === null){
        err = new error('Book not found');
        err.status(400);
        return next(err);
    };

    res.status(200).json({book, bookinstance});
});

exports.book_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMETED: Book create GET");
});

exports.book_create_post = asyncHandler(async (req, res, next)=>{
    // res.send("NOT IMPLEMENTED: Book create POST")
    try{
        const {title, author, summary, isbn, genre} = req.body;

        if(!title || !summary || !author || !isbn){
            res.status(400).json({error: "title, summary, author and isbn is required"});
        }

        const book = new Book({
            title,
            author,
            summary,
            isbn,
            genre
        });

        const savedBook = await book.save();
        res.status(201).json(savedBook);

    } catch(error){
        next(error);
    }
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


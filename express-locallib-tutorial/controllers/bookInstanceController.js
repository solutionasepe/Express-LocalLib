const BookInstance = require("../models/bookinstance");
const Book = require("../models/book");

const asyncHandler = require("express-async-handler");

exports.bookinstance_list = asyncHandler(async (req, res, next) =>{
    // res.send("NOT IMPLEMENTED: BookInstance List");
    const bookInstance = await BookInstance.find().exec();
    res.status(200).json(bookInstance);
});

exports.bookinstance_detail = asyncHandler(async (req, res, next) => {
    // res.send(`NOT IMPLEMENTED: Book Instance details: ${req.params.id}`);
    const bookInstance = await BookInstance.findById(req.params.id).populate("book").exec();
    
    if(bookInstance === null){
        const err = new Error("Book copy is not found");
        err.status = 400;
        return next(err);
    };

    res.status(200).json(bookInstance);
});

// exports.bookinstance_create_get = asyncHandler(async (req, res, next )=> {
//     res.send("NOT IMPLEMENTED: bookInstance create GET");
// });

exports.bookinstance_create_post = asyncHandler(async (req, res, next)=> {
    // res.send("NOT IMPLEMENTED: bookInstance create POST");
   
   try{
    const {book, imprint, status, due_back} = req.body;

    if(!book || !imprint || !status || due_back){
        res.status(401).json({error: "Book, Imprint, Status, due-back all needed"})
    };

    const bookInstance = new BookInstance({
        book,
        imprint,
        status,
        due_back
    });

    const savedbookInstance = await bookInstance.save();
    res.status(201).json(savedbookInstance)
   } catch(error){
    next(error)
   }
});

exports.bookinstance_update_get = asyncHandler(async (req, res, next)=> {
    // res.send("NOT IMPLEMENTED: bookInstance cupdate GET");
    try{
        const {book, imprint, status, due_back} = req.body;

    const bookInstance_update = await BookInstance.findByIdAndUpdate(
        req.params.id,
        {book, imprint, status, due_back},
        {new:true, runValidators:true}
    );

    if(!bookInstance_update){
        res.status(401).json({error:"Book instance is not available for update"})
    }

    res.status(201).json({message: "book instance update sucessful"}, bookInstance_update);
    } catch(error){
        next(error);
    }
    
});

// exports.bookinstance_update_post = asyncHandler(async (req, res, next)=> {
//     res.send("NOT IMPLEMENTED: bookInstance update POST");
// });

exports.bookinstance_delete_get = asyncHandler(async (req, res, next)=> {
    // res.send("NOT IMPLEMENTED: bookInstance delete GET");
    try{
        const Bookinstance = await BookInstance.findByIdAndDelete(req.params.id);
        
        if(!Bookinstance){
            res.status(404).json({error: "Book Instance does not exist"});
        };

        res.status(401).json({message:"BookInstance deleted"}, Bookinstance);
    }
    catch(error){
        next(error)
    }

    
});

// exports.bookinstance_delete_post = asyncHandler(async (req, res, next)=> {
//     res.send("NOT IMPLEMENTED: bookInstance delete POST");
// });
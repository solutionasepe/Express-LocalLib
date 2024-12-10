const Author = require("../models/author");
const Book = require("../models/book")

const asyncHandler = require("express-async-handler");
const { find } = require("../models/book");

exports.author_list = asyncHandler(async function(req, res, next){
    // res.send("NOT IMPLEMENTED: Author List");
    const allauthors = await Author.find().exec();
    // const allauthors = await Author.find({}, "firstName familyName");
    res.json(allauthors);

});

exports.author_detail = asyncHandler(async (req, res, next) =>{
    // res.send(`NOT IMPLEMENTED: Author details: ${res.params.id}`);
    const [author, allbooksbyauthor] = await Promise.all([
        Author.findById(req.params.id).exec(),
        Book.find({author: req.params.id}, "title summary").exec(),
    ]);
//     res.status(200).json({author:{
//         firstName: author.firstName,
//         familyName: author.familyName
//     },
//      allbooksbyauthor,
// });
        res.status(200).json([author.firstName, author.familyName, allbooksbyauthor]);
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
    // res.send("NOT IMPLEMENTED: Author delete GET");
    await Book.deleteMany({author:req.params.id});

    // res.status(200).json({message:"This author has been deleted "}, author_delete);

    // const books = await Book.find({ author: req.params.id });
    // if (books.length > 0) {
    //     return res.status(409).json({
    //         error: "Cannot delete author. There are books associated with this author.",
    //     });
    // }

    const author_delete = await Author.findByIdAndDelete(req.params.id);

    if(!author_delete){
        res.status(401).json({error:"author not found"});
    };

    // await author_delete.deleteOne();
    res.status(200).json({ message: "Author deleted successfully" }, author_delete);
    
});

exports.author_delete_post = asyncHandler(async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: Author delete POST");
});

exports.author_update_get = asyncHandler(async (req, res, next) =>{
    // res.send("NOT IMPLEMENTED: Author update GET");
    try{
        const {firstName, familyName, date_of_birth, date_of_death} = req.body;

        const author_update = await Author.findByIdAndUpdate(
            req.params.id,
            {firstName, familyName, date_of_birth, date_of_death},
            {new:true, runValidators:true}
        );
        
        if(!author_update){
            res.status(404).json({error: "Author not found"})
        };
    
        const savedAuthor = await author_update.save()
        res.status(201).json({message: "Author updated"}, savedAuthor)
    } catch(error){
        next(error)
    }
  
});

exports.author_update_post = asyncHandler(async (req, res, next) =>{
    res.send("NOT IMPLEMENTED: Author update POST");
});
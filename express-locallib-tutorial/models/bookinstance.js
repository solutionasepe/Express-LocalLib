const mongoose = require("mongoose");

const Schema = mongoose.Schema;

bookInstanceSchema = new Schema({
    book : {type: Schema.Types.ObjectId, ref: "Book", required: true},
    imprint : {type: String, required:true},
    status : {
        type: String,
        required: true,
        enum:["Available", "Maintenance", "Loaned", "Reserved"],
        default: "Maintenance",
    },
    due_back : {type: Date, default:Date.now},
});

bookInstanceSchema.virtual("url").get(function(){
    return `catalog/bookinstance/${this._id}`;
});

module.exports = mongoose.model("BookInstance", bookInstanceSchema)
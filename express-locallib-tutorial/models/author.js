const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    firstName : {type: String, required: true, maxlenght: 100},
    familyName : {type:String, required: true, maxlenght: 100},
    date_of_birth: {type: Date},
    date_of_birth: {type: Date}
});

//virtual for authors full name

AuthorSchema.virtual("name").get(function(){
    let fullName = "";
    if(this.firstName && this.familyName){
        fullName = `${this.firstName}, ${this.familyName}`;
    }

    return fullName;
});

AuthorSchema.virtual('url').get(function(){
    return `/catalog/author/${this._id}`
})

module.exports = mongoose.model("Author", AuthorSchema);
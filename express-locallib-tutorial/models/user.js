const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true, minlength:6},
    role:{type:String, required:true, enum:['user', 'admin'], default:'user'},
    createdAt:{type:Date, default:Date.now()},
    updatedAt: {type:Date}
});

userSchema.pre('save', function(next){
    this.updatedAt = Date.now()
    next();
});

module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types;

// split name into name, owner
// add default branch
let userSchema = new Schema({
    userName: {type:String, index: true},
    password: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    creationDate: {type: Date, default: Date.now },
    imageLink: {type: String, default: ""},
    contacts: [{type: ObjectId, ref: 'User'}]
});


let User = mongoose.model("User", userSchema);

module.exports = User;

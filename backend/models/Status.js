const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types;

// split name into name, owner
// add default branch
let statusSchema = new Schema({
    creator: {type: ObjectId, ref: 'User'},
    creationDate: {type: Date, default: Date.now },
    text: {type: String},
    imageLink: {type: String},
    seenBy: [{type: ObjectId, ref: 'User'}]
});


let Status = mongoose.model("Status", statusSchema);

module.exports = Status;

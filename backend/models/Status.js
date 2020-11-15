const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId, Mixed } = Schema.Types;

// split name into name, owner
// add default branch
let statusSchema = new Schema({
  creator: {type: ObjectId, ref: 'User'},
  creationDate: {type: Date, default: Date.now },
  text: {type: String},
  imageLink: {type: String, default: ""},
  seenBy: [{type: ObjectId, ref: 'User'}]
});

// statusSchema.statics.findAndModify = function (query, sort, doc, options) {
//   return this.collection.findAndModify(query, sort, doc, options);
// };
// statusSchema.statics.findAndModify = function (query, sort, doc, options) {
//   return new Promise((resolve, reject) => {
//     this.collection.findAndModify(query, sort, doc, options, (result) => {
//       resolve(result);
//     }, (error) => {
//       reject(error)
//     });
//   });
// };

let Status = mongoose.model("Status", statusSchema);

module.exports = Status;

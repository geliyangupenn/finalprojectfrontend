const Status = require('../models/Status');
const User = require('../models/User');
const mongoose = require('mongoose')
const { ObjectId } = mongoose.Types;

//helper method to validate a body/query param
checkValid = (item) => {
  if (item !== null && item !== undefined) {
      return true
  }
  return false
}

createStatus = async (req, res) => {
  const { creator, text, imageLink } = req.body;
  
  console.log("REQ.BODY", { creator, text, imageLink });
  if (!checkValid(creator) || !checkValid(text)) {
    return res.json({success: false, error: "createStatus Error: required body not provided"});
  }

  let status = new Status({ creator, text, imageLink })

  try {
    status = await status.save();
  } catch (err) {
    return res.json({success: false, error: "createStatus Error: save failed", trace: err});
  }

  console.log("CREATED STATUS", status);
  return res.json({success:true, result: status});
}

getStatuses = async (req, res) => {
  const { userId } = req.params;
  
  let statuses;

  try {
    let user = await User.findOne({_id: userId}).exec();
    const { contacts } = user;
    statuses = await Status.aggregate([
      { 
        $match: { 
          $and: [
            { creator: { $in : contacts } },
            { creator: { $ne: ObjectId(userId) } },
            { seenBy: { $nin: [ ObjectId(userId) ] } }, 
          ]
        }
      },
      { $sort:  { creationDate: -1 } },
      { $limit : 5 },
      {
        $lookup: {
          from: "users",
          localField: "creator",
          foreignField: "_id",
          as: "creator"
        }
      },
      { $unwind : "$creator" },
      {
        $project: {
          _id: 1,
          creationDate: 1,
          text: 1,
          imageLink: 1,
          seenBy: 1,
          "creator._id": 1,
          "creator.firstName": 1,
          "creator.lastName": 1,
          "creator.imageLink": 1,
        }
      },
    ]).exec();
  } catch (err) {
    return res.json({success: false, error: "getStatuses Error: findOne or aggregate query failed", trace: err});
  }
  
  return res.json({success:true, result: statuses});
}

seeStatuses = async (req, res) => {
  const { userId, statusIds } = req.body;
  console.log(statusIds);
  if (!checkValid(userId) || !checkValid(statusIds)) {
    return res.json({success: false, error: "seeStatuses Error: required body not provided"});
  }

  let statuses = [];
  let update = {};
  update.seenBy = ObjectId(userId);

  try {
    for (let i = 0; i < statusIds.length; i++) {
      statusId = statusIds[i];
      const s = await Status.findByIdAndUpdate(statusId, { $push: update }, { new: true }).lean().exec();
      statuses.push(s);
    }
  } catch (err) {
    return res.json({success: false, error: "seeStatuses Error: findOneAndUpdate failed", trace: err});
  }

  return res.json({success:true, result: statuses });
}


module.exports = { createStatus, getStatuses, seeStatuses }
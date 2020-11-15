const Status = require('../models/Status');
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
    statuses = await Status.aggregate([
      { 
        $match: { 
          $and: [
            { creator: { $ne: userId } },
            { seenBy: { $nin: [userId] } }, 
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
    return res.json({success: false, error: "getStatuses Error: find query failed", trace: err});
  }
  
  return res.json({success:true, result: statuses});
}


module.exports = { createStatus, getStatuses }
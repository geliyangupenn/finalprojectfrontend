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

createUser = async (req, res) => {
    const { userName, password, firstName, lastName } = req.body;

    console.log("REQ.BODY", { userName, password, firstName, lastName });
    if (!checkValid(userName) || !checkValid(password) || !checkValid(firstName) || !checkValid(lastName)) {
        return res.json({success: false, error: "createUser Error: required body not provided"});
    }
    
    let user = new User(
        {
            userName, 
            password,
            firstName,
            lastName
        },
    );

    try {
        user = await user.save();
    } catch (err) {
        return res.json({success: false, error: "createUser Error: save query failed", trace: err});
    }

    console.log("CREATED USER", user);
    return res.json({success: true, result: user});
}


getUser = async (req, res) => {
    const { userId } = req.params;
    
    let user;

    try {
        user = await User.findOne({_id: userId}).lean().populate('contacts').exec();
    } catch (err) {
        return res.json({success: false, error: "getUser Error: findOne query failed", trace: err});
    }

    return res.json({success:true, result: user});
}


editUser = async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName } = req.body;

    let update = {};
    if (checkValid(firstName)) update.firstName = firstName;
    if (checkValid(lastName)) update.lastName = lastName;

    let user;
    try {
        user = await User.findByIdAndUpdate(userId, { $set: update }, { new: true }).lean().populate('contacts').exec();
    } catch (err) {
        return res.json({success: false, error: "editUser Error: findByIdAndUpdate query failed", trace: err});
    }

    return res.json({success:true, result: user});
}


deleteUser = async (req, res) => {
    const { userId } = req.params;

    let user;

    try {
        user = await User.findByIdAndRemove(userId).lean().populate('contacts').exec();
    } catch (err) {
        return res.json({success: false, error: "deleteUser Error: findByIdAndRemove query failed", trace: err});
    }

    return res.json({success:true, result: user});
}


addUserContact = async (req, res) => {

    const userId = req.params;
    const { contactId } = req.body;
   
    let user;

    let update = {};
    update.contacts = ObjectId(contactId);

    // populate and select only whats needed -- tag and id
    let query = Document.findOneAndUpdate({_id: userId}, { $push: update }, { new: true }).lean();
    query.populate('contacts');

    try {
        user = await query.exec()
    } catch (err) {
        return res.json({ success: false, error: "addUserContact Error: mongodb query failed", trace: err });
    }
 
    return res.json({ success: true, result: user});

}


removeUserContact = async (req, res) => {

    const userId = req.params;
    const { contactId } = req.body;
   
    let user;

    let update = {};
    update.contacts = ObjectId(contactId);

    // populate and select only whats needed -- tag and id
    let query = Document.findOneAndUpdate({_id: userId}, { $pull: update }, { new: true }).lean();
    query.populate('contacts');

    try {
        user = await query.exec()
    } catch (err) {
        return res.json({ success: false, error: "addUserContact Error: mongodb query failed", trace: err });
    }
 
    return res.json({ success: true, result: user});

}

module.exports = { createUser, getUser, editUser, deleteUser, addUserContact, removeUserContact }
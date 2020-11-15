const express = require('express');
const router = express.Router();

//user Routes CRUD 
const userController = require('../controllers/UserController');
router.post('/users/create', userController.createUser);
router.get('/users/get/:userId', userController.getUser);
router.put('/users/edit/:userId', userController.editUser);
router.delete('/users/delete/:userId', userController.deleteUser);
router.put('/users/:userId/add_contact/:contactId', userController.addUserContact);
router.put('/users/:userId/remove_contact/:contactId', userController.removeUserContact);

const statusController = require('../controllers/StatusController');
router.post('/statuses/create', statusController.createStatus);
router.get('/statuses/get/:userId', statusController.getStatuses);
router.put('/statuses/see', statusController.seeStatuses);


module.exports = router;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const verifyToken = require('../../authentication/middlewares/auth.middleware')
const isAdmin = require('../../middlewares/isAdmin.middleware')

router.get('/allUsers', userController.getAllUsersController);
router.get('/otherUsers',userController.getOthersController);

router.post('/addUser',userController.addUserController)

module.exports = router;
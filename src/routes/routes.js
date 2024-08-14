const express = require('express');
const app = express();
const router = express.Router();

const homeController = require('../controllers/HomeController');
const userController = require('../controllers/UserController');

/** ROUTES WEB VIEWS */
router.get('/', homeController.index);

/** ROUTERS USERS API */
router.post('/user', userController.registerUser);
router.get('/user', userController.listUsers);
router.post('/user/email', userController.user);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);


module.exports = router;
const express = require('express');
const app = express();
const router = express.Router();

const homeController = require('../controllers/HomeController');
const userController = require('../controllers/UserController');
const { route } = require('../app');

/** ROUTES WEB VIEWS */
router.get('/', homeController.index);

/** ROUTERS USERS API */
router.post('/user', validateUser, userController.registerUser);
router.get('/user', userController.listUsers);
router.post('/user/email', userController.user);
router.put('/user/:id', validateUser, userController.updateUser);
router.delete('/user/:id', userController.deleteUser);


module.exports = router;
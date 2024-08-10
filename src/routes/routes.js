const express = require('express');
const app = express();
const router = express.Router();

const homeController = require('../controllers/HomeController');
const userController = require('../controllers/UserController');

/** ROUTES WEB VIEWS */
router.get('/', homeController.index);

router.post('/user', userController.registerUser);

module.exports = router;
const express = require('express');
const app = express();
const router = express.Router();

const homeController = require('../controllers/HomeController');

/** ROUTES WEB VIEWS */
router.get('/', homeController.index);

module.exports = router;
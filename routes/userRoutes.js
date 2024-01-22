const express=require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/info',authMiddleware,roleMiddleware("user"), userController.getUserInfo);

module.exports=router;
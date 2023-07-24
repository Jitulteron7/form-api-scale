const express = require('express');
const router = express.Router();
const { UserController } = require('../controllers/user.controller');

const user = new UserController();

//post
router.post('/create', user.core.createUser);
router.post('/createForm', user.core.createForm);
// router.post('/saveResponse', user.core.saveResponse);

//get
router.get('/get', user.core.getUsers);
router.get('/getForm', user.core.getForms);
// router.get('/getResponse', user.core.getResponse);

module.exports = router;

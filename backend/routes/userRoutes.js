const express = require('express');
const authenticateUser = require("../controllers/authenticationControllers");

const router = express.Router();

router.post("/signup",authenticateUser.signUp);

module.exports = router;

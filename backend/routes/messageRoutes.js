const express = require('express');
const messageControl = require("../controllers/messageController");
const authenticate = require("../middlewares/authenticate")

const router = express.Router();


router.post("/messages",authenticate,messageControl.postMessage);
router.get("/messages",authenticate,messageControl.getMessages);
module.exports = router;
const express = require('express');
const messageControl = require("../controllers/messageController");
const authenticate = require("../middlewares/authenticate")

const router = express.Router();

router.get("/messages",authenticate,messageControl.getMessages);
router.post("/messages",authenticate,messageControl.postMessage);

module.exports = router;
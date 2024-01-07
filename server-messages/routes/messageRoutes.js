const express = require("express");
const router = express.Router();
const {
  sendWhatsAppMessage,
  sendMessageWithImage,
  messaging,
  sendTextMessage,
  verifyToken,
  receiveMessage,
} = require("../controller/messageController");

router.get("/", verifyToken);
router.post("/receive", receiveMessage);
router.post("/sendMessage", sendTextMessage);
router.post("/sendImage", sendMessageWithImage);

module.exports = router;

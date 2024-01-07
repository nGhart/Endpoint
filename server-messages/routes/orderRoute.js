const express = require("express");
const { createOrder, getAllOrders } = require("../controller/orderController");
const validatePhoneNumber = require("../helpers/validateNumber");
const router = express.Router();

router.post("/create", validatePhoneNumber, createOrder);
router.get("/", getAllOrders);

module.exports = router;

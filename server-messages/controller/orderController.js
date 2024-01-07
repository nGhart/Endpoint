const validatePhoneNumber = require("../helpers/validateNumber");
const Order = require("../models/orderModel");
const {
  sendWhatsAppMessage,
  sendMessageWithImage,
} = require("./messageController");

const getAllOrders = async (req, res) => {
  try {
    let orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    let { name, contact, purchase, total } = req.body;

    await validatePhoneNumber(req, res, () => {});

    const correctedNumber = req.body.correctNumber;

    let newOrder = await Order.create({
      name,
      purchase,
      total,
      contact: correctedNumber,
    });

    if (!newOrder) {
      res.status(500).json({ msg: "Failed to create order" });
      return;
    }

    res.json({ msg: "Order added", newOrder });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
};

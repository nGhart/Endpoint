const validatePhoneNumber = (req, res, next) => {
  try {
    let number = req.body.contact;

    number = number.replace(/\s/g, "");

    if (number.startsWith("233")) {
      req.body.correctNumber = number;
    } else if (number.startsWith("+233")) {
      req.body.correctNumber = number.substring(1);
    } else if (number.startsWith("0") && number.length === 10) {
      req.body.correctNumber = "233" + number.substring(1);
    } else {
      throw new Error("Invalid phone number format");
    }

    next();
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = validatePhoneNumber;

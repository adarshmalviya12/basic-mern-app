const Contact = require("../models/Contact-model");

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Message failed to be sent" });
  }
};

module.exports = contactForm;

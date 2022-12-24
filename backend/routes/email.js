const express = require("express");
const router = express.Router();

const { sendEmail } = require("../controllers/sendemailController");

router.route("/sendemail").post(sendEmail);

module.exports = router;

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const validator = require("validator");
const sendEmail = require("../utils/sendEmail");

exports.sendEmail = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body);
  const { email, subject, message } = req.body;

  // Checks if email, subject and message is entered by user
  if (!email || !subject || !message) {
    return next(
      new ErrorHandler("Please enter email, subject, & message", 400)
    );
  }

  //Checks if email is valid
  if (!validator.isEmail(email)) {
    return next(new ErrorHandler("Please enter a valid Email", 400));
  }

  // send email
  try {
    await sendEmail({
      email: email,
      subject: subject,
      message: message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent successfully to: ${email}`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

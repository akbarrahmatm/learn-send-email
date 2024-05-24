const ApiError = require("../utils/apiError");
const nodemailer = require("nodemailer");

const sendEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.APP_EMAIL_ADDRESS,
        pass: process.env.APP_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: {
        name: "Airseat Email System",
        address: process.env.APP_EMAIL_ADDRESS,
      },
      to: email, // list of receivers
      subject: "[No Reply] - Testing ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    };

    const send = await transporter.sendMail(mailOptions);

    if (send) {
      res.status(200).json({
        status: "Success",
        message: "Email successfully sent",
        requestAt: req.requestTime,
      });
    } else {
      return next(new ApiError("Unexpected Error", 400));
    }
  } catch (err) {
    return next(new ApiError(err.message, 400));
  }
};

module.exports = {
  sendEmail,
};

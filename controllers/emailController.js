const ApiError = require("../utils/apiError");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

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

    const token = 123456;

    const template = await ejs.renderFile(
      path.join(__dirname, "../templates/register.ejs"),
      {
        receiver: "Akbar Rahmat Mulyatama",
        token: token,
      }
    );

    const templateLogin = await ejs.renderFile(
      path.join(__dirname, "../templates/login.ejs"),
      {
        receiver: "Akbar Rahmat Mulyatama",
        token: token,
      }
    );

    if (!template) {
      return next(new ApiError("Error template email", 400));
    }

    const mailOptions = {
      from: {
        name: "Airseat Email System",
        address: process.env.APP_EMAIL_ADDRESS,
      },
      to: email, // list of receivers
      subject: "[No Reply] - Testing ✔", // Subject line
      html: templateLogin, // html body
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

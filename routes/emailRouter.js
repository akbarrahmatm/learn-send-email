const router = require("express").Router();

const emailController = require("../controllers/emailController");

router.post("/send", emailController.sendEmail);

module.exports = router;

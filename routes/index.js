const router = require("express").Router();

/*
    Import other routers here, for example:
    const authRouter = require("./authRouter");
*/
const emailRouter = require("./emailRouter");

/*
    Define other routes here, for example:
    router.use("/api/v1/auth", authRouter);
*/

router.use("/api/v1/email", emailRouter);

module.exports = router;

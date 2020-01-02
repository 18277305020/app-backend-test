const express = require("express");
const router = express.Router();

const {getAll, del, create, update, login} = require('../controller/MemberController');
const {sendSMSCode, resolveSMSCode} = require('../middleware/SMS')
const {ensureAuthenticated} = require('../middleware/AuthenticatedMiddleware')
const {role} = require('../middleware/Authority')

router.get('/sms/send', sendSMSCode)

router.post("/login", resolveSMSCode, login)

router.post("/list", ensureAuthenticated, role, getAll)
//router.post("/list", getAll)

router.post("/create", resolveSMSCode, create)

router.get("/remove", ensureAuthenticated, role, del)
//router.get("/remove", del)

router.post("/update", ensureAuthenticated, role, update)

router.post("/xxx", (req, res) => {
    return res.status(200).json({
        message: "121131232123",
    });
})


module.exports = router;

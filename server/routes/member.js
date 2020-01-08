const express = require("express");
const router = express.Router();

const {getAll, del, create, update, login, add, list} = require('../controller/MemberController');
const {sendSMSCode, resolveSMSCode} = require('../middleware/SMS')
const {ensureAuthenticated} = require('../middleware/AuthenticatedMiddleware')
const {role} = require('../middleware/Authority')

router.get('/sms/send', sendSMSCode)

//验证短信
//router.post("/login", resolveSMSCode, login)
router.post("/login", login)

router.post("/list", ensureAuthenticated, role, getAll)

router.post("/listAll", ensureAuthenticated, role, list)

router.post("/create", resolveSMSCode, create)

router.post("/add", add)

router.get("/remove", ensureAuthenticated, role, del)

router.post("/update", ensureAuthenticated, role, update)

module.exports = router;

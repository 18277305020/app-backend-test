const express = require("express");
const router = express.Router();

const {getAll, del, update, add, list} = require('../controller/DepartmentController');
const {ensureAuthenticated} = require('../middleware/AuthenticatedMiddleware')
const {role} = require('../middleware/Authority')

router.post("/list", ensureAuthenticated, role, getAll)

router.post("/listAll", ensureAuthenticated, role, list)

router.post("/add", add)

router.get("/remove", ensureAuthenticated, role, del)

router.post("/update", ensureAuthenticated, role, update)

module.exports = router;

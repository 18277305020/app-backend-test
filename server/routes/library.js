const express = require("express");
const router = express.Router();

const {getAll, create} = require('../controller/LibraryController');

router.post("/list", getAll)

router.get("/create", create)

module.exports = router;

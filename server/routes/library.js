const express = require("express");
const router = express.Router();

const {getAll, create, createSone, findSone} = require('../controller/LibraryController');

router.post("/list", getAll)

router.get("/create", create)

//歌手
router.get('/createSong', createSone)

router.post('/findSone', findSone)


module.exports = router;

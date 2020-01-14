const express = require("express");
const router = express.Router();

const {getAll, create, createSone, findSone, add} = require('../controller/LibraryController');

router.post("/list", getAll)

router.get("/create", create)

//歌手
router.get('/createSong', createSone)

router.post('/findSone', findSone)

router.post('/add', add)


module.exports = router;

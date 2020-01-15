const express = require("express");
const router = express.Router();

const {getAll, create, createSone, findSone, add, list, findSoneAll, createSingerAdmin, getLibraryFindSelectAll} = require('../controller/LibraryController');

//曲库
router.post("/list", getAll)

router.get("/getLibraryFindSelectAll", getLibraryFindSelectAll)

router.post("/listMusic", list)

router.get("/create", create)

//歌手
router.get('/createSong', createSone)

router.post('/findSone', findSone)

router.post('/findSoneAll', findSoneAll)

router.post('/createSingerAdmin', createSingerAdmin)

router.post('/add', add)


module.exports = router;

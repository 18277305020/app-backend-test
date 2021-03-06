const Logger = require("../lib/Logger");
const {findAllLibrary, getTotal, getSingerTotal, createLibrary, createSinger, findSinger, addIncrease, findSingerAll} = require("../model/LibraryModel");
const {findLibrary, getLibraryFindSelect} = require("../model/LibraryModel");
const fs = require('fs')
const path = require("path");
const xlsx = require('node-xlsx')

//过滤（导出）生成表格
const getLibraryFindSelectAllExcel = async (req, res) => {
    const results = await getLibraryFindSelect();
    let datas = []
    let title = ['音乐编号', '音乐名称', '歌手', '所属分类', '选择次数']
    datas.push(title)

    for (let n = 0; n < results.length; n++) {
        let key = [`${results[n].sid}`,`${results[n].name}`,`${results[n].writer}`,`${results[n].type}`,`${results[n].select}`]
        datas.push(key)
    }
    let buffer = xlsx.build([
        {
            name: '已选择歌曲列表',
            data: datas
        }
    ]);
    fs.writeFileSync(path.join(__dirname, '../../test/test.xlsx'), buffer, {'flag': 'w'});
}

//过滤（查询）
const getLibraryFindSelectAll = async (req, res) => {
    try {
        const results = await getLibraryFindSelect();
        return res.status(200).json({
            data: results,
            message: "success",
            code: 0
        });
    } catch (e) {
        Logger.error("GetAllThanksgiving error", e.message);
        return res.status(500).json({
            message: 'Internal server error.',
            code: 1
        });
    }
}

//查询
const getAll = async (req, res) => {
    let params = {...req.body}
    // let {size, page, ...params} = req.body
    // if (!size) size = 10
    // if (!page) page = 1
    // if (!params.query) params.query = {}
    try {
        //const results = await findAllLibrary(params.query, page, size);
        const results = await findLibrary(params);
        //const total = await getTotal(params.query)
        return res.status(200).json({
            data: results,
            message: "success",
            code: 0
        });
    } catch (e) {
        Logger.error("GetAllThanksgiving error", e.message);
        return res.status(500).json({
            message: 'Internal server error.',
            code: 1
        });
    }
}

//查询（分页）
const list = async (req, res) => {
    let {size, page, ...params} = req.body
    if (!size) size = 10
    if (!page) page = 1
    if (!params.query) params.query = {}
    try {
        const results = await findAllLibrary(params.query, page, size);
        const total = await getTotal(params.query)
        return res.status(200).json({
            total: Number(total[0].count),
            page,
            size,
            data: results,
            message: "success",
            code: 0
        });
    } catch (e) {
        Logger.error("GetAllThanksgiving error", e.message);
        return res.status(500).json({
            message: 'Internal server error.',
            code: 1
        });
    }
}

//导入曲库
const create = async (req, res) => {
    let files = fs.readdirSync(path.join(__dirname, `../../LibraryFile`))
    for (let n = 0; 0 < files.length - 1; n++) {
        let obj = xlsx.parse(path.join(__dirname, `../../LibraryFile/${files[n]}`));
        let list = obj[0].data
        let type = obj[0].name
        for (let i = 1; i < list.length; i++) {
            let score = list[i][3] === '有' ? 1 : 0
            let accompany = list[i][4] === '有' ? 1 : 0
            let original = list[i][5] === '有' ? 1 : 0
            let lyrics = list[i][6] === '有' ? 1 : 0
            let result = await createLibrary({
                sid: list[i][0],
                writer: list[i][1],
                name: list[i][2],
                type: type,
                lyrics: lyrics,
                score: score,
                accompany: accompany,
                original: original,
                album: null,
                status: 1,
                select: 0,
                information: null,
                create_id: null,
            })
            if (result) {
                console.log(n + '---' + i)
            }
        }
    }
}

//导入歌手
const createSone = async (req, res) => {
    let files = fs.readdirSync(path.join(__dirname, `../../song`))
    for (let n = 0; 0 < files.length - 1; n++) {
        let obj = xlsx.parse(path.join(__dirname, `../../song/${files[n]}`));
        let list = obj[0].data
        let type = obj[0].name
        for (let i = 1; i < list.length; i++) {
            if (list[i].length > 0) {
                let result = await createSinger({
                    name: list[i][0],
                    sex: null,
                    age: null,
                    status: null,
                    information: type,
                    create_id: null,
                })
                if (result) {
                    console.log(n + '---' + i)
                }
            }
        }
    }
}

//歌手列表
const findSone = async (req, res) => {
    let params = {...req.body}
    let data = await findSinger(params)
    return res.status(200).json({
        data: data,
        message: "success",
        code: 0
    });
}

//查询歌手（分页）
const findSoneAll = async (req, res) => {
    let {size, page, ...params} = req.body
    if (!size) size = 10
    if (!page) page = 1
    if (!params.query) params.query = {}
    try {
        const results = await findSingerAll(params.query, page, size);
        const total = await getSingerTotal(params.query)
        return res.status(200).json({
            total: Number(total[0].count),
            page,
            size,
            data: results,
            message: "success",
            code: 0
        });
    } catch (e) {
        Logger.error("GetAllThanksgiving error", e.message);
        return res.status(500).json({
            message: 'Internal server error.',
            code: 1
        });
    }
}

//添加歌手（admin）
const createSingerAdmin = async (req, res) => {
    const params = {...req.body}
    try {
        const result = await findSinger({name: params.name});
        if (result.length > 0) {
            return res.status(200).json({
                message: '该歌手已存在',
                code: 1
            });
        }
        const data = await createSinger(params);
        return res.status(200).json({
            data: {
                data
            },
            code: 0,
            message: "添加成功"
        })
    } catch (e) {
        Logger.error('register', e);
        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

//添加选择
const add = async (req, res) => {
    let params = {...req.body}
    let data = await addIncrease(params)
    return res.status(200).json({
        data: data,
        message: "success",
        code: 0
    });
}


module.exports = {
    getAll,
    create,
    createSone,
    findSone,
    add,
    list,
    findSoneAll,
    createSingerAdmin,
    getLibraryFindSelectAll,
    getLibraryFindSelectAllExcel
};

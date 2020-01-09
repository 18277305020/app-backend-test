const Logger = require("../lib/Logger");
const {findAllDepartment, findDepartment, createDepartment, delDepartment, editDepartment, getTotal} = require("../model/DepartmentModel");
const {findMember} = require("../model/MemberModel");

//添加（admin）
const add = async (req, res) => {
    const params = {...req.body}
    try {
        const result = await findDepartment({number: params.number});
        if (result.length > 0) {
            return res.status(200).json({
                message: '该系号已存在',
                code: 1
            });
        }
        const data = await createDepartment(params);

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

//更改
const update = async (req, res) => {
    const {did, ...params} = req.body
    const result = await editDepartment({did: did}, params);
    return res.status(200).json({
        data: {
            ...result[0]
        },
        message: "修改成功",
        code: 0
    });
}

const list = async (req, res) => {
    const params = {...req.body}
    const result = await findDepartment(params)
    return res.status(200).json({
        code: 0,
        result,
        message: '查询成功'
    })
}

//查询（分页）
const getAll = async (req, res) => {
    let {size, page, ...params} = req.body
    if (!size) size = 10
    if (!page) page = 1
    if (!params.query) params.query = {}

    try {
        const results = await findAllDepartment(params.query, page, size);

        // results.forEach(async item => {
        //     let host = await findMember({mid: item.host_mid})
        //     item.host_info = host[0]
        // })
        //
        // results.forEach(async item => {
        //     let create = await findMember({mid: item.create_mid})
        //     item.create_info = create[0]
        // })
        //TODO 延迟等待
        const total = await getTotal(params.query)
        return res.status(200).json({
            page,
            size,
            total: Number(total[0].count),
            data: results,
            message: "success",
            code: 0
        });
        // setTimeout(() => {
        //     return res.status(200).json({
        //         page,
        //         size,
        //         total: Number(total[0].count),
        //         data: results,
        //         message: "success",
        //         code: 0
        //     });
        // }, 1000)
    } catch (e) {
        Logger.error("GetAllThanksgiving error", e.message);
        return res.status(500).json({
            message: 'Internal server error.',
            code: 1
        });
    }
}

//删除
const del = async (req, res) => {
    //let result = await delDepartment({did: req.headers.user_id.id})
    const id = req.query.did
    //let result = await delDepartment({did: req.headers.user_id.id})
    let result = await delDepartment({did: id})
    return res.status(200).json({
        code: 0,
        result,
        message: '删除成功'
    })
}


module.exports = {
    update,
    getAll,
    del,
    add,
    list
};

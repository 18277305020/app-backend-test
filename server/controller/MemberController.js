const Logger = require("../lib/Logger");
const CryptUtil = require("../lib/CryptUtil");
const {rule} = require('../lib/Rule')
const [CREATE] = require('../lib/ruleData/member')
const {findAllMember, findMember, createMember, delMember, editMember, getTotal} = require("../model/MemberModel");

//注册
const create = async (req, res) => {
    const params = {...req.body}
    const result = await rule(params, CREATE)
    if (!result.sw) {
        return res.status(200).json({
            message: result.message,
            code: 1
        });
    }

    delete params.sms

    try {
        const result = await findMember(params);
        if (result.length > 0) {
            return res.status(200).json({
                message: '用户已注册',
                code: 1
            });
        }
        const data = await createMember(params);

        return res.status(200).json({
            data: {
                data
            },
            code: 0,
            message: "发布成功"
        })
    } catch (e) {
        Logger.error('register', e);
        return res.status(500).json({
            message: 'Internal server error.'
        });
    }
}

//登录
const login = async (req, res) => {
    const params = {...req.body}
    try {
        //查询电话号码是否存在
        const result = await findMember({phone: params.phone});
        if (!result[0]) {
            return res.status(200).json({
                message: '用户未注册',
                code: 1
            });
        }

        //创建token
        const token = CryptUtil.encodeToken(result[0]);

        return res.status(200).json({
            data: {
                token: token,
                result,
            },
            message: '登陆成功',
            code: 0
        });
    } catch (e) {
        Logger.error("login", e.message);
        return res.status(500).json({
            message: 'Internal server error.',
            code: 1
        });
    }
}

//更改
const update = async (req, res) => {
    const {mid, ...params} = req.body
    const result = await editMember({mid: mid}, params);

    return res.status(200).json({
        data: {
            ...result[0]
        },
        message: "修改成功",
        code: 0
    });
}

//查询（分页）
const getAll = async (req, res) => {
    let {size, page, ...params} = req.body
    if (!size) size = 10
    if (!page) page = 1
    if (!params.query) params.query = {}

    try {
        const results = await findAllMember(params.query, page, size);
        const total = await getTotal(params.query)
        return res.status(200).json({
            page,
            size,
            total: Number(total[0].count),
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

//删除
const del = async (req, res) => {
    //let result = await delMember({mid: req.headers.user_id.id})
    const id = req.query.mid
    //let result = await delMember({mid: req.headers.user_id.id})
    let result = await delMember({mid: id})
    return res.status(200).json({
        code: 0,
        result,
        message: '删除成功'
    })
}


module.exports = {
    create,
    login,
    update,
    getAll,
    del,
};

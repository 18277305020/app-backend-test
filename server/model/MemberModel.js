const table = "member";
const {all, find, del, edit, create, total} = require('../db/DBUtil');

//TODO 查询(分页)
const findAllMember = (params, page, size) => {
    return all(table, params, page, size);
}

//TODO 查询
const findMember = params => {
    return find(table, params);
}

//TODO 创建
const createMember = params => {
    return create(table, params)
}

//TODO 删除
const delMember = async params => {
    return del(table, params)
}

//TODO 修改
const editMember = async (id, params) => {
    return await edit(table, id, params);
}

//TODO 数量
const getTotal = async params => {
    return await total(table, params);
}

module.exports = {
    findAllMember,
    findMember,
    createMember,
    delMember,
    editMember,
    getTotal
};


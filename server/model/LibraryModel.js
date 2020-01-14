const table = "library";
const {all, find, del, edit, create, total} = require('../db/DBUtil');

//TODO 查询(分页)
const findAllLibrary = (params, page, size) => {
    return all(table, params, page, size);
}

//TODO 查询
const findLibrary = params => {
    return find(table, params);
}

//TODO 创建
const createLibrary = params => {
    return create(table, params)
}

//TODO 删除
const delLibrary = async params => {
    return del(table, params)
}

//TODO 修改
const editLibrary = async (id, params) => {
    return await edit(table, id, params);
}

//TODO 数量
const getTotal = async params => {
    return await total(table, params);
}

module.exports = {
    findAllLibrary,
    findLibrary,
    createLibrary,
    delLibrary,
    editLibrary,
    getTotal
};


const table = "department";
const {all, find, del, edit, create, total} = require('../db/DBUtil');

//TODO 查询(分页)
const findAllDepartment = (params, page, size) => {
    return all(table, params, page, size);
}

//TODO 查询
const findDepartment = params => {
    return find(table, params);
}

//TODO 创建
const createDepartment = params => {
    return create(table, params)
}

//TODO 删除
const delDepartment = async params => {
    return del(table, params)
}

//TODO 修改
const editDepartment = async (id, params) => {
    return await edit(table, id, params);
}

//TODO 数量
const getTotal = async params => {
    return await total(table, params);
}

module.exports = {
    findAllDepartment,
    findDepartment,
    createDepartment,
    delDepartment,
    editDepartment,
    getTotal
};


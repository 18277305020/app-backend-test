const table = "library";
const {all, find, del, edit, create, total, increase} = require('../db/DBUtil');

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

//TODO 创建歌手
const createSinger = async params => {
    return await create('singer', params);
}

//TODO 歌手列表
const findSinger = async params => {
    return await find('singer', params);
}

//增加
const addIncrease = async params => {
    return await increase(table, params,'select');
}


module.exports = {
    findAllLibrary,
    findLibrary,
    createLibrary,
    delLibrary,
    editLibrary,
    getTotal,
    createSinger,
    findSinger,
    addIncrease
};


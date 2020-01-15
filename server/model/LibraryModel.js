const table = "library";
const {all, find, del, edit, create, total, increase, LibraryAll, LibraryFindSelect} = require('../db/DBUtil');

//TODO 查询(分页)
const findAllLibrary = (params, page, size) => {
    return LibraryAll(table, params, page, size);
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

//TODO 歌手列表(分页)
const findSingerAll = async (params, page, size) => {
    return await all('singer', params, page, size);
}

//TODO 歌手数量
const getSingerTotal = async params => {
    return await total('singer', params);
}

//增加
const addIncrease = async params => {
    return await increase(table, params, 'select');
}

//TODO 查询
const getLibraryFindSelect = _ => {
    return LibraryFindSelect(table);
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
    addIncrease,
    findSingerAll,
    getSingerTotal,
    getLibraryFindSelect
};


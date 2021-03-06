const knex = require("./connection");

//TODO 查询全部(分页)
const all = (table, params, page, size) => {
    return knex(table).where(params).limit(size).offset((page - 1) * size)
    // .orderBy([
    //     {column: 'family'}
    // ])
}

//TODO 查询全部
const find = (table, params) => {
    return knex(table).where(params)
}

//TODO 创建
const create = (table, params) => {
    return knex(table).insert(params).returning("*");
}

//TODO 删除
const del = (table, params) => {
    return knex(table).where(params).del()
}

//TODO 更新
const edit = (table, params, content) => {
    return knex(table).where(params).update(content)
}

//TODO 总数
const total = (table, params) => {
    return knex(table).where(params).count();
}

function increase(table, condition, key) {
    return knex(table).where(condition).increment(key, 1)
}

function decrease(table, condition, key) {
    return knex(table).where(condition).decrement(key, 1)
}

//TODO 查询曲库排序(分页)
const LibraryAll = (table, params, page, size) => {
    return knex(table).where(params).limit(size).offset((page - 1) * size)
        .orderBy([
            {column: 'select', order: 'desc'}
        ])
}

//TODO 查询全部(过滤)
const LibraryFindSelect = (table) => {
    return knex(table).where('select', '>', 0).orderBy([
        {column: 'select', order: 'desc'}
    ])
}


module.exports = {
    all,
    find,
    create,
    del,
    edit,
    total,
    increase,
    decrease,
    LibraryAll,
    LibraryFindSelect
}

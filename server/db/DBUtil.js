const knex = require("./connection");

//TODO 查询全部(分页)
const all = (table, params, page, size) => {
    return knex(table).where(params).limit(size).offset((page - 1) * size)
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


module.exports = {
    all,
    find,
    create,
    del,
    edit,
    total
}

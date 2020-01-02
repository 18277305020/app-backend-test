const roles = require('../lib/Roles')
const {findMember} = require("../model/MemberModel");

const role = async (req, res, next) => {
    const result = await findMember({mid: req.headers.user_id.id})
    const phone = result[0].phone
    if (roles.supperAdmin.indexOf(phone) > -1) {
        return next()
    } else {
        return res.status(200).json({
            message: '您无权访问',
            code: 1
        });
    }
}

module.exports = {role}
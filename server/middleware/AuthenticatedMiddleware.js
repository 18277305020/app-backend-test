const Logger = require("../lib/Logger");
const CryptUtil = require("../lib/CryptUtil");

const {findMember} = require('../model/MemberModel');

//解析token
const ensureAuthenticated = async (req, res, next) => {
    //报错信息
    Logger.debug("Authenticated", req.headers.authorization);

    if (!(req.headers && req.headers.authorization)) {
        return res.status(401).json({
            message: "authorization token is required.",
            code: 1010
        });
    }
    const token = _getTokenFromHeaders(req.headers);
    try {
        req.headers.user_id = CryptUtil.decodeToken(token)
        await next()
    } catch (e) {
        return res.status(401).json({
            code: 1010,
            message: 'Token已过期'
        });
    }
}

//拆解请求头
function _getTokenFromHeaders(headers) {
    if (headers.authorization.startsWith("Beare")) {
        return headers.authorization.split(" ")[1];
    }
    return headers.authorization
}


module.exports = {
    ensureAuthenticated
};

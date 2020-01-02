const moment = require("moment");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");


/**
 * encode user to token
 *
 * @param {*} user {id:1, role:'investor'}
 * @returns
 */
function encodeToken(member) {
    const payload = {
        exp: moment().add(14, "days").unix(),
        id: member.mid,
    };
    return jwt.encode(payload, process.env.TOKEN_SECRET, null, null);
}

function encodeTokenByMember(member) {
    console.log(member)
    const payload = {
        exp: moment().add(14, "days").unix(),
        id: member.mid,
    };
    return jwt.encode(payload, process.env.TOKEN_SECRET, null, null);
}

/**
 * decode token to user
 *
 * @param {*} token
 * @returns user {id:1, role:'investor', exp: 1234566789}
 */
function decodeToken(token) {
    const payload = jwt.decode(token, process.env.TOKEN_SECRET, null, null);
    const now = moment().unix();
    // check if the token has expired
    if (now > payload.exp) throw Error("Token has expired.");
    else return payload;
}


/**
 * encode password
 *
 * @param {*} password
 * @returns hashcode
 */
function encodePassword(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
}


/**
 * campare with database password
 *
 * @param {*} userPassword
 * @param {*} databasePassword
 * @returns true/false
 */
function comparePassword(userPassword, databasePassword) {
    return bcrypt.compareSync(userPassword, databasePassword);
}

function genVerificaitonCode(count) {

    const all = "0123456789";
    let b = "";
    for (let i = 0; i < count; i++) {
        let index = Math.floor(Math.random() * 17);
        b += all.charAt(index % 10);

    }
    return b;
}

module.exports = {
    encodeToken,
    decodeToken,
    encodePassword,
    comparePassword,
    genVerificaitonCode,
    encodeTokenByMember
};

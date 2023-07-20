//生成token
const jwt = require("jsonwebtoken");
//密码加密
const crypto = require("crypto");
//定义公共秘钥
const SECRET = "LY";

/**
 * @description: 生成token
 * @param {user:用户信息（object）,time:token有效时间（string 单位(s|m|h) ）}
 * @return {token}
 */
const createToken = (user, time) => {
  return jwt.sign(user, SECRET, { expiresIn: time });
};

/**
 * @description: 密码加密
 * @param {password:密码}
 * @return {加密字符串}
 */
const md5 = (password) => {
  return crypto
    .createHash("md5")
    .update(`password=${password}&SECRET=${SECRET}`)
    .digest("hex");
};

/**
 * @description:验证token
 * @param {token:token,SECRET:秘钥}
 * @return {解密后用户信息}
 */
const veriftyToken = (token, SECRET) => {
  return jwt.verify(token, SECRET);
};
module.exports = {
  createToken,
  md5,
  veriftyToken,
};

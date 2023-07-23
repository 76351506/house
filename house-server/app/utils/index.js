/*
 * @Author: heinan
 * @Date: 2023-07-23 22:55:13
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 00:59:33
 */
const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { PASSWORD_SECRET, TOKEN_SECRET } = require("../config");

/**
 * @description: 生成token
 * @param {user:用户信息（object）,time:token有效时间（string 单位(s|m|h) ）}
 * @return {token}
 */
const tokenCreator = (id, exp) => {
  return jsonwebtoken.sign(
    {
      id,
      signTime: new Date().getTime(),
    },
    TOKEN_SECRET,
    { expiresIn: exp }
  );
};
/**
 * @description:验证token
 * @param {token:token,SECRET:秘钥}
 * @return {解密后用户信息}
 */
const veriftyToken = (token) => {
  return jsonwebtoken.verify(token, TOKEN_SECRET);
};

/**
 * @description: 密码加密
 * @param {password:密码}
 * @return {加密字符串}
 */
const passwordCreator = (password) => {
  return crypto
    .createHash("md5")
    .update(`password=${password}&SECRET=${PASSWORD_SECRET}`)
    .digest("hex");
};

const idCreator = () => {
  return uuidv4();
};

module.exports = {
  idCreator,
  tokenCreator,
  passwordCreator,
  veriftyToken,
};

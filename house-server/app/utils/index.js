/*
 * @Author: heinan
 * @Date: 2023-07-23 22:55:13
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-23 22:59:36
 */
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { PASSWORD_SECRET, TOKEN_SECRET } = require("../config");

/**
 * @description: 生成token
 * @param {user:用户信息（object）,time:token有效时间（string 单位(s|m|h) ）}
 * @return {token}
 */
const createToken = (user, time) => {
  return jwt.sign(user, TOKEN_SECRET, { expiresIn: time });
};

/**
 * @description: 密码加密
 * @param {password:密码}
 * @return {加密字符串}
 */
const md5 = (password) => {
  return crypto
    .createHash("md5")
    .update(`password=${password}&SECRET=${PASSWORD_SECRET}`)
    .digest("hex");
};

/**
 * @description:验证token
 * @param {token:token,SECRET:秘钥}
 * @return {解密后用户信息}
 */
const veriftyToken = (token) => {
  return jwt.verify(token, TOKEN_SECRET);
};

module.exports = {
  createToken,
  md5,
  veriftyToken,
};

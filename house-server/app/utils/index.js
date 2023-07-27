/*
 * @Author: heinan
 * @Date: 2023-07-23 22:55:13
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 17:02:24
 */
const path = require("path");
const md5 = require("md5");
const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { PASSWORD_SECRET, TOKEN_SECRET } = require("../config");

/**
 * @description: 生成token
 * @param id String 用户id
 * @param exp String 过期时间
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

const verifyToken = (token) => {
  return new Promise((reslove, reject) => {
    jsonwebtoken.verify(token, TOKEN_SECRET, (err, info) => {
      if (!err) {
        reslove(info);
      } else {
        reject(err);
      }
    });
  });
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

const routeCreator = (url, method) => {
  return { url, method };
};

const nameCreator = (filename) => {
  const extname = path.extname(filename);
  const basename = path.basename(filename, extname);
  const url = JSON.stringify({
    basename,
    timer: new Date().getTime(),
  });
  return md5(url) + extname;
};

module.exports = {
  idCreator,
  nameCreator,
  routeCreator,
  tokenCreator,
  passwordCreator,
  verifyToken,
};

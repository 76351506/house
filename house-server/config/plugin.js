/*
 * @Author: heinan
 * @Date: 2023-07-21 10:42:37
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-26 10:43:04
 */
"use strict";

module.exports = {
  static: {
    enable: true,
  },
  mysql: {
    enable: true,
    package: "egg-mysql",
  },
  validate: {
    enable: true,
    package: "egg-validate",
  },
  session: {
    key: "EGG_HOUSE_SESSION",
    maxAge: 24 * 60 * 60 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  },
};

/*
 * @Author: heinan
 * @Date: 2023-07-21 10:40:26
 * @Last Modified by: zhiwei
 * @Last Modified time: 2023-07-25 17:42:07
 */
"use strict";
const { routeCreator } = require("../app/utils");

module.exports = (appInfo) => {
  const config = (exports = {});
  config.keys = appInfo.name + "_1636591141914_4788";
  // config.middleware = ["responseTime", "checkLogin", "checkIdentity", "gzip"];
  // config.middleware = ["responseTime", "checkLogin", "gzip"];
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.mysql = {
    client: {
      host: "10.37.26.179",
      port: "3306",
      user: "root",
      password: "123456",
      database: "house",
    },
    app: true,
    agent: false,
  };
  config.mediaServer = {
    rtmp: {
      port: 23480,
      chunk_size: 60000,
      gop_cache: true,
      ping: 30,
      ping_timeout: 60,
    },
    http: {
      port: 23481,
      allow_origin: "*",
    },
  };
  // 超级白名单，登录和身份都不需要验证
  config.whiteList = [
    routeCreator("/user/login", "POST"),
    routeCreator(/^\/user\/getAuthInfo\/*/, "any"), //获取权限信息
    routeCreator(/^\/user\/delAutho\/*/, "any"), // 删除权限信息
    routeCreator("/user/cancelIdentityApi", "POST"), //取消身份的api接口权限
    routeCreator("/user/cancelIdentityView", "POST"), //取消身份的视图接口权限
  ];
  // 身份白名单，不需要验证身份
  config.identityWhiteList = [
    routeCreator("/getViewAuthByIdentityId", "GET"),
    routeCreator(/^\/api\/v1\/broker\/*/, "any"),
    // 学生登陆
    // route(/^\/student\/*/, "any"),
  ];
  // 登录白名单，不需要验证登录
  config.loginWhiteList = [];

  return config;
};

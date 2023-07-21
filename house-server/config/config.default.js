/*
 * @Author: heinan
 * @Date: 2023-07-21 10:40:26
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-21 10:43:24
 */
"use strict";

module.exports = (appInfo) => {
  const config = (exports = {});
  config.keys = appInfo.name + "_1636591141914_4788";
  config.middleware = [];
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.mysql = {
    client: {
      host: "localhost",
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

  return config;
};

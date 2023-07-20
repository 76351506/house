/*
 * @Author: your name
 * @Date: 2021-11-20 11:02:08
 * @LastEditTime: 2022-03-23 09:03:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /egg/config/config.default.js
 */
/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {
    mysql: {
      client: {
        host: "localhost",
        port: "3306",
        user: "root",
        password: "123456",
        database: "house",
      },
      app: true,
      agent: false,
    },
    security: {
      csrf: {
        enable: false,
      },
    },
  });

  config.keys = appInfo.name + "_1636591141914_4788";

  config.middleware = [];
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

/*
 * @Author: your name
 * @Date: 2021-11-20 11:02:08
 * @LastEditTime: 2022-03-23 09:03:00
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /egg/config/config.default.js
 */
/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1636591141914_4788';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    // 连接数据库
    mysql: {
      // 单数据库信息配置
      client: {
        // host rm-uf6qobv9we5mbj5u3ro.mysql.rds.aliyuncs.com
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '982500',
        // 数据库名
        database: 'house',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    // 禁止安全措施
    security: {
      csrf: {
        enable: false,
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};

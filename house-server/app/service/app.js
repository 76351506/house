/*
 * @Author: heinan
 * @Date: 2020-07-16 11:33:19
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 18:34:47
 */
"use strict";

const Service = require("egg").Service;

class AppService extends Service {
  async getVisited() {
    const $sql = "select visited from visited";
    return await this.ctx.app.mysql.query($sql);
  }
  async setVisited(val) {
    const $sql = "update visited set visited=? where vid=1 ";
    return await this.ctx.app.mysql.query($sql, [val]);
  }
}

module.exports = AppService;

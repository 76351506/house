/*
 * @Author: heinan
 * @Date: 2023-07-23 22:50:57
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-23 23:00:42
 */
"use strict";
const { Controller } = require("egg");

class Live extends Controller {
  async live() {
    const { ctx } = this;
    let {
      IdName = "",
      status = "",
      pageSize = "10",
      pageCount = "1",
    } = ctx.query;
    if (status == "2") {
      status = "";
    } else {
      status = status * 1;
    }
    const live = await this.app.mysql.query(`SELECT * FROM live`);
    const data = await this.app.mysql.query(
      `SELECT * FROM live WHERE name LIKE '%${IdName}%' and status LIKE '%${status}%' limit ${
        (pageCount - 1) * pageSize
      },${pageSize}`
    );
    ctx.body = {
      code: 200,
      data,
      total: live.length,
    };
  }
  async delLive() {
    const { ctx } = this;
    let { id } = ctx.query;
    const data = await this.app.mysql.delete("live", {
      id,
    });
    if (data.affectedRows) {
      ctx.body = {
        code: 200,
        message: "删除成功",
      };
    }
  }
  async updateLive() {
    const { ctx } = this;
    let { id, status } = ctx.request.body;
    let sql = "update live set status=? where id=?";
    const data = await this.app.mysql.query(sql, [status, id]);
    if (data.affectedRows) {
      ctx.body = {
        code: 200,
        message: "该直播已关闭",
      };
    }
  }
}

module.exports = Live;

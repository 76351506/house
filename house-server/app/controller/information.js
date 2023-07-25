/*
 * @Author: heinan
 * @Date: 2023-07-23 22:51:00
 * @Last Modified by: zhiwei
 * @Last Modified time: 2023-07-25 18:18:34
 */
"use strict";
const { Controller } = require("egg");

class Information extends Controller {
  async getinformation() {
    const { ctx } = this;
    const { name, status } = ctx.query;
    console.log(ctx.query);
    const data = await this.app.mysql.query(
      `SELECT * FROM infos WHERE name LIKE '%${name}%' AND status LIKE '%${status}%' ORDER BY id DESC`
    );
    ctx.body = {
      code: 200,
      data: data.length ? data : false,
    };
  }
  //查询接口
  async information() {
    const { ctx } = this;
    const { name, status } = ctx.query;
    console.log(ctx.query);
    const data = await this.app.mysql.query(
      `SELECT * FROM infos WHERE name LIKE '%${name}%' AND status LIKE '%${status}%' ORDER BY id DESC`
    );
    ctx.body = {
      code: 200,
      data: data.length ? data : false,
    };
  }

  // 删除资讯管理路由数据接口
  async delInformation() {
    const { ctx } = this;
    const { id } = ctx.query;
    await this.app.mysql.delete("infos", {
      id,
    });
    ctx.body = {
      code: 200,
      message: "删除成功",
    };
  }

  // 修改资讯状态接口
  async setInformation() {
    const { ctx } = this;
    const { id, status } = ctx.request.body;
    let sta = 0;
    if (status === 0) {
      sta = 1;
    } else {
      sta = 0;
    }
    // status = status == 0 ? 1 : 0;
    await this.app.mysql.update("infos", {
      id,
      status: sta,
    });
    ctx.body = {
      code: 200,
      message: "修改成功",
    };
  }
}

module.exports = Information;

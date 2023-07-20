"use strict";

const Controller = require("egg").Controller;

class Audit extends Controller {
  async audit() {
    const { ctx } = this;
    let {
      province = "",
      city = "",
      area = "",
      title = "",
      state = "",
      publishType = "",
    } = ctx.query;
    if (state === "全部") {
      state = "";
    }

    // console.log(ctx.query);
    const data = await this.app.mysql.query(
      `SELECT * FROM controls WHERE province LIKE '%${province}%' AND city LIKE '%${city}%' AND district LIKE '%${area}%' AND title LIKE '%${title}%' AND publishType LIKE '%${publishType}%' AND state LIKE '%${state}%' ORDER BY id DESC`
    );

    ctx.body = {
      code: 200,
      data: data.length ? data : false,
    };
  }
  // 删除审核管理路由数据接口
  async delAudit() {
    const { ctx } = this;
    const { id } = ctx.query;
    await this.app.mysql.delete("controls", {
      id,
    });
    ctx.body = {
      code: 200,
      message: "删除成功",
    };
  }
  // 修改审核管理数据接口
  async setAudit() {
    const { ctx } = this;
    const { content } = ctx.request.body;
    // console.log(content);
    const { state, id } = content;
    await this.app.mysql.update("controls", {
      state,
      id,
    });
    ctx.body = {
      code: 200,
      message: "修改成功",
    };
  }
}

module.exports = Audit;

"use strict";

const Controller = require("egg").Controller;

class Group extends Controller {
  async group() {
    const {
      ctx
    } = this;
    let {
      province = "",
        city = "",
        area = "",
        initiator = "",
        group_status = "",
        address = "",
        status = "",
    } = ctx.query;
    const data = await this.app.mysql.query(
      `SELECT * FROM groupBuy WHERE province LIKE '%${province}%' AND city LIKE '%${city}%' AND district LIKE '%${area}%' AND initiator LIKE '%${initiator}%' AND group_status LIKE '%${group_status}%' AND address LIKE '%${address}%' AND status LIKE '%${status}%' ORDER BY id DESC`
    );
    ctx.body = {
      code: 200,
      data: data.length ? data : false,
    };
  }
  async delGroup() {
    const {
      ctx
    } = this;
    const {
      id
    } = ctx.query;
    await this.app.mysql.delete("groups", {
      id
    });
    ctx.body = {
      code: 200,
      message: "删除成功",
    };
  }
  async setGroup() {
    const {
      ctx
    } = this;
    let {
      id,
      status
    } = ctx.request.body;
    let sta = 0;
    if (status == 1) {
      sta = 0
    } else {
      sta = 1
    }
    await this.app.mysql.update("groupBuy", {
      id,
      status: sta
    });
    ctx.body = {
      code: 200,
      message: "修改成功",
    };
  }

}

module.exports = Group;
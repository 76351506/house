/*
 * @Author: heinan
 * @Date: 2023-07-23 22:51:39
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-23 23:00:20
 */
"use strict";
const { Controller } = require("egg");

class Broker extends Controller {
  async broker() {
    const { ctx } = this;
    const {
      telName = "",
      state = "", // , pageSize = "10", pageCount = "1"
    } = ctx.query;
    const data = await this.app.mysql.query(
      `SELECT * FROM brokers WHERE (name LIKE '%${telName}%' or tel LIKE '%${telName}%') and state LIKE '%${state}%' ORDER BY id DESC`
    ); // limit ${(pageCount-1)*pageSize},${pageCount*pageSize}
    ctx.body = {
      code: 200,
      data: data.length ? data : false,
    };
  }
  async delBroker() {
    const { ctx } = this;
    const { id } = ctx.query;
    await this.app.mysql.delete("brokers", {
      id,
    });
    ctx.body = {
      code: 200,
      message: "删除成功",
    };
  }
  // 修改经纪人状态接口
  async setBrokerStatus() {
    const { ctx } = this;
    const { content } = ctx.request.body;
    let res = await this.app.mysql.update("brokers", content);
    if (res.affectedRows) {
      ctx.body = {
        code: 200,
        message: "修改成功",
      };
    }
  }
  // 添加经纪人状态接口
  async putBroker() {
    const { ctx } = this;
    const {
      name,
      tel,
      company,
      created_at,
      updated_at,
      new_house,
      second_hand_house,
      renting,
      state,
    } = ctx.request.body;
    await this.app.mysql.insert("brokers", {
      name,
      tel,
      company,
      created_at,
      updated_at,
      new_house,
      second_hand_house,
      renting,
      state,
    });
    ctx.body = {
      code: 200,
      message: "插入成功",
    };
  }
}

module.exports = Broker;

/*
 * @Author: heinan
 * @Date: 2023-07-23 22:51:39
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 14:22:53
 */
"use strict";
const { Controller } = require("egg");

class Broker extends Controller {
  async index() {
    console.log(this.ctx.query);
    try {
      this.ctx.validate(
        {
          currentPage: "string",
          pageSize: "string",
        },
        this.ctx.query
      );
    } catch (err) {
      this.ctx.status = 406;
      return (this.ctx.body = {
        code: 0,
        error: err.errors,
      });
    }
    const result = await this.ctx.service.broker.index(this.ctx.query);
    if (result.length) {
      this.ctx.body = {
        code: 1,
        msg: "查询成功！",
        data: result,
      };
    } else {
      this.ctx.body = {
        code: 0,
        msg: "暂无数据！",
        data: [],
      };
    }
  }

  async destory() {
    const result = await this.ctx.service.broker.destroy(this.ctx.params);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "删除成功！",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "删除失败！",
      };
    }
  }
  async update() {
    const result = await this.ctx.service.broker.update({
      ...this.ctx.params,
      ...this.ctx.request.body,
    });
    if (result.affectedRows) {
      ctx.body = {
        code: 1,
        message: "修改成功！",
      };
    } else {
      ctx.body = {
        code: 0,
        message: "修改失败！",
      };
    }
  }
  async create() {
    try {
      this.ctx.validate({
        name: "string",
        mobile: "string",
        company: "string",
      });
    } catch (err) {
      this.ctx.status = 406;
      return (this.ctx.body = {
        code: 0,
        error: err.errors,
      });
    }
    const result = await this.ctx.service.broker.create(this.ctx.request.body);
    if (result.affectedRows) {
      ctx.body = {
        code: 1,
        message: "插入成功！",
      };
    } else {
      ctx.body = {
        code: 0,
        message: "插入失败！",
      };
    }
  }
}

module.exports = Broker;

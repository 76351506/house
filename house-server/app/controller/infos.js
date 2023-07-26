/*
 * @Author: heinan
 * @Date: 2023-07-23 22:51:39
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-25 19:23:36
 */
"use strict";
const { Controller } = require("egg");

class Infos extends Controller {
  async index() {
    const result = await this.ctx.service.infos.index(this.ctx.query);
    if (result.length) {
      this.ctx.body = {
        code: 1,
        msg: "查询成功！",
        ...result,
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
    const result = await this.ctx.service.infos.destory(this.ctx.params);
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
    const result = await this.ctx.service.infos.update({
      ...this.ctx.params,
      ...this.ctx.request.body,
    });
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "修改成功！",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "修改失败！",
      };
    }
  }
  async create() {
    try {
      this.ctx.validate({
        uid: "string",
        title: "string",
        status: "string",
      });
    } catch (err) {
      this.ctx.status = 400;
      return (this.ctx.body = {
        code: 0,
        error: err.errors,
      });
    }
    const result = await this.ctx.service.infos.create(this.ctx.request.body);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "新增成功!",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "新增失败!",
      };
    }
  }
}

module.exports = Infos;


/*
 * @Author: heinan
 * @Date: 2023-07-23 22:50:43
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 09:10:12
 */
"use strict";
const { Controller } = require("egg");
const { passwordCreator, tokenCreator } = require("../utils");

class IdentityController extends Controller {
  async index() {
    const result = this.ctx.service.identity.index();
    if (result.length) {
      this.ctx.body = {
        code: 1,
        message: "查询成功!",
        data: result,
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "暂无数据!",
        data: [],
      };
    }
  }
  async create() {
    const result = await this.ctx.service.identity.create(
      this.ctx.request.body
    );
    console.log(result);
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
  async update() {
    const result = await this.ctx.service.identity.update({
      ...this.ctx.params,
      ...this.ctx.request.body,
    });
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "修改成功!",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "修改失败!",
      };
    }
  }
  async destroy() {
    const result = await this.ctx.service.identity.destroy(this.ctx.params);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "删除成功!",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "删除失败!",
      };
    }
  }
}

module.exports = IdentityController;

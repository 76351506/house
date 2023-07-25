/*
 * @Author: heinan
 * @Date: 2023-07-23 22:50:43
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 10:14:13
 */
"use strict";
const { Controller } = require("egg");

class GroupController extends Controller {
  // 查询接口Postman测试OK
  async index() {
    const result = await this.ctx.service.group.index(this.ctx.query);
    if (result.data.length) {
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
  // 新增接口Postman测试OK
  async create() {
    const result = await this.ctx.service.group.create(
      this.ctx.request.body
    );
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
  // 更改状态接口Postman测试OK
  async update() {
    const result = await this.ctx.service.group.update({
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
  // 删除接口Postman测试OK
  async destroy() {
    const result = await this.ctx.service.group.destroy(this.ctx.params);
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

module.exports = GroupController;

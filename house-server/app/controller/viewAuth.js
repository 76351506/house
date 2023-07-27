/*
 * @Author: heinan
 * @Date: 2023-07-24 09:44:05
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 18:34:22
 */
"use strict";
const { Controller } = require("egg");

class ViewAuthrityController extends Controller {
  async index() {
    const result = await this.ctx.service.viewAuth.index();
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
    try {
      this.ctx.validate({
        identity_id: "string",
        view_authority_id: "string",
      });
    } catch (err) {
      this.ctx.status = 400;
      return (this.ctx.body = {
        code: 0,
        error: err.errors,
      });
    }
    const result = await this.ctx.service.viewAuth.create(
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
  async update() {
    try {
      this.ctx.validate({
        identity_id: "string",
        view_authority_id: "string",
      });
    } catch (err) {
      this.ctx.status = 400;
      return (this.ctx.body = {
        code: 0,
        error: err.errors,
      });
    }
    const result = await this.ctx.service.viewAuth.update({
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
    const result = await this.ctx.service.viewAuth.destroy(this.ctx.params);
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
  async getViewAuthByIdentityId() {
    const result = await this.ctx.service.viewAuth.getViewAuthByIdentityId(
      this.ctx.params
    );
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
  async setViewAuthByIdentityList() {
    const result = await this.ctx.service.viewAuth.setViewAuthByIdentityList({
      ...this.ctx.params,
      ...this.ctx.request.body,
    });
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "设置成功!",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "设置失败!",
      };
    }
  }
}

module.exports = ViewAuthrityController;

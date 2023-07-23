/*
 * @Author: heinan
 * @Date: 2023-07-23 22:59:43
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 00:10:50
 */
"use strict";
const { Controller } = require("egg");

// 审核管理
class AuditController extends Controller {
  async index() {
    const result = await this.ctx.service.audit.index(this.ctx.query);
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
    const result = await this.ctx.service.audit.destroy(this.ctx.query);
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
  // 修改审核状态
  async update() {
    const result = await this.ctx.service.audit.update({
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
}

module.exports = AuditController;

/*
 * @Author: heinan
 * @Date: 2023-07-23 22:51:39
 * @Last Modified by: zhiwei
 * @Last Modified time: 2023-07-25 18:54:34
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
  // async destory() {
  //   const result = await this.ctx.service.infos.destory(this.ctx.params);
  //   if (result.affectedRows) {
  //     this.ctx.body = {
  //       code: 1,
  //       message: "删除成功！",
  //     };
  //   } else {
  //     this.ctx.body = {
  //       code: 0,
  //       message: "删除失败！",
  //     };
  //   }
  // }
  async update() {
    const result = await this.ctx.service.update({
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
}

module.exports = Infos;

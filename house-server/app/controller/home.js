/*
 * @Author: heinan
 * @Date: 2023-07-23 22:51:15
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-23 22:59:59
 */
"use strict";
const { Controller } = require("egg");

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hi, egg";
  }
  async sider() {
    const { ctx } = this;
    const results = await this.app.mysql.select("sider");
    ctx.body = {
      code: 200,
      data: results,
    };
  }
}
module.exports = HomeController;

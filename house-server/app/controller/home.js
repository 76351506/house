'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async sider() {
    const { ctx } = this;
    const results = await this.app.mysql.select('sider');
    ctx.body = {
      code: 200,
      data: results
    }
  }
}

module.exports = HomeController;

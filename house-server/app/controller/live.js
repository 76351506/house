'use strict';

const Controller = require('egg').Controller;

class Live extends Controller {
    async live() {
        const { ctx } = this;
        let { name = '', statu = '' } = ctx.query
        const data = await this.app.mysql.query(`SELECT * FROM live WHERE name LIKE '%${name}%' AND statu LIKE '%${statu}%'`);
        ctx.body = {
            code: 200,
            data
        }
    }
}

module.exports = Live;

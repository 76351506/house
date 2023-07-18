'use strict';

const Controller = require('egg').Controller;

class Order extends Controller {
    async order() {
        const { ctx } = this;
        const { serTelName = '', type = '' } = ctx.query
        const data = await this.app.mysql.query(`SELECT * FROM orders WHERE (serial LIKE '%${serTelName}%' OR tel LIKE '%${serTelName}%' OR username LIKE '%${serTelName}%') AND type LIKE '%${type}%' ORDER BY id DESC`)
        ctx.body = {
            code: 200,
            data: data.length ? data : false
        }
    }
    // 删除订单管理管理路由数据接口
    async delOrder() {
        const { ctx } = this;
        const { id } = ctx.query
        await this.app.mysql.delete('orders', { id });
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }
}
module.exports = Order;

'use strict';

const Controller = require('egg').Controller;

class Broker extends Controller {
    async broker() {
        const { ctx } = this;
        const { telName = '', state = '' } = ctx.query
        const data = await this.app.mysql.query(`SELECT * FROM brokers WHERE (name LIKE '%${telName}%' OR tel LIKE '%${telName}%') AND state LIKE '%${state}%' ORDER BY id DESC`);
        ctx.body = {
            code: 200,
            data: data.length ? data : false
        }
    }
    async delBroker() {
        const { ctx } = this;
        const { id } = ctx.query
        await this.app.mysql.delete('brokers', { id });
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }
    // 修改经纪人状态接口
    async setBrokerStatus() {
        const { ctx } = this;
        const { content } = ctx.request.body
        await this.app.mysql.update('brokers', content);
        ctx.body = {
            code: 200,
            message: '修改成功'
        }
    }
    // 添加经纪人状态接口
    async putBroker() {
        const { ctx } = this;
        const { name, tel, company } = ctx.request.body
        await this.app.mysql.insert('brokers', { name, tel, company });
        ctx.body = {
            code: 200,
            message: '插入成功'
        }
    }
}

module.exports = Broker;

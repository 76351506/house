'use strict';

const Controller = require('egg').Controller;

class Information extends Controller {
    async information() {
        const { ctx } = this;
        let { name = '', status = '' } = ctx.query
        const data = await this.app.mysql.query(`SELECT * FROM infos WHERE tit LIKE '%${name}%' AND status LIKE '%${status}%' ORDER BY id DESC`);
        ctx.body = {
            code: 200,
            data: data.length ? data : false
        }
    }

    // 删除资讯管理路由数据接口
    async delInformation() {
        const { ctx } = this;
        const { id } = ctx.query
        await this.app.mysql.delete('infos', { id });
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }

    // 修改资讯状态接口
    async setInformation() {
        const { ctx } = this;
        const { id, status } = ctx.request.body
        await this.app.mysql.update('infos', { id, status });
        ctx.body = {
            code: 200,
            message: '修改成功'
        }
    }
}

module.exports = Information;

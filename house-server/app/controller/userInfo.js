'use strict';

const Controller = require('egg').Controller;

class UserInfo extends Controller {
    //获取用户
    async userInfo() {
        const {
            ctx
        } = this;
        let {
            keyWord = "",
                pageSize = '10',
                pageCount = '1'
        } = ctx.query
        const data = await this.app.mysql.query(`SELECT * FROM users where username like '%${keyWord}%' or id like '%${keyWord}%' limit ${(pageCount-1)*pageSize},${pageCount*pageSize}`);
        ctx.body = {
            code: 200,
            data: data.length ? data : false
        }
    }

    // 删除用户数据接口
    async delUser() {
        const {
            ctx
        } = this;
        const {
            id
        } = ctx.query
        await this.app.mysql.delete('users', {
            id
        });
        ctx.body = {
            code: 200,
            message: '删除成功'
        }
    }
}

module.exports = UserInfo;
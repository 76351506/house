'use strict';
const Controller = require('egg').Controller;
const { md5, createToken } = require('../../utils/index')
class Login extends Controller {
    //登录
    async login() {
        const { ctx } = this;
        const { password, username } = ctx.request.body;
        //查找用户是否存在
        const data = await this.app.mysql.get("users", { username });
        // 不存在返回不存在
        if (!data) {
            ctx.body = {
                code: 401,
                message: "用户不存在",
            };
            return;
        }
        //判断密码是否正确
        if (data.password !== md5(password)) {
            ctx.body = {
                code: 401,
                message: "密码错误",
            };
            return;
        }
        //删除密码
        delete data.password;
        //生成token
        let token = createToken({ ...data }, "24h");
        // 返回
        ctx.body = {
            code: 200,
            message: "登录成功",
            token, //返回token,
            data,
        };
    }
}

module.exports = Login;

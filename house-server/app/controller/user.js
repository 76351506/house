/*
 * @Author: heinan
 * @Date: 2023-07-23 22:50:43
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 08:47:42
 */
"use strict";
const { Controller } = require("egg");
const { passwordCreator, tokenCreator } = require("../utils");

class User extends Controller {
  async login() {
    try {
      this.ctx.validate({
        username: "string",
        password: "string",
      });
    } catch (err) {
      this.ctx.status = 406;
      return (this.ctx.body = {
        code: 0,
        error: err.errors,
      });
    }
    const { password, username } = this.ctx.request.body;
    const user = await this.ctx.service.user.find(this.ctx.request.body);
    if (!user) {
      this.ctx.status = 406;
      return (this.ctx.body = {
        code: 0,
        message: `用户:${username}不存在!`,
      });
    }
    if (user.password !== passwordCreator(password)) {
      this.ctx.status = 401;
      return (this.ctx.body = {
        code: 0,
        message: "密码错误!",
      });
    }
    const token = tokenCreator(user.id, "24h");
    this.ctx.status == 200;
    this.ctx.body = {
      code: 1,
      message: "登录成功!",
      token,
    };
  }
  async registry() {
    try {
      this.ctx.validate({
        username: "string",
        password: "string",
      });
    } catch (err) {
      this.ctx.status = 406;
      return (this.ctx.body = {
        code: 0,
        error: err.errors,
      });
    }
    const { username } = this.ctx.request.body;
    const user = await this.ctx.service.user.find(this.ctx.request.body);
    if (user) {
      this.ctx.status == 406;
      return (this.ctx.body = {
        code: 0,
        msg: `用户: ${username} 已被注册!`,
      });
    }
    const result = await this.ctx.service.user.registry(this.ctx.request.body);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        msg: "注册成功",
      };
    } else {
      this.ctx.body = {
        code: 0,
        msg: "注册失败",
      };
    }
  }
}

module.exports = User;

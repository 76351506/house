/*
 * @Author: heinan
 * @Date: 2023-07-23 22:50:43
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 18:34:14
 */
"use strict";
const { Controller } = require("egg");
const { passwordCreator, tokenCreator } = require("../utils");
const svgCaptcha = require("svg-captcha");

class UserController extends Controller {
  async login() {
    try {
      this.ctx.validate({
        captcha: "string",
        username: "string",
        password: "string",
      });
    } catch (err) {
      this.ctx.status = 400;
      return (this.ctx.body = {
        code: 0,
        error: err.errors,
      });
    }
    if (this.ctx.session.captcha !== this.ctx.request.body.captcha) {
      this.ctx.status = 403;
      return (this.ctx.body = {
        code: 0,
        message: "验证码输入错误！",
      });
    }
    const { password, username } = this.ctx.request.body;
    const user = await this.ctx.service.user.find(this.ctx.request.body);
    if (!user) {
      this.ctx.status = 400;
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
      this.ctx.status = 400;
      return (this.ctx.body = {
        code: 0,
        error: err.errors,
      });
    }
    const { username } = this.ctx.request.body;
    const user = await this.ctx.service.user.find(this.ctx.request.body);
    if (user) {
      this.ctx.status == 400;
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
  /**
   * 获取用户列表
   * @param nickname String 昵称
   * @param username String 用户名
   * @param tel String 手机号
   * @param currentPage Number 当前页码
   * @param pageSize Number 分页展示个数
   * @returns
   */
  async getUserList() {
    const result = await this.ctx.service.user.getUserList(this.ctx.query);
    if (result.data.length) {
      this.ctx.body = {
        code: 1,
        msg: "查询成功！",
        ...result,
      };
    } else {
      this.ctx.body = {
        code: 0,
        msg: "暂无数据！",
        data: [],
      };
    }
  }
  /**
   * 删除用户
   * @param id String 用户id
   * @returns
   */
  async destory() {
    const result = await this.ctx.service.user.destory(this.ctx.params);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "删除成功！",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "删除失败！",
      };
    }
  }
  /**
   * 编辑用户信息
   * @param id String 用户id
   * @param nickname String 昵称
   * @param username String 用户名
   * @param tel String 手机号
   * @param email string 邮箱
   * @param avatar string 用户头像
   * @returns
   */
  async updateUserInfo() {
    const result = await this.ctx.service.user.updateUserInfo({
      ...this.ctx.params,
      ...this.ctx.request.body,
    });
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "修改成功！",
        ...result,
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "修改失败！",
      };
    }
  }
  /**
   * 添加用户信息
   * @param id String 用户id
   * @param nickname String 昵称
   * @param username String 用户名
   * @param tel String 手机号
   * @param email string 邮箱
   * @param avatar string 用户头像
   * @returns
   */
  async addUserInfo() {
    const result = await this.ctx.service.user.addUserInfo({
      ...this.ctx.params,
      ...this.ctx.request.body,
    });
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "新增成功成功！",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "新增成功失败！",
      };
    }
  }
  async captcha() {
    var captcha = svgCaptcha.create();
    this.ctx.session.captcha = captcha.text.toLocaleLowerCase();
    this.ctx.response.type = "image/svg+xml";
    this.ctx.body = captcha.data;
  }
  async getUserPermissions() {
    const result = await this.ctx.service.user.getUserPermissions(
      this.ctx.query
    );
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
}

module.exports = UserController;

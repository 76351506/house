'use strict';
const Controller = require('egg').Controller;
const {
  md5,
  createToken,
} = require('../../utils/index');
class User extends Controller {
  // 登录
  async login() {
    const {
      ctx,
    } = this;
    const {
      password,
      username,
    } = ctx.request.body;
    // 查找用户是否存在
    const data = await this.app.mysql.get('users', {
      username,
    });
    // 不存在返回不存在
    if (!data) {
      ctx.body = {
        code: 401,
        message: '用户不存在',
      };
      return;
    }
    // 判断密码是否正确
    if (data.password !== md5(password)) {
      ctx.body = {
        code: 401,
        message: '密码错误',
      };
      return;
    }
    // 删除密码
    // delete data.password;
    // 生成token
    const token = createToken({
      ...data,
    }, '24h');
    // 返回
    ctx.body = {
      code: 200,
      message: '登录成功',
      token, // 返回token,
      data,
    };
  }
  async registry() {
    const {
      ctx,
    } = this;
    const {
      password,
      username,
      tel,
    } = ctx.request.body;
    const pwd = md5(password);
    // 查找用户是否存在
    const data = await this.app.mysql.get('users', {
      username,
    });
    // console.log(data);
    // 不存在注册
    if (!data) {
      const created_at = new Date().toLocaleDateString();
      const updated_at = new Date().toLocaleDateString();
      const sql = 'insert into users(username,password,tel,created_at,updated_at)values(?,?,?,?,?)';
      const data = await this.app.mysql.query(sql, [username, pwd, tel, created_at, updated_at]);
      // console.log(data);
      if (data.affectedRows) {
        ctx.body = {
          code: 200,
          msg: '注册成功',
        };
      } else {
        ctx.body = {
          code: 400,
          msg: '注册失败',
        };
      }
    } else {
      // 存在， 已注册
      ctx.body = {
        code: 400,
        msg: '该用户已注册',
      };
    }
  }
}

module.exports = User;
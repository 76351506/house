/*
 * @Author: heinan
 * @Date: 2023-07-24 00:24:57
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 00:47:29
 */
"use strict";

const fs = require("fs");
const path = require("path");
const Service = require("egg").Service;
const { idCreator, passwordCreator } = require("../utils");

class UserService extends Service {
  async find({ username }) {
    return await this.app.mysql.get("login", { username });
  }
  async login({ username, password }) {
    const $sql = "select * from login where username=? and password=?";
    const $params = [username, passwordCreator(password)];
    return await this.ctx.app.mysql.query($sql, $params);
  }
  async registry({ username, password }) {
    const $sql = "insert into login (id,username,password) values (?,?,?)";
    const $params = [idCreator(), username, passwordCreator(password)];
    return await this.ctx.app.mysql.query($sql, $params);
  }
  async modileLogin({ mobile }) {
    const $params = [mobile];
    const $sql = "select * from login where mobile=?";
    return await this.ctx.app.mysql.query($sql, $params);
  }
  async modifyPwdByMobile({ mobile, password }) {
    const pwd = passwordCreator(password);
    const $params = [pwd, mobile];
    const $sql = "update login set password=?  where mobile=?";
    return await this.ctx.app.mysql.query($sql, $params);
  }
  async modifyPwdByEmail({ email, password }) {
    const pwd = passwordCreator(password);
    let res = await this.ctx.app.mysql.query(
      "select * from user where email=?",
      [email]
    );
    console.log(res);
    const $params = [pwd, res[0].uid];
    const $sql = "update login set password=?  where uid=?";
    return await this.ctx.app.mysql.query($sql, $params);
  }
  async getUserPermissions(uid) {
    const $params = [uid];
    const $sql = "select * from login where uid=?";
    return await this.ctx.app.mysql.query($sql, $params);
  }

  async updataUserInfo({ uid, nickname, graph, email, mobile, avatar }) {
    const $params = [nickname, graph, email, mobile, avatar, uid];
    const $sql =
      "update user set nickname=? , graph=? ,email=? , mobile=?,avatar=? where uid=? ";
    return await this.ctx.app.mysql.query($sql, $params);
  }
  async setuserinfo({ mobile }, uid) {
    const $params = [mobile, uid];
    const $sql = "insert into user (mobile,uid) values (?,?)";
    return await this.ctx.app.mysql.query($sql, $params);
  }

  async getUserInfo({ uid }) {
    const $sql = "SELECT * FROM user WHERE uid=?";
    const $params = [uid];
    return await this.ctx.app.mysql.query($sql, $params);
  }
  async upload(filepath, filenam) {
    const uploadData = fs.readFileSync(filepath);
    const uploadDir = path.join(process.cwd(), "app/public/upload", filenam);
    const uploadError = fs.writeFileSync(uploadDir, uploadData);
    return uploadError;
  }
  async addIdentiry({ identity_text, identity_type }) {
    const identity_id = idCreator(identity_text);
    const $params = [identity_id, identity_text, identity_type];
    const $sql =
      "insert into identity (identity_id,identity_text,identity_type) values (?,?,?)";
    return await this.ctx.app.mysql.query($sql, $params);
  }
  async identiryList() {
    const $sql = "select * from `identity`";
    return await this.ctx.app.mysql.query($sql);
  }
}

module.exports = UserService;

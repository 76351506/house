/*
 * @Author: heinan
 * @Date: 2023-07-24 00:24:57
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 16:28:38
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

  // 根据用户的id和api接口判断用户是否具有该权限
  async isUserApiAuthority({ url, method, id }) {
    let sql = ` SELECT * FROM api_authority,identity_api_authority_relation,identity,login 
    where api_authority.api_authority_url='${url}'
    And api_authority.api_authority_method='${method}'
    And api_authority.api_authority_id=identity_api_authority_relation.api_authority_id
    And login.id='${id}'
    And login.identity_id=identity.identity_id 
    And identity.identity_id=identity_api_authority_relation.identity_id`;
    const result = await this.app.mysql.query(sql);
    return result.length > 0;
  }
}

module.exports = UserService;

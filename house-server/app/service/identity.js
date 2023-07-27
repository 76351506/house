/*
 * @Author: heinan
 * @Date: 2020-07-16 11:33:19
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 18:32:50
 */
"use strict";

const { Service } = require("egg");
const { idCreator } = require("../utils");

class IdentityService extends Service {
  async create({ identity_text }) {
    const $data = { identity_text, identity_id: idCreator() };
    return await this.app.mysql.insert("identity", $data);
  }
  async index() {
    return await this.app.mysql.select("identity");
  }
  async destroy({ id }) {
    return await this.app.mysql.delete("identity", { identity_id: id });
  }
  async update({ id, identity_text }) {
    const $data = { identity_text };
    const $options = { where: { identity_id: id } };
    return await this.app.mysql.update("identity", $data, $options);
  }
  async getIdentityById({ id }) {
    const $sql = `SELECT login.id,login.username,login.identity_id,identity.identity_text FROM login,identity WHERE login.identity_id=identity.identity_id AND login.id='${id}'`;
    return await this.app.mysql.query($sql);
  }
}

module.exports = IdentityService;

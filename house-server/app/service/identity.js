/*
 * @Author: heinan
 * @Date: 2020-07-16 11:33:19
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 09:10:16
 */
"use strict";

const { Service } = require("egg");
const { idCreator } = require("../utils");

class IdentityService extends Service {
  async create({ identity_text }) {
    const $data = { identity_text, identity_id: idCreator() };
    console.log($data);
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
}

module.exports = IdentityService;

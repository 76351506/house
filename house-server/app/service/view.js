/*
 * @Author: heinan
 * @Date: 2020-07-16 11:33:19
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 09:29:41
 */
"use strict";

const { Service } = require("egg");
const { idCreator } = require("../utils");

class ViewService extends Service {
  async create({ view_authority_text, view_name }) {
    const $data = {
      view_authority_text,
      view_name,
      view_authority_id: idCreator(),
    };
    return await this.app.mysql.insert("view_authority", $data);
  }
  async index() {
    return await this.app.mysql.select("view_authority");
  }
  async destroy({ id }) {
    return await this.app.mysql.delete("view_authority", {
      view_authority_id: id,
    });
  }
  async update({ id, view_authority_text, view_name }) {
    const $data = { view_authority_text, view_name };
    const $options = { where: { view_authority_id: id } };
    return await this.app.mysql.update("view_authority", $data, $options);
  }
}

module.exports = ViewService;

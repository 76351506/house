/*
 * @Author: heinan 
 * @Date: 2023-07-25 19:36:12 
 * @Last Modified by:   heinan 
 * @Last Modified time: 2023-07-25 19:36:12 
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
  async show({ id }) {
    return await this.app.mysql.get("view_authority", {
      view_authority_id: id,
    });
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

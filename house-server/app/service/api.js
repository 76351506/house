/*
 * @Author: heinan
 * @Date: 2020-07-16 11:33:19
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-25 17:12:41
 */
"use strict";

const { Service } = require("egg");
const { idCreator } = require("../utils");

class ApiService extends Service {
  async create({
    api_authority_text,
    api_authority_url,
    api_authority_method,
  }) {
    const $data = {
      api_authority_text,
      api_authority_url,
      api_authority_method,
      api_authority_id: idCreator(),
    };
    return await this.app.mysql.insert("api_authority", $data);
  }
  async show({ id }) {
    return await this.app.mysql.get("api_authority", {
      api_authority_id: id,
    });
  }
  async index() {
    return await this.app.mysql.select("api_authority");
  }
  async destroy({ id }) {
    return await this.app.mysql.delete("api_authority", {
      api_authority_id: id,
    });
  }
  async update({
    id,
    api_authority_text,
    api_authority_url,
    api_authority_method,
  }) {
    const $data = {
      api_authority_text,
      api_authority_url,
      api_authority_method,
    };
    const $options = { where: { api_authority_id: id } };
    return await this.app.mysql.update("api_authority", $data, $options);
  }
}

module.exports = ApiService;

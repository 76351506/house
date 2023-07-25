/*
 * @Author: heinan
 * @Date: 2020-07-16 11:33:19
 * @Last Modified by: zhiwei
 * @Last Modified time: 2023-07-25 19:02:46
 */
"use strict";
const { Service } = require("egg");
const { idCreator } = require("../utils/");

class InfoService extends Service {
  async index({ name, status, currentPage, pageSize }) {
    const where = {};
    if (name) {
      where.name = name;
    }
    if (status == "请选择") {
    } else if (status) {
      where.status = status;
    } else {
    }
    return await this.app.mysql.select("infos", {
      where,
      offset: (currentPage - 1) * pageSize,
      limit: parseInt(pageSize),
    });
  }
  async destory({ id }) {
    return await this.app.mysql.delete("infos", { id });
  }
  async create({ view_authority_text, view_name }) {
    const $data = {
      name,
      view_name,
      view_authority_id: idCreator(),
    };
    return await this.app.mysql.insert("infos", $data);
  }
  async update({ id, status }) {
    const $data = { id, status };
    return await this.app.mysql.update("infos", $data);
  }
}

module.exports = InfoService;

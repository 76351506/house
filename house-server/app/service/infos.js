/*
 * @Author: heinan
 * @Date: 2023-07-25 19:10:55
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 18:35:17
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
    if (status == 0) {
    } else if (status) {
      where.status = status;
    } else {
    }
    const result = await this.app.mysql.select("infos", {
      where,
      offset: (currentPage - 1) * pageSize,
      limit: parseInt(pageSize),
    });
    const total = await this.app.mysql.count("controls", where);
    return {
      total,
      pageSize: Number(pageSize),
      currentPage: Number(currentPage),
      data: result,
    };
  }
  async destory({ id }) {
    return await this.app.mysql.delete("infos", { id });
  }
  async create({ uid, status, title }) {
    const $data = {
      uid,
      status,
      title,
      create_time: new Date().getTime(),
      update_time: new Date().getTime(),
      id: idCreator(),
    };
    return await this.app.mysql.insert("infos", $data);
  }
  async update({ id, uid, status, title }) {
    const $data = { id, uid, status, title };
    $data.update_time = new Date().getTime();
    return await this.app.mysql.update("infos", $data);
  }
}

module.exports = InfoService;


/*
 * @Author: heinan
 * @Date: 2020-07-16 11:33:19
 * @Last Modified by: zhiwei
 * @Last Modified time: 2023-07-25 18:36:00
 */
"use strict";
const { Service } = require("egg");
const { idCreator } = require("../utils");

class BrokerService extends Service {
  async index({ mobile, company, status, currentPage, pageSize }) {
    const where = {};
    if (mobile) {
      where.mobile = mobile;
    }
    if (company) {
      where.company = company;
    }
    if (status == "全部") {
    } else if (status) {
      where.status = status;
    } else {
    }
    return await this.app.mysql.select("brokers", {
      where,
      offset: (currentPage - 1) * pageSize,
      limit: parseInt(pageSize),
    });
  }
  async destroy({ id }) {
    return await this.app.mysql.delete("brokers", { id });
  }
  async update({ id, status }) {
    const $data = { id, status };
    return await this.app.mysql.update("controls", $data);
  }
  async create(params) {
    const $data = {
      ...params,
      id: idCreator(),
    };
    const $params = [];
    return await this.app.mysql.insert("brokers", $data);
  }
}

module.exports = BrokerService;

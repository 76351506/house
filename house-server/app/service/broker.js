/*
 * @Author: heinan
 * @Date: 2020-07-16 11:33:19
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 14:17:32
 */
"use strict";
const { Service } = require("egg");
const { idCreator } = require("../utils");

class BrokerService extends Service {
  async index({ mobile, company, state, currentPage, pageSize }) {
    const where = {};
    if (mobile) {
      where.mobile = mobile;
    }
    if (company) {
      where.company = company;
    }
    if (state == "全部") {
    } else if (state) {
      where.state = state;
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
  async update({ id, state }) {
    const $data = { id, state };
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

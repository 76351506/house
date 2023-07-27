/*
 * @Author: heinan
 * @Date: 2020-07-16 11:33:19
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 18:34:53
 */
"use strict";
const { Service } = require("egg");
const { idCreator } = require("../utils");

class BrokerService extends Service {
  //获取经纪人信息
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
  //删除经纪人信息
  async destroy({ id }) {
    return await this.app.mysql.delete("brokers", { id });
  }
  //修改经纪人离职在职状态
  async update({ id, status }) {
    const $data = { id, status };
    return await this.app.mysql.update("controls", $data);
  }
  //添加经纪人
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

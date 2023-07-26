/*
 * @Author: heinan
 * @Date: 2020-07-16 11:33:19
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-25 19:17:19
 */
"use strict";
const {
  Service
} = require("egg");

class AuditService extends Service {
  /**
   * @param province String 省份
   * @param city String 省份
   * @param county String 省份
   * @param title String 省份
   * @param state String 省份
   * @param currentPage Number 当前页码
   * @param pageSize Number 分页展示个数
   * @returns
   */

  async index({
    province,
    city,
    county,
    title,
    state,
    currentPage,
    pageSize
  }) {
    const where = {};
    if (province) {
      where.province = province;
    }
    if (city) {
      where.city = city;
    }
    if (county) {
      where.county = county;
    }
    if (title) {
      where.title = title;
    }
    if (state == "全部") {} else if (state) {
      where.state = state;
    } else {}
    const result = await this.app.mysql.select("controls", {
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
  async destroy({
    id
  }) {
    return await this.app.mysql.delete("controls", {
      id
    });
  }
  async update({
    id,
    state
  }) {
    const $data = {
      state
    };
    const $options = {
      where: {
        id
      }
    };
    return await this.app.mysql.update("controls", $data, $options);
  }
}

module.exports = AuditService;

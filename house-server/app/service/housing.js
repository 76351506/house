/*
 * @Author: heinan
 * @Date: 2020-07-16 11:33:19
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 17:34:44
 */
"use strict";
const {
  Service
} = require("egg");

class AuditService extends Service {
  // 查询房源
  async index({
    area,
    province,
    city,
    county,
    name,
    currentPage,
    pageSize
  }) {
    const where = {};
    if (area) {
      area = area.replace(/(区|县)/, "");
      where.area = area;
    }
    if (name) {
      where.name = name;
    }
    if (province) {
      where.province = province;
    }
    if (city) {
      where.city = city;
    }
    if (county) {
      where.county = county;
    }
    // if (state == "全部") {} else if (state) {
    //   where.state = state;
    // } else {}
    const result = await this.app.mysql.select("housing", {
      where,
      offset: (currentPage - 1) * pageSize,
      limit: parseInt(pageSize),
    });
    const total = await this.app.mysql.count("housing", where);
    return {
      data: result,
      total,
      pageSize: Number(pageSize),
      currentPage: Number(currentPage),
    };
  }
  // 删除房源管理销售楼盘数据接口
  async destroy({
    id
  }) {
    return await this.app.mysql.delete("housing", {
      id
    });
  }
  // 修改房源管理销售楼盘状态接口
  async update({
    id,
    status
  }) {
    const $data = {
      status
    };
    const $options = {
      where: {
        id
      }
    };
    return await this.app.mysql.update("housing", $data, $options);
  }

}

module.exports = AuditService;

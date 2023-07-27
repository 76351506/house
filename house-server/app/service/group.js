/*
 * @Author: heinan
 * @Date: 2020-07-16 11:33:19
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 18:34:57
 */
"use strict";

const { Service } = require("egg");
const { idCreator } = require("../utils");

class GorupService extends Service {
  /**
   * @param house_name String 楼盘名称
   * @param status Number 状态
   * @param province String 省份
   * @param city String 城市
   * @param county String 区县
   * @param address String 详细地址
   * @param group_status Number 楼盘状态
   * @param currentPage Number 当前页码
   * @param pageSize Number 分页展示个数
   * @returns
   */
  async index({
    house_name,
    status,
    province,
    city,
    county,
    address,
    group_status,
    currentPage,
    pageSize,
  }) {
    const where = {};
    if (house_name) {
      where.house_name = house_name;
    }
    if (status) {
      where.status = status;
    } else {
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
    if (address) {
      where.address = address;
    }
    if (group_status) {
      where.group_status = group_status;
    } else {
    }
    const result = await this.app.mysql.select("groups", {
      where,
      offset: (currentPage - 1) * pageSize,
      limit: parseInt(pageSize),
    });
    const total = await this.app.mysql.count("groups", where);
    return {
      data: result,
      total,
      pageSize: Number(pageSize),
      currentPage: Number(currentPage),
    };
  }
  async destroy({ id }) {
    return await this.app.mysql.delete("groups", { group_id: id });
  }
  async update({ id, status }) {
    const $data = { status };
    const $options = { where: { group_id: id } };
    return await this.app.mysql.update("groups", $data, $options);
  }
  async create({
    img,
    group_title,
    house_name,
    province,
    city,
    county,
    address,
    start_time,
    end_time,
    group_info,
  }) {
    const $data = {
      img,
      group_title,
      house_name,
      province,
      city,
      county,
      address,
      start_time,
      end_time,
      group_info,
      group_id: idCreator(),
    };
    return await this.app.mysql.insert("groups", $data);
  }
}

module.exports = GorupService;


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
const {
  idCreator
} = require('../utils/index')
class HouseService extends Service {
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
      where.quyu = area;
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
    if (state == "全部") {
      state = ''
    } else if (state) {
      where.state = state;
    } else {}
    const result = await this.app.mysql.select("renthouses", {
      where,
      offset: (currentPage - 1) * pageSize,
      limit: parseInt(pageSize),
    });
    const total = await this.app.mysql.count("renthouses", where);
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
    return await this.app.mysql.delete("renthouses", {
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
    return await this.app.mysql.update("renthouses", $data, $options);
  }
  // 修改房源经纪人数据接口
  async updateBroker({
    id,
    broker
  }) {
    const $data = {
      broker
    };
    const $options = {
      where: {
        id
      }
    };
    return await this.app.mysql.update("renthouses", $data, $options);
  }

  // 添加新房源
  async create({
    toward, //朝向
    subway, //subway
    lift, //电梯
    house_type, //房型
    way, //way
    img,
    price,
    broker,
    ll,
    building_type, //楼型
    section, //楼段
    extent, //面积
    name, //房名
    brand, //brand
    periods, //期数
    area, //区域
    feature, //特色
    resident, //小区
    useto, //用途
    pay, //支付
    lease, //租期
    renovation, //装修
    status, //装修
  }) {
    const $data = {
      id: idCreator(),
      created_time: new Date().getTime(),
      updated_time: new Date().getTime(),
      toward,
      subway,
      lift,
      house_type,
      way,
      img,
      price,
      broker,
      ll,
      building_type,
      section,
      extent,
      name,
      brand,
      periods,
      area,
      feature,
      resident,
      useto,
      pay,
      lease,
      renovation,
      status,
    };
    return await this.app.mysql.create("renthouses", $data);
  }

  // 修改房源
  async editHouse({
    toward, //朝向
    subway, //subway
    lift, //电梯
    house_type, //房型
    way, //way
    img,
    price,
    broker,
    ll,
    building_type, //楼型
    section, //楼段
    extent, //面积
    name, //房名
    brand, //brand
    periods, //期数
    area, //区域
    feature, //特色
    resident, //小区
    useto, //用途
    pay, //支付
    lease, //租期
    renovation, //装修
    status, //装修
    id
  }) {
    const $data = {
      updated_time: new Date().getTime(),
      toward,
      subway,
      lift,
      house_type,
      way,
      img,
      price,
      broker,
      ll,
      building_type,
      section,
      extent,
      name,
      brand,
      periods,
      area,
      feature,
      resident,
      useto,
      pay,
      lease,
      renovation,
      status,
    };
    const $options = {
      where: {
        id
      }
    };
    return await this.app.mysql.update("renthouses", $data, $options);
  }

  // ------------二手房房源-----------
  async secondIndex({
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
    if (state == "全部") {
      state = ''
    } else if (state) {
      where.state = state;
    } else {}
    const result = await this.app.mysql.select("secondhouses", {
      where,
      offset: (currentPage - 1) * pageSize,
      limit: parseInt(pageSize),
    });
    const total = await this.app.mysql.count("secondhouses", where);
    return {
      data: result,
      total,
      pageSize: Number(pageSize),
      currentPage: Number(currentPage),
    };
  }

  // 修改二手房源状态接口
  async secondUpdate({
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
    return await this.app.mysql.update("secondhouses", $data, $options);
  }


  // 删除二手房源管理销售楼盘数据接口
  async secondDestroy({
    id
  }) {
    return await this.app.mysql.delete("secondhouses", {
      id
    });
  }


  // 修改二手房源经纪人数据接口
  async updatesecondBroker({
    id,
    broker
  }) {
    const $data = {
      broker
    };
    const $options = {
      where: {
        id
      }
    };
    return await this.app.mysql.update("secondhouses", $data, $options);
  }

  // 添加二手房源
  async secondCreate({
    toward, //朝向
    subway, //subway
    lift, //电梯
    house_type, //房型
    img,
    price,
    broker,
    ll,
    building_type, //楼型
    extent, //面积
    name, //房名
    brand, //brand
    periods, //期数
    area, //区域
    feature, //特色
    resident, //小区
    useto, //用途
    renovation, //装修
    status, //装修
  }) {
    const $data = {
      id: idCreator(),
      created_time: new Date().getTime(),
      updated_time: new Date().getTime(),
      toward, //朝向
      subway, //subway
      lift, //电梯
      house_type, //房型
      img,
      price,
      broker,
      ll,
      building_type, //楼型
      extent, //面积
      name, //房名
      brand, //brand
      periods, //期数
      area, //区域
      feature, //特色
      resident, //小区
      useto, //用途
      renovation, //装修
      status, //装修
    };
    return await this.app.mysql.create("secondhouses", $data);
  }

  // 修改房源
  async editHouse({
    toward, //朝向
    subway, //subway
    lift, //电梯
    house_type, //房型
    img,
    price,
    broker,
    ll,
    building_type, //楼型
    extent, //面积
    name, //房名
    brand, //brand
    periods, //期数
    area, //区域
    feature, //特色
    resident, //小区
    useto, //用途
    renovation, //装修
    status, //装修
    id
  }) {
    const $data = {
      updated_time: new Date().getTime(),
      toward, //朝向
      subway, //subway
      lift, //电梯
      house_type, //房型
      img,
      price,
      broker,
      ll,
      building_type, //楼型
      extent, //面积
      name, //房名
      brand, //brand
      periods, //期数
      area, //区域
      feature, //特色
      resident, //小区
      useto, //用途
      renovation, //装修
      status, //装修
    };
    const $options = {
      where: {
        id
      }
    };
    return await this.app.mysql.update("secondhouses", $data, $options);
  }

  //---------- 租房------------

  async getRent({
    pay,
    area,
    price,
    currentPage,
    pageSize,
    resident,
  }) {
    const where = {};
    if (area) {
      // area = area.replace(/(区|县)/, "");
      area = area === "不限" ? "" : area;
      where.area = area;
    }
    if (pay) {
      pay = pay === "不限" ? "" : pay;
      where.pay = pay;
    }
    if (price) {
      price = price ? JSON.parse(price) : {};
      if ((price.min || price.min === 0) && price.max) {
        where.price >= price.min;
        where.price <= price.max;
      } else if (price.min && !price.max) {
        where.price >= price.min;
      }
    }
    if (resident) {
      where.resident = resident;
    }
    const result = await this.app.mysql.select("renthouses", {
      where,
      offset: (currentPage - 1) * pageSize,
      limit: parseInt(pageSize),
    });
    const total = await this.app.mysql.count("renthouses", where);
    return {
      data: result,
      total,
      pageSize: Number(pageSize),
      currentPage: Number(currentPage),
    };
  }



}

module.exports = HouseService;

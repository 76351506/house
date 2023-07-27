/*
 * @Author: heinan
 * @Date: 2023-07-25 19:36:12
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 18:35:17
 */
"use strict";

const { Service } = require("egg");
const { idCreator } = require("../utils");

class ViewService extends Service {
  async create({ uid, categray, mobile, payment }) {
    const $data = {
      id: idCreator(),
      uid,
      categray,
      mobile,
      payment,
      create_time: new Date().getTime(),
    };
    return await this.app.mysql.insert("orders", $data);
  }
  async show({ id }) {
    return await this.app.mysql.get("orders", {
      view_authority_id: id,
    });
  }
  async index() {
    return await this.app.mysql.select("orders");
  }
  async destroy({ id }) {
    return await this.app.mysql.delete("orders", {
      id,
    });
  }
  async update({ id, uid, categray, mobile, payment }) {
    const $data = { id, uid, categray, mobile, payment };
    $data.update_time = new Date().getTime();
    return await this.app.mysql.update("orders", $data);
  }
}

module.exports = ViewService;

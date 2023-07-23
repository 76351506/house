/*
 * @Author: heinan
 * @Date: 2023-07-23 22:50:51
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-23 23:01:08
 */
"use strict";
const Controller = require("egg").Controller;

class Map extends Controller {
  async getMaps() {
    const { ctx } = this;
    const data = await this.app.mysql.query(
      `SELECT * FROM renthouses ORDER BY id DESC`
    );
    var newArea = [];
    // 获取所有区域以及对应数量
    [...new Set(data.map((item) => item.quyu))].forEach((item) => {
      newArea.push({
        title: item,
        house: data.filter((v) => v.quyu === item).length,
        children: [],
      });
    });
    // 获取所有区域对应小区以及数量
    newArea.forEach((item) => {
      [
        ...new Set(
          data
            .filter((item1) => item1.quyu === item.title)
            .map((item2) => item2.xq)
        ),
      ].forEach((item3) => {
        item.children.push({
          title: item3,
          house: data.filter(
            (item4) => item4.quyu === item.title && item4.xq === item3
          ).length,
        });
      });
    });
    ctx.body = {
      code: 200,
      data: newArea,
    };
  }
}

module.exports = Map;

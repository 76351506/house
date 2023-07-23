/*
 * @Author: heinan
 * @Date: 2023-07-23 22:51:06
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-23 23:00:05
 */
"use strict";
const { Controller } = require("egg");

class Housing extends Controller {
  async housing() {
    const { ctx } = this;
    let { area = "", name = "", pageCount = 1, pageSize = 10 } = ctx.query;
    area = area.replace(/(区|县)/, "");
    const house = await this.app.mysql.query("SELECT * FROM renthouses");
    const data = await this.app.mysql.query(
      `SELECT * FROM renthouses WHERE quyu LIKE '%${area}%' AND name LIKE '%${name}%' limit ${
        (pageCount - 1) * pageSize
      },${pageSize}`
    );
    ctx.body = {
      code: 200,
      data: data.length ? data : false,
      total: house.length,
    };
  }

  // 删除房源管理销售楼盘数据接口
  async deleteMarkethouses() {
    const { ctx } = this;
    const { id } = ctx.query;
    await this.app.mysql.delete("renthouses", {
      id,
    });
    ctx.body = {
      code: 200,
      message: "删除成功",
    };
  }

  // 修改房源管理销售楼盘状态接口
  async setMarketHouseStatus() {
    const { ctx } = this;
    const { id, status } = ctx.request.body;
    await this.app.mysql.update("renthouses", {
      id,
      status,
    });
    ctx.body = {
      code: 200,
      message: "修改成功",
    };
  }

  // 获取房源管理页面销售经纪人数据接口
  async setMarketBroker() {
    const { ctx } = this;
    const data = await this.app.mysql.query(
      `SELECT * FROM brokers WHERE state LIKE '%在职%' order by new_house asc`
    );
    ctx.body = {
      code: 200,
      data,
    };
  }

  // 修改房源管理页面销售经纪人数据接口
  async alterMarketBroker() {
    const { ctx } = this;
    const { id, broker } = ctx.request.body;
    await this.app.mysql.update("renthouses", {
      id,
      jjr: broker,
    });
    ctx.body = {
      code: 200,
      message: "修改成功",
    };
  }

  // 二手房
  async secondHousing() {
    const { ctx } = this;
    let { area = "", name = "", pageCount = 1, pageSize = 10 } = ctx.query;
    area = area.replace(/(区|县)/, "");
    const house = await this.app.mysql.query("SELECT * FROM secondhouses");
    const data = await this.app.mysql.query(
      `SELECT * FROM secondhouses WHERE quyu LIKE '%${area}%' AND name LIKE '%${name}%' limit ${
        (pageCount - 1) * pageSize
      },${pageSize}`
    );
    ctx.body = {
      code: 200,
      data: data.length ? data : false,
      total: house.length,
    };
  }

  // 删除二手房源管理销售楼盘数据接口
  async deleteRenthouses() {
    const { ctx } = this;
    const { id } = ctx.query;
    await this.app.mysql.delete("secondhouses", {
      id,
    });
    ctx.body = {
      code: 200,
      message: "删除成功",
    };
  }

  // 修改房源管理房屋租赁状态接口
  async setRentHouseStatus() {
    const { ctx } = this;
    const { id, status } = ctx.request.body;
    await this.app.mysql.update("secondhouses", {
      id,
      status,
    });
    ctx.body = {
      code: 200,
      message: "修改成功",
    };
  }
  // 修改房源管理房屋租赁经纪人数据接口
  async alterRentBroker() {
    const { ctx } = this;
    const { id, broker } = ctx.request.body;
    await this.app.mysql.update("secondhouses", {
      id,
      jjr: broker,
    });
    ctx.body = {
      code: 200,
      message: "修改成功",
    };
  }

  // ----------------------------客户端-------------------------------- //
  //获取租房数据
  async getRenting() {
    const { ctx } = this;
    let {
      zf = "",
      quyu = "",
      jiage,
      page = 1,
      pageNum = 50,
      xq = "",
    } = ctx.query;
    // 转换数据格式(get请求会将对象转为字符串)
    zf = zf === "不限" ? "" : zf;
    quyu = quyu === "不限" ? "" : quyu;
    jiage = jiage ? JSON.parse(jiage) : {};
    // 定义sql语句
    var sql = "";
    if ((jiage.min || jiage.min === 0) && jiage.max) {
      // 区间
      sql = `AND jiage>=${jiage.min} AND jiage<=${jiage.max}`;
    } else if (jiage.min && !jiage.max) {
      // 大于
      sql = `AND jiage>=${jiage.min}`;
    }
    const result = await this.app.mysql.query(
      `SELECT * FROM renthouses WHERE zf LIKE '%${zf}%' AND xq LIKE '%${xq}%' AND quyu LIKE '%${quyu}%' ${sql} ORDER BY id DESC LIMIT 0, ${
        page * pageNum
      }`
    );
    const data = await this.app.mysql.select("renthouses");
    // 筛选所有区域去重
    const area = [...new Set(data.map((item) => item.quyu))];
    // 生成id
    function createRandomId() {
      return (
        (Math.random() * 10000000).toString(16).substr(0, 4) +
        "-" +
        new Date().getTime() +
        "-" +
        Math.random().toString().substr(2, 5)
      );
    }
    // 筛选类型
    var typeArr = [
      {
        title: "户型",
        children: [],
        id: createRandomId(),
      },
      {
        title: "朝向",
        children: [],
        id: createRandomId(),
      },
      {
        title: "楼层",
        children: [],
        id: createRandomId(),
      },
      {
        title: "房屋亮点",
        children: [],
        id: createRandomId(),
      },
    ];
    // 获取去重后的数据
    const fun = (i) => {
      var type;
      switch (i) {
        // 房型
        case 0:
          {
            type = "fangxing";
          }
          break;
        // 朝向
        case 1:
          {
            type = "cx";
          }
          break;
        // 楼层
        case 2:
          {
            type = "lz";
          }
          break;
        // 亮点
        case 3:
          {
            type = "ts";
          }
          break;
        default:
          return;
      }
      // 获取去重后的数组并放入定义的数组中
      [...new Set(data.map((item) => item[type]))].forEach((v) => {
        typeArr[i].children.push({
          statu: false,
          title: v,
          id: createRandomId(),
        });
      });
    };
    // 循环调用
    for (let i = 0; i <= 3; i++) {
      fun(i);
    }
    ctx.body = {
      code: 200,
      data: result,
      area,
      typeArr,
    };
  }
  async getDetail() {
    const { ctx } = this;
    let { id } = ctx.query;
    const post = await this.app.mysql.get("renthouses", {
      id,
    });
    ctx.body = {
      code: 200,
      data: post,
    };
  }
}

module.exports = Housing;

/*
 * @Author: heinan
 * @Date: 2023-07-23 22:51:06
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-23 23:00:05
 */
"use strict";
const {
  Controller
} = require("egg");

class Housing extends Controller {

  async housing() { //get
    const result = await this.ctx.service.housing.index(this.ctx.query);
    if (result.data.length) {
      this.ctx.body = {
        code: 1,
        msg: "查询成功！",
        ...result,
      };
    } else {
      this.ctx.body = {
        code: 0,
        msg: "暂无数据！",
        data: [],
      };
    }
  }

  // 删除房源管理销售楼盘数据接口
  async deleteMarkethouses() { //delete
    const result = await this.ctx.service.housing.destroy(this.ctx.query);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "删除成功！",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "删除失败！",
      };
    }
  }

  // 修改房源管理销售楼盘状态接口
  async setMarketHouseStatus() { //post
    const result = await this.ctx.service.housing.update(this.ctx.request.body);
    // console.log(result);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "修改成功！",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "修改失败！",
      };
    }
  }

  // 修改房源管理页面销售经纪人数据接口
  async alterMarketBroker() { //post
    const result = await this.ctx.service.housing.updateBroker(this.ctx.request.body);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "修改成功！",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "修改失败！",
      };
    }
  }

  async addHouses() { //post
    const result = await this.ctx.service.housing.create(this.ctx.request.body);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "添加成功！",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "添加失败！",
      };
    }
  }

  async editHouses() { //post
    const result = await this.ctx.service.housing.editHouse(this.ctx.request.body);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "修改成功！",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "修改失败！",
      };
    }
  }

  //--------- 二手房----------
  async secondHousing() { //get
    const result = await this.ctx.service.housing.secondIndex(this.ctx.query);
    if (result.data.length) {
      this.ctx.body = {
        code: 1,
        msg: "查询成功！",
        ...result,
      };
    } else {
      this.ctx.body = {
        code: 0,
        msg: "暂无数据！",
        data: [],
      };
    }
  }

  // 删除二手房源管理销售楼盘数据接口
  async deleteRenthouses() { //delete
    const result = await this.ctx.service.housing.secondDestroy(this.ctx.query);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "删除成功！",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "删除失败！",
      };
    }

  }

  // 修改二手房源状态接口
  async setRentHouseStatus() { //post
    const result = await this.ctx.service.housing.secondUpdate(this.ctx.request.body);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "修改成功！",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "修改失败！",
      };
    }
  }
  // 修改房源管理房屋租赁经纪人数据接口
  async alterRentBroker() { //post
    const result = await this.ctx.service.housing.updatesecondBroker(this.ctx.request.body);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "修改成功！",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "修改失败！",
      }
    }
  }

  async addSecondHouses() { //post
    const result = await this.ctx.service.housing.secondCreate(this.ctx.request.body);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "修改成功！",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "修改失败！",
      };
    }
  }
  async editSecondHouses() { //post
    const result = await this.ctx.service.housing.editSecondHouses(this.ctx.request.body);
    if (result.affectedRows) {
      this.ctx.body = {
        code: 1,
        message: "修改成功！",
      };
    } else {
      this.ctx.body = {
        code: 0,
        message: "修改失败！",
      };
    }
  }
  // ----------------------------客户端-------------------------------- //
  //获取租房数据
  async getRenting() { //post
    const result = await this.ctx.service.housing.getRent(this.ctx.query)
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
    var typeArr = [{
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
        case 0: {
          type = "fangxing";
        }
        break;
        // 朝向
      case 1: {
        type = "cx";
      }
      break;
      // 楼层
      case 2: {
        type = "lz";
      }
      break;
      // 亮点
      case 3: {
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
    const {
      ctx
    } = this;
    let {
      id
    } = ctx.query;
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

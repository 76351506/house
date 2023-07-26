"use strict";

const Controller = require("egg").Controller;

class Staff extends Controller {
  async Portlist() {
    const { ctx } = this;
    const data = await this.app.mysql.query(`SELECT * FROM port`);
    ctx.body = {
      code: 200,
      data: data.length ? data : false,
    };
  }
  // 删除订单管理管理路由数据接口
  async delPort() {
    const { ctx } = this;
    const { id } = ctx.query;
    console.log(id, "iiiii");
    const result = await this.app.mysql.query(
      `delete from port where id = '${id}'`
    );
    console.log(result, "result");
    if (result.affectedRows == 1) {
      ctx.body = {
        code: 200,
        message: "删除成功",
      };
    } else {
      ctx.body = {
        code: 401,
        message: "删除失败",
      };
    }
  }
  async PortAdd() {
    const { ctx } = this;
    const { name, num, charge, job, tel } = ctx.request.body;
    console.log(num, "iiiii");
    const result = await this.app.mysql.query(
      `insert into port (name,num,charge,job,tel) values ('${name}','${num}','${charge}','${job}',${tel})`
    );
    console.log(result, "result");
    if (result.affectedRows == 1) {
      ctx.body = {
        code: 200,
        message: "添加成功",
      };
    } else {
      ctx.body = {
        code: 401,
        message: "添加失败",
      };
    }
  }
  async PortEdit() {
    const { ctx } = this;
    const { id, name, num, charge, job, tel } = ctx.request.body;
    console.log(num, "iiiii");
    const result = await this.app.mysql.update("port", {
      id,
      name,
      num,
      charge,
      job,
      tel,
    });
    console.log(result, "result");
    if (result.affectedRows == 1) {
      ctx.body = {
        code: 200,
        message: "编辑成功",
      };
    } else {
      ctx.body = {
        code: 401,
        message: "编辑失败",
      };
    }
  }
  async portSearch() {
    const { ctx } = this;
    const { searchVal } = ctx.query;
    const result = await this.app.mysql.query(
      `select * from port where name = '${searchVal}'`
    );
    console.log(result, "result");
    if (result.length >= 1) {
      ctx.body = {
        code: 200,
        data: result,
      };
    } else {
      ctx.body = {
        code: 401,
        message: "查找失败",
      };
    }
  }

  //员工管理
  async Stafflist() {
    const { ctx } = this;
    const data = await this.app.mysql.query(`SELECT * FROM staff`);
    ctx.body = {
      code: 200,
      data: data.length ? data : false,
    };
  }
  // 删除订单管理管理路由数据接口
  async delStaff() {
    const { ctx } = this;
    const { id } = ctx.query;
    console.log(id, "iiiii");
    const result = await this.app.mysql.query(
      `delete from staff where id = '${id}'`
    );
    console.log(result, "result");
    if (result.affectedRows == 1) {
      ctx.body = {
        code: 200,
        message: "删除成功",
      };
    } else {
      ctx.body = {
        code: 401,
        message: "删除失败",
      };
    }
  }
  async StaffAdd() {
    const { ctx } = this;
    const password = Math.random().toString().substring(3, 9);
    const { name, jobNum, job, tel, port } = ctx.request.body;
    console.log(jobNum, "iiiii");
    const result = await this.app.mysql.query(
      `insert into staff (name,jobNum,password,job,tel,port) values ('${name}','${jobNum}','${password}','${job}','${tel}','${port}')`
    );
    console.log(result, "result");
    if (result.affectedRows == 1) {
      ctx.body = {
        code: 200,
        message: "添加成功",
      };
    } else {
      ctx.body = {
        code: 401,
        message: "添加失败",
      };
    }
  }
  async StaffEdit() {
    const { ctx } = this;
    const { id, name, jobNum, password, job, tel, port } = ctx.request.body;
    console.log(jobNum, "iiiii");
    const result = await this.app.mysql.update("staff", {
      id,
      name,
      jobNum,
      password,
      job,
      tel,
      port,
    });
    console.log(result, "result");
    if (result.affectedRows == 1) {
      ctx.body = {
        code: 200,
        message: "编辑成功",
      };
    } else {
      ctx.body = {
        code: 401,
        message: "编辑失败",
      };
    }
  }
  async staffSearch() {
    const { ctx } = this;
    const { searchVal } = ctx.query;
    const result = await this.app.mysql.query(
      `select * from staff where name = '${searchVal}'`
    );
    console.log(result, "result");
    if (result.length >= 1) {
      ctx.body = {
        code: 200,
        data: result,
      };
    } else {
      ctx.body = {
        code: 401,
        message: "查找失败",
      };
    }
  }
}
module.exports = Staff;

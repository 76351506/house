/*
 * @Author: heinan
 * @Date: 2020-07-16 11:33:19
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 11:18:02
 */
"use strict";

const { Service } = require("egg");
const { idCreator } = require("../utils");

class ViewAuthorityService extends Service {
  async create({ identity_id, view_authority_id }) {
    const $data = {
      identity_id,
      view_authority_id,
      identity_view_authority_relation_id: idCreator(),
    };
    return await this.app.mysql.insert(
      "identity_view_authority_relation",
      $data
    );
  }
  async index() {
    return await this.app.mysql.select("identity_view_authority_relation");
  }
  async destroy({ id }) {
    return await this.app.mysql.delete("identity_view_authority_relation", {
      identity_view_authority_relation_id: id,
    });
  }
  async update({ id, identity_id, view_authority_id }) {
    const $data = {
      identity_id,
      view_authority_id,
    };
    const $options = { where: { identity_view_authority_relation_id: id } };
    return await this.app.mysql.update(
      "identity_view_authority_relation",
      $data,
      $options
    );
  }
  async getViewAuthByIdentityId({ id }) {
    const $sql = `SELECT * FROM identity_view_authority_relation,view_authority,identity WHERE identity_view_authority_relation.identity_id=identity.identity_id AND identity_view_authority_relation.view_authority_id=view_authority.view_authority_id AND identity.identity_id='${id}'`;
    return await this.app.mysql.query($sql);
  }
  async deleteViewAuthByIdentityId(identity_id) {
    return await this.app.mysql.delete("identity_view_authority_relation", {
      identity_id,
    });
  }
  async setViewAuthByIdentityList({ identity_id, view_authority_ids }) {
    if (view_authority_ids.length) {
      this.deleteViewAuthByIdentityId(identity_id);
      const result = view_authority_ids.map(async (view_authority_id) => {
        return this.create({ identity_id, view_authority_id });
      });
      // 判断view_authority_ids中每项的执行结果如果都成功返回true，否则返回false
      return Promise.all(result).then((task) =>
        task.every((t) => t.affectedRows > 0)
      )
        ? { affectedRows: 1 }
        : { affectedRows: 0 };
    } else {
      return Promise.resolve({ affectedRows: 0 });
    }
  }
}

module.exports = ViewAuthorityService;

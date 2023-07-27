/*
 * @Author: heinan
 * @Date: 2020-07-16 11:33:19
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 12:06:38
 */
"use strict";

const { Service } = require("egg");
const { idCreator } = require("../utils");

class ApiAuthorityService extends Service {
  async create({ identity_id, api_authority_id }) {
    const $data = {
      identity_id,
      api_authority_id,
      identity_api_authority_relation_id: idCreator(),
    };
    return await this.app.mysql.insert(
      "identity_api_authority_relation",
      $data
    );
  }
  async index() {
    return await this.app.mysql.select("identity_api_authority_relation");
  }
  async destroy({ id }) {
    return await this.app.mysql.delete("identity_api_authority_relation", {
      identity_api_authority_relation_id: id,
    });
  }
  async update({ id, identity_id, api_authority_id }) {
    const $data = {
      identity_id,
      api_authority_id,
    };
    const $options = { where: { identity_api_authority_relation_id: id } };
    return await this.app.mysql.update(
      "identity_api_authority_relation",
      $data,
      $options
    );
  }
  async getApiAuthByIdentityId({ id }) {
    const $sql = `SELECT * FROM identity_api_authority_relation,api_authority,identity WHERE identity_api_authority_relation.identity_id=identity.identity_id AND identity_api_authority_relation.api_authority_id=api_authority.api_authority_id AND identity.identity_id='${id}'`;
    return await this.app.mysql.query($sql);
  }
  async deleteApiAuthByIdentityId(identity_id) {
    return await this.app.mysql.delete("identity_api_authority_relation", {
      identity_id,
    });
  }
  async setApiAuthByIdentityList({ identity_id, api_authority_ids }) {
    if (api_authority_ids.length) {
      this.deleteApiAuthByIdentityId(identity_id);
      const result = api_authority_ids.map(async (api_authority_id) => {
        return this.create({ identity_id, api_authority_id });
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

module.exports = ApiAuthorityService;

/*
 * @Author: heinan
 * @Date: 2020-07-16 11:33:19
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 11:49:37
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
}

module.exports = ApiAuthorityService;

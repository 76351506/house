/*
 * @Author: heinan
 * @Date: 2020-07-16 11:33:19
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 11:53:43
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
}

module.exports = ViewAuthorityService;

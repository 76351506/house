/*
 * @Author: heinan
 * @Date: 2023-07-27 16:14:21
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 18:33:16
 */

const { Controller } = require("egg");
const { nameCreator } = require("../utils");
const path = require("path");
const fs = require("fs/promises");

class CommonController extends Controller {
  async upload() {
    const file = this.ctx.request.files[0];
    const filePath = path.normalize(file.filepath);
    const filename = nameCreator(file.filename);
    const error = await this.ctx.service.common.upload(filePath, filename);
    if (!error) {
      this.ctx.body = {
        code: 1,
        message: "上传成功！",
        url: `http://localhost:7001/upload/${filename}`,
      };
      await fs.unlink(filePath);
    } else {
      this.ctx.body = {
        code: 1,
        message: "上传成功！",
        error,
      };
    }
  }
}

module.exports = CommonController;

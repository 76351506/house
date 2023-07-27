/*
 * @Author: heinan
 * @Date: 2023-07-27 16:50:37
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 17:08:39
 */
const { Service } = require("egg");
const fs = require("fs");
const path = require("path");

class CommonService extends Service {
  async upload(filepath, filename) {
    const file = fs.readFileSync(filepath);
    const uploadPath = path.join(process.cwd(), "app/public/upload", filename);
    return fs.writeFileSync(uploadPath, file);
  }
}
module.exports = CommonService;

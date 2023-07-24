/*
 * @Author: heinan
 * @Date: 2023-07-24 15:05:39
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 16:01:07
 */
const checkWhiteList = require("../utils/checkWhiteList");
module.exports = (options) => {
  return async (ctx, next) => {
    let { path: url, method } = ctx;
    let urlArr = url.split("/");
    let pathUrl = urlArr.length > 2 ? `/${urlArr[1]}` : url;
    // 验证超级白名单
    if (checkWhiteList(ctx.path, ctx.method, ctx.app.config.whiteList)) {
      await next();
      return;
    }
    // 验证身份白名单
    if (checkWhiteList(pathUrl, ctx.method, ctx.app.config.identityWhiteList)) {
      await next();
      return;
    }
    let { id } = ctx.token;

    let result = await ctx.service.user.isUserApiAuthority({
      url: pathUrl,
      method,
      id,
    });
    if (!result) {
      ctx.body = { msg: "身份权限不足", code: 0 };
      return;
    }
    await next();
  };
};

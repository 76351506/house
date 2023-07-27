/*
 * @Author: heinan
 * @Date: 2023-07-24 14:48:54
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-27 18:34:31
 */
const { verifyToken } = require("../utils");
const checkWhiteList = require("../utils/checkWhiteList");

module.exports = () => {
  return async (ctx, next) => {
    // 验证超级白名单
    if (checkWhiteList(ctx.path, ctx.method, ctx.app.config.whiteList)) {
      await next();
      return;
    }
    // 验证登录白名单
    if (checkWhiteList(ctx.url, ctx.method, ctx.app.config.loginWhiteList)) {
      await next();
      return;
    }
    let Authorization = unescape(ctx.get("authorization"));
    if (!Authorization) {
      ctx.status = 401;
      ctx.body = { msg: "没有权限信息", code: 0 };
      return;
    }
    let userInfo = null;
    try {
      userInfo = await verifyToken(Authorization);
    } catch (err) {
      ctx.status = 401;
      ctx.body = { msg: "权限信息可能被篡改", code: 0 };
      return;
    }
    // 验证token是否过期
    let { signTime } = userInfo;
    let nowTime = new Date().getTime();
    let time = (nowTime - signTime) / 1000 / 60 / 60;
    if (time >= 5) {
      ctx.status = 401;
      ctx.body = { msg: "权限信息过期", code: 0 };
      return;
    }
    // 把用户信息存入ctx.token中
    ctx.token = userInfo;
    await next();
  };
};

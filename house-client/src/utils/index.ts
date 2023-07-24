/*
 * @Author: heinan
 * @Date: 2021-07-22 15:45:34
 * @Last Modified by:   heinan
 * @Last Modified time: 2021-07-22 15:45:34
 */

export const resolve = function (url: string) {
  // 区分开发环境、生产环境
  const baseUlr =
    process.env.NODE_ENV === 'production'
      ? 'http://39.105.98.45/api/v1'
      : "'http://39.105.98.45/api/v1'";
  return baseUlr + url;
};

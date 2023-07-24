/*
 * @Author: heinan
 * @Date: 2023-07-24 15:27:29
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 16:26:24
 */
function checkWhiteList(url, method, whiteList) {
  let result = whiteList.findIndex((item) => {
    if (typeof item.url === "string") {
      return (
        item.url === url && (item.method === "any" || item.method === method)
      );
    }
    if (item.url instanceof RegExp) {
      return (
        item.url.test(url) && (item.method === "any" || item.method === method)
      );
    }
  });
  return result !== -1;
}
module.exports = checkWhiteList;

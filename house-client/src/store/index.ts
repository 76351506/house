// @ts-ignore
/* eslint-disable */

/*
 * @Author: heinan
 * @Date: 2021-07-22 15:36:44
 * @Last Modified by: heinan
 * @Last Modified time: 2021-07-22 16:37:28
 */

const modelCreator = function () {
  const store = {};
  const context = require.context('./model', false, /\.(js|ts)$/);
  const modelList = context.keys();
  modelList.forEach((model) => {
    const namespace = context(model).default.namespace;
    store[namespace] = context(model).default;
  });
  return store;
};

export default modelCreator();

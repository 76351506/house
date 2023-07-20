/*
 * @Author: heinan
 * @Date: 2023-07-19 22:03:52
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-20 21:56:23
 */
const { defineConfig } = require('@vue/cli-service')
const dynamicProxyName = process.env.VUE_APP_API_URL

module.exports = defineConfig({
  transpileDependencies: false,
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  devServer: {
    // 配置host
    host: 'localhost',
    // 端口号
    port: 8080,
    // 跨域代理
    proxy: {
      [dynamicProxyName]: {
        target: 'http://localhost:7001',
        changeOrigin: true,
        pathRewrite: {
          [`^${dynamicProxyName}`]: ''
        }
      }
    }
  }
})

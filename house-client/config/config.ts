import { defineConfig } from 'umi';
import routes from './routes';
import path from 'path';

export default defineConfig({
  base: '/',
  //生成hash文件名
  hash: true,
  //hash路由
  history: {
    type: 'browser',
  },
  // 暂时关闭
  pwa: false,
  dva: {
    immer: true, // 表示是否启用 immer 以方便修改 reducer
    hmr: true, // 表示是否启用 dva model 的热更新
  },
  // sass配置
  sass: {},
  nodeModulesTransform: {
    type: 'none',
  },
  // 路由配置
  routes,
  //快速刷新
  fastRefresh: {},
  // 别名配置
  alias: {
    '@': path.join(process.cwd(), 'src'),
  },
  // 代理配置(跨域处理) http://10.98.98.142:8080/
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});

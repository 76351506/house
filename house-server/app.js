/*
 * @Author: heinan
 * @Date: 2023-07-20 19:26:02
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-21 12:06:37
 */
const http = require("http");
const NodeMediaServer = require("node-media-server");

const { Server } = require("socket.io");
const app = require("express")();
const httpServer = http.createServer(app);

class AppBootHook {
  constructor(app) {
    this.app = app;
    this.roomList = {};
    this.userList = [];
  }
  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
    // 例如：参数中的密码是加密的，在此处进行解密
  }

  async didLoad() {
    // 所有的配置已经加载完毕
    // 可以用来加载应用自定义的文件，启动自定义的服务

    if (!this.app.nms) {
      // 创建nms服务，获取nms配置对象
      this.app.nms = new NodeMediaServer(this.app.config.mediaServer);
      // 创建socket服务
      const io = new Server(httpServer, {
        cors: true,
      });
      const self = this;
      httpServer.listen(3000, () => {
        console.log("server is running at http://127.0.0.1:3000");
      });

      io.on("connection", (socket) => {
        // 用户加入
        socket.on("join", function (user) {
          // 通过emit定向广播
          if (self.userList.includes(user)) return;
          self.userList.push(user);
          socket.emit("announcement", `"用户 ${user} 加入了聊天室!`);
        });
        socket.on("send.message", function (user, msg) {
          // 通过全局广播
          console.log(msg);
          io.emit("send.message", user, msg);
        });
        socket.on("disconnect", function () {
          if (socket.nickname) {
            socket.broadcast.emit(
              "send.message",
              "用户",
              socket.nickname + "已离开聊天室!"
            );
          }
        });
      });

      this.app.nms.run();
      this.app.nms.on("preConnect", (id, args) => {
        console.log(
          "[NodeEvent on preConnect]",
          `id=${id} args=${JSON.stringify(args)}`
        );
        // let session = nms.getSession(id);
        // session.reject();
      });

      this.app.nms.on("postConnect", (id, args) => {
        console.log(
          "[NodeEvent on postConnect]",
          `id=${id} args=${JSON.stringify(args)}`
        );
      });

      this.app.nms.on("doneConnect", (id, args) => {
        console.log(
          "[NodeEvent on doneConnect]",
          `id=${id} args=${JSON.stringify(args)}`
        );
      });

      this.app.nms.on("prePublish", (id, StreamPath, args) => {
        console.log(
          "[NodeEvent on prePublish]",
          `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
        );
        // let session = nms.getSession(id);
        // session.reject();
      });

      this.app.nms.on("postPublish", (id, StreamPath, args) => {
        console.log(
          "[NodeEvent on postPublish]",
          `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
        );
      });

      this.app.nms.on("donePublish", (id, StreamPath, args) => {
        console.log(
          "[NodeEvent on donePublish]",
          `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
        );
      });

      this.app.nms.on("prePlay", (id, StreamPath, args) => {
        console.log(
          "[NodeEvent on prePlay]",
          `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
        );
        // let session = nms.getSession(id);
        // session.reject();
      });

      this.app.nms.on("postPlay", (id, StreamPath, args) => {
        console.log(
          "[NodeEvent on postPlay]",
          `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
        );
      });

      this.app.nms.on("donePlay", (id, StreamPath, args) => {
        console.log(
          "[NodeEvent on donePlay]",
          `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`
        );
      });
    }
  }

  async willReady() {
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
    // 例如：从数据库加载数据到内存缓存
    //   this.app.cacheData = await this.app.model.query(QUERY_CACHE_SQL);
  }

  async didReady() {
    // 应用已经启动完毕
    //   const ctx = await this.app.createAnonymousContext();
    //   await ctx.service.Biz.request();
  }

  async serverDidReady() {
    // http / https server 已启动，开始接受外部请求
    // 此时可以从 app.server 拿到 server 的实例
    //   this.app.server.on('timeout', socket => {
    //     // handle socket timeout
    //   });
  }
}
module.exports = AppBootHook;

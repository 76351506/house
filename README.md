## 项目开发全流程

- 需求阶段
  - 产生需求、产生想法、产生创意、产生点子
  - 需求分析
    - 需求意图 （需求调研）
      - 需求收集
        - 问卷（线上、线下）
        - 先辈、前辈
      - 需求优先级 （项目分期、请示汇报、加人）
    - 同业对比 （同行业需求的对比）
      - 优势
      - 劣势
    - 市场需求分析 （MRD）
    - 竞品分析 （我们打造的产品与竞品的分析-《竞品分析报告》）
    - 风险控制 （风评报告）
    - 需求分析说明书 （PRD product require document）
    - 需求评审
      - 领导、项目经理、产品经理、研发
- 立项
  - 项目经理排期
  - 项目经理确认预算
  - 项目启动大会
  - 如果涉及到第三方，签署合同（30%定金）
- 开发阶段
  - 根据需求分解任务
    - 需求梳理
    - 根据排期分配任务到某人某天
  - 开发
  - 测试
    - 自测
    - 黑盒测试 （性能）
    - 白盒测试（功能测试、单元测试）
    - 自动化测试
  - FSD 功能详细说明书
- 交付阶段
  - 提供各种文档
    - 软件需求设计说明书
    - 测试报告
    - 验收报告
    - 使用说明书（手册）
  - 交付
    - 验收、上线
  - 项目总结、尾款

## 语言分类

- 低级语言 （机器语言）
- 高级语言
  -

## 名词

- UI 用户界面（USER INTERFACE）
- FE 前端 （FRONT END）

## 作业 1

- 项目开发全流程脑图，提交 xmind 源文件
- 完成第一周的项目计划

## 项目开发

alimflexible + pxtorem

### 问题：

#### githook 插件在多文件目录下不能生成 .husky 目录的解决办法

## 答辩准备内容

- 产出物
  - 项目源代码
  - 其他文档性资料
    - 答辩 ppt （组长分配给组员任务，统一汇总）
      - 需求分析
      - 项目拆分，具体负责人 例如：张三负责某某几个模块的开发
      - 技术选型、技术架构
      - 核心代码展示、效果展示
    - 产出需求文档
    - 产出原型交互
    - 软件需求规格说明书
    - 数据库设计
    - 测试用例、测试报告
    - 上线申请
    - 运维、用户使用手册、用户使用说明书

## Git

概念：分布式版本控制工具
竞品： - svn (集中式版本控制工具) - tfs（集中式版本控制工具）

### 获取代码

```shell
git pull
git fetch
git merge
```

### 分支

```shell
查看远程分支
git branch -a
创建分支
git branch <branchname>
切换分支
git checkout <branchname>
创建并切换分支
git checkout -b <branchname>
git branch 查看分支
删除分支
git branch -d <branchname>
强制删除分支
git branch -D <branchname>
```
#### rebase
```shell
git rebase
git rebase --continue
git rebase --skip
```

### 重置
#### 未commit要撤回修改
git checkout .  撤回所有文件修改
git checkout a.js 撤回某个文件修改
#### 已commit要撤回
git log 查看最新的提交的某个log
git reset --hard < 7762f02e2ae13a57>

## 路由模式
- history: createWebHistory(process.env.BASE_URL),
- history: createWebHashHistory(process.env.BASE_URL),


## vue2&vue3区别
- 路由模式的设置
- 生命周期的不同
  - beforeCreate、 created vue3没有，通过setup来代替
  - 其他Vue2生命周期添加 on前缀:
    - onBeforeMounted
    - onMounted
    - onBeforeUpdate
    - onUpdated
    - beforeDestory  => onBeforeUnmount
    - destoryed  => onUnmount
    - activated => onActivated
    - deactivated => onDeactivated  
  - onRenderTrack
  - onRenderTrigger
  - onErrorCaptured
## 路由实现原理
### 路由获取参数
- this.$router this.$route
- useRouter useRoute

## API
 - 跳转
  - path
  - name
- 声明路由方式
  - path
  - name
- 路由传参
  - router-link
    - params
    - state
    - 动态路由  /user/:id
  - js方式
    - params
    - state
    - 动态路由  /user/:id
- 路由重定向
- 导航守卫
  - 全局
  - 路由
  - 组件独享
- 路由meta 元信息
- 路由 transition


## 完整的导航解析流程
导航被触发。
在失活的组件里调用 beforeRouteLeave 守卫。
调用全局的 beforeEach 守卫。
在重用的组件里调用 beforeRouteUpdate 守卫(2.2+)。
在路由配置里调用 beforeEnter。
解析异步路由组件。
在被激活的组件里调用 beforeRouteEnter。
调用全局的 beforeResolve 守卫(2.5+)。
导航被确认。
调用全局的 afterEach 钩子。
触发 DOM 更新。
调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。
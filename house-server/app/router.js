/*
 * @Author: heinan
 * @Date: 2023-07-20 19:06:56
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-24 16:10:16
 */

module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.home.index);

  // 审核列表
  // router.get("/audit", controller.audit.audit);
  // router.delete("/audit", controller.audit.delAudit);
  // router.post("/set/audit", controller.audit.setAudit);
  router.resources("audit", "/api/v1/audit", controller.audit);
  router.resources("identity", "/api/v1/identity", controller.identity);
  router.resources("api", "/api/v1/api", controller.api);
  router.resources("view", "/api/v1/view", controller.view);
  router.resources("apiAuth", "/api/v1/apiAuth", controller.apiAuth);
  router.resources("viewAuth", "/api/v1/viewAuth", controller.viewAuth);
  router.resources("broker", "/api/v1/broker", controller.broker);

  // 根据用户id获取用户身份
  router.get("/getIdentityById/:id", controller.identity.getIdentityById);
  // 根据用户id对应的身份权限identity_id获取对应的视图权限
  router.get(
    "/getViewAuthByIdentityId/:id",
    controller.viewAuth.getViewAuthByIdentityId
  );
  // 根据用户id对应的身份权限identity_id获取对应的接口权限
  router.get(
    "/getApiAuthByIdentityId/:id",
    controller.apiAuth.getApiAuthByIdentityId
  );

  // 用户接口
  router.post("/user/login", controller.user.login);
  router.post("/user/registry", controller.user.registry);
  // 获取用户列表
  router.get("/userInfo", controller.userInfo.userInfo);
  // 删除用户
  router.delete("/delUser", controller.userInfo.delUser);
  // 获取左侧菜单栏数据
  router.get("/sider", controller.home.sider);

  // 获取资讯列表
  router.get("/information", controller.information.information);
  // 资讯管理删除接口
  router.delete("/del/information", controller.information.delInformation);
  // 修改资讯状态接口
  router.post("/set/information", controller.information.setInformation);
  // 获取订单列表
  router.get("/order", controller.order.order);
  // 订单管理删除接口
  router.delete("/del/order", controller.order.delOrder);

  // 获取房源列表
  router.get("/housing", controller.housing.housing);
  // 销售楼盘删除接口
  router.delete("/deleteMarkethouses", controller.housing.deleteMarkethouses);
  // 修改销售楼盘状态接口
  router.post("/setMarketHouseStatus", controller.housing.setMarketHouseStatus);
  // 获取房源管理页面销售经纪人数据接口
  router.get("/setMarketBroker", controller.housing.setMarketBroker);
  // 修改房源管理页面销售经纪人数据接口
  router.post("/alterMarketBroker", controller.housing.alterMarketBroker);
  // 获取二手房源列表
  router.get("/second/housing", controller.housing.secondHousing);
  // 房屋租赁删除接口
  router.delete("/deleteRenthouses", controller.housing.deleteRenthouses);
  // 修改房屋租赁状态接口
  router.post("/setRentHouseStatus", controller.housing.setRentHouseStatus);
  // 修改房源管理房屋租赁经纪人数据接口
  router.post("/alterRentBroker", controller.housing.alterRentBroker);
  // 获取团购列表
  router.get("/group", controller.group.group);
  // 删除团购列表
  router.delete("/del/group", controller.group.delGroup);
  // 设置团购列表
  router.post("/set/group", controller.group.setGroup);
  // 获取直播列表
  router.get("/live", controller.live.live);
  // 删除直播
  router.delete("/delLive", controller.live.delLive);
  // 修改直播
  router.post("/updateLive", controller.live.updateLive);

  // ----------------------------客户端（移动）-------------------------------- //
  // 获取房源
  router.get("/renting", controller.housing.getRenting);
  // 获取房源详情
  router.get("/detail", controller.housing.getDetail);
  // 获取地图所有有房的列表
  router.get("/mapList", controller.map.getMaps);
};

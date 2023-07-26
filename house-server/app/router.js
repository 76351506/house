/*
 * @Author: heinan
 * @Date: 2023-07-20 19:06:56
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-26 09:58:46
 */

module.exports = (app) => {
  const {
    router,
    controller
  } = app;
  router.get("/", controller.home.index);
  // 审核列表
  router.resources("audit", "/api/v1/audit", controller.audit);
  router.resources("identity", "/api/v1/identity", controller.identity);
  router.resources("api", "/api/v1/api", controller.api);
  router.resources("view", "/api/v1/view", controller.view);
  router.resources("apiAuth", "/api/v1/apiAuth", controller.apiAuth);
  router.resources("viewAuth", "/api/v1/viewAuth", controller.viewAuth);
  router.resources("broker", "/api/v1/broker", controller.broker);
  // 资讯列表
  router.resources("infos", "/api/v1/infos", controller.infos);
  router.resources("order", "/api/v1/order", controller.order);
  router.resources("group", "/api/v1/group", controller.group);
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

  /**
   * 获取用户列表
   */
  router.get("/getUserList", controller.user.getUserList);
  /**
   * 增加用户
   */
  router.post("/addUserInfo", controller.user.addUserInfo);
  /**
   * 编辑用户信息
   */
  router.post("/updateUserInfo", controller.user.updateUserInfo);
  /**
   * 删除用户
   */
  router.delete("/delUser", controller.user.delUser);

  // 获取左侧菜单栏数据
  router.get("/sider", controller.home.sider);

  //部门管理
  router.get("/staff/portList", controller.staff.Portlist); //获取部门列表
  router.get("/staff/portDel", controller.staff.delPort); //删除部门
  router.post("/staff/portAdd", controller.staff.PortAdd); //添加部门
  router.get("/staff/portSearch", controller.staff.portSearch); //查找部门
  router.post("/staff/portEdit", controller.staff.PortEdit); //添加部门
  //员工管理
  router.get("/staff/staffList", controller.staff.Stafflist); //获取员工列表
  router.get("/staff/staffDel", controller.staff.delStaff); //删除员工
  router.post("/staff/staffAdd", controller.staff.StaffAdd); //添加员工
  router.get("/staff/staffSearch", controller.staff.staffSearch); //查找员工
  router.post("/staff/staffEdit", controller.staff.StaffEdit); //添加员工

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

  //----------------房源--------------- //

  // 获取房源列表
  router.get("/housing", controller.housing.housing);
  // 添加房源
  router.post("/addHouse", controller.housing.addHouses);
  // 编辑
  router.post("/editHouse", controller.housing.addHouses);
  // 销售楼盘删除接口
  router.delete("/deleteMarkethouses", controller.housing.deleteMarkethouses);
  // 修改销售楼盘状态接口
  router.post("/setMarketHouseStatus", controller.housing.setMarketHouseStatus);
  // 修改房源管理页面销售经纪人数据接口
  router.post("/alterMarketBroker", controller.housing.alterMarketBroker);
  // 获取二手房源列表
  router.get("/second/housing", controller.housing.secondHousing);
  // 添加二手房
  router.post("/addSecondHouse", controller.housing.addSecondHouses);
  // 修改二手房
  router.post("/editSecondHouse", controller.housing.editSecondHouses);
  // 房屋二手房删除接口
  router.delete("/deleteRenthouses", controller.housing.deleteRenthouses);
  // 修改二手房状态接口
  router.post("/setRentHouseStatus", controller.housing.setRentHouseStatus);
  // 修改二手房经纪人数据接口
  router.post("/alterRentBroker", controller.housing.alterRentBroker);
  // 获取直播列表
  router.get("/live", controller.live.live);
  // 删除直播
  router.delete("/delLive", controller.live.delLive);
  // 修改直播
  router.post("/updateLive", controller.live.updateLive);

  // ----------------------------客户端（移动）-------------------------------- //
  // 获取房源
  router.get("/renting", controller.housing.getRenting);
  // 获取地图所有有房的列表
  router.get("/mapList", controller.map.getMaps);
};

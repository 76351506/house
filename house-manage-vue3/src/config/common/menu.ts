/*
 * @Author: heinan
 * @Date: 2023-06-27 15:38:54
 * @Last Modified by: heinan
 * @Last Modified time: 2023-07-25 10:34:53
 */
import { AppManageType } from '@/interface/model/app'

const menuConfig: Array<AppManageType.MenuItemForSider> = [
  {
    key: 'sub1',
    icon: 'UserOutlined',
    title: '用户管理',
    // name: 'UserManage',
    children: []
  },
  {
    key: 'sub2',
    icon: 'PictureOutlined',
    // name: 'CarouselManage',
    title: '焦点图管理',
    children: [
      // {
      //   icon: 'PictureOutlined',
      //   key: 'carousel',
      //   name: 'CarouselManage',
      //   title: '焦点图列表'
      // }
    ]
  },
  {
    key: 'sub3',
    icon: 'BarsOutlined',
    // name: 'CategaryManage',
    title: '分类管理',
    children: []
  },
  {
    key: 'sub4',
    icon: 'ShopOutlined',
    // name: 'GoodsManage',
    title: '商品管理',
    children: []
  },
  {
    key: 'sub5',
    icon: 'DeploymentUnitOutlined',
    title: '数据可视化',
    children: [
      {
        icon: 'PieChartOutlined',
        key: 'pieCharts',
        name: 'VisualPieCharts',
        title: '饼图'
      },
      {
        icon: 'BarChartOutlined',
        key: 'barCharts',
        name: 'VisualBarCharts',
        title: '柱状图'
      },
      {
        icon: 'LineChartOutlined',
        key: 'lineCharts',
        name: 'VisualLineCharts',
        title: '折线图'
      }
    ]
  },
  {
    key: 'sub6',
    icon: 'DeploymentUnitOutlined',
    title: '聊天室',
    children: [
      {
        icon: 'LineChartOutlined',
        key: 'lineCharts',
        name: 'ChatRoom',
        title: '聊天室'
      }
    ]
  },
  {
    key: 'sub7',
    icon: 'DeploymentUnitOutlined',
    title: '虚拟视觉',
    children: [
      // {
      //   icon: 'PieChartOutlined',
      //   key: 'roomManage',
      //   name: 'RoomManage',
      //   title: 'VR看房'
      // }
    ]
  },
  {
    key: 'sub8',
    icon: 'DeploymentUnitOutlined',
    title: '系统设置',
    children: [
      {
        icon: 'PieChartOutlined',
        key: 'identity',
        name: 'Identity',
        title: '身份列表'
      },
      {
        icon: 'PieChartOutlined',
        key: 'viewManage',
        name: 'ViewManage',
        title: '视图管理'
      },
      {
        icon: 'PieChartOutlined',
        key: 'apiManage',
        name: 'ApiManage',
        title: '接口管理'
      },
      {
        icon: 'PieChartOutlined',
        key: 'viewAuthority',
        name: 'ViewAuthority',
        title: '设置视图权限'
      },
      {
        icon: 'PieChartOutlined',
        key: 'apiAuthority',
        name: 'ApiAuthority',
        title: '设置接口权限'
      }
    ]
  }
]

export default menuConfig

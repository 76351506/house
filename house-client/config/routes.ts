/*
 * @Author: heinan
 * @Date: 2021-07-16 11:52:02
 * @Last Modified by: heinan
 * @Last Modified time: 2021-07-16 17:03:45
 */

export default [
  {
    path: '/',
    component: '@/components/layout/index',
    wrappers: ['@/hoc/oauth'],
    routes: [
      {
        path: '/',
        redirect: '/home',
        exact: true,
      },
      { path: '/home', title: '主页', component: '@/pages/home' },
      {
        path: '/firsthand',
        title: '一手房',
        component: '@/pages/firsthand',
        routes: [
          {
            exact: true,
            title: '一手房详情',
            path: '/firsthand/:id.jsp',
            component: '@/pages/firsthand/[id$]',
          },
        ],
      },
      { path: '/secondhand', title: '二手房', component: '@/pages/secondhand' },
    ],
  },
];

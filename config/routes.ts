export default [
  { path: '/user', layout: false, routes: [
    { path: '/user/login', component: './User/Login' },
    { path: '/user/register', component: './User/Register' }

    ] },
  { path: '/',redirect :'/add_chart' },
  { path: '/add_chart',name:'智能分析',icon: 'barChart',component: './AddChart' },
  { path: '/add_chart_async',name:'智能分析(异步)',icon: 'barChart',component: './AddChartAsync' },
  { path: '/my_chart',name:'我的图表',icon: 'pieChart',component: './MyChart' },
  // { path: '/user',name:'退出',icon: 'pieChart',component: './User/Exsist' },



  {
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', component: './Admin' },
    ],
  },
  { icon: 'table', path: '/list', component: './TableList' },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];

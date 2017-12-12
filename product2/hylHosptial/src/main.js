import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import axios from 'axios'
//import NProgress from 'nprogress'//页面顶部进度条
//import 'nprogress/nprogress.css'

import Login from './pages/Login.vue'
import Home from './pages/Home.vue'
import Main from './pages/Main.vue'
import Table from './pages/nav1/Table.vue'
import Form from './pages/nav1/Form.vue'
import user from './pages/nav1/user.vue'
import Page4 from './pages/nav2/Page4.vue'
import Page5 from './pages/nav2/Page5.vue'
import Page6 from './pages/nav3/Page6.vue'
import deptTable from './pages/sys/deptTable.vue'
import api from './fetch/api'
// import echarts from './pages/charts/echarts.vue'

// start mock
import Mock from './mock';





/** 把一些公共方法或者属性注入到vue.prototype上面 */
const addVueInstanceMethod = {
  tool,
  api
}
Object.assign(Vue.prototype, addVueInstanceMethod)

Mock.bootstrap();

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(axios)

//NProgress.configure({ showSpinner: false });

const routes = [
  {
    path: '/login',
    component: Login,
    hidden: true//不显示在导航中
  },
  //{ path: '/main', component: Main },
  {
    path: '/',
    component: Home,
    name: '系统管理',
    iconCls: 'el-icon-message',//图标样式class
    children: [
      //{ path: '/main', component: Main },
      { path: '/deptTable', component: deptTable, name: '部门管理' },
      { path: '/form', component: Form, name: '用户管理' },
      { path: '/user', component: user, name: '角色管理' },
      { path: '/table', component: Table, name: '资源管理' },
      { path: '/form', component: Form, name: '字典管理' },

    ]
  },
  {
    path: '/',
    component: Home,
    name: '运营管理',
    iconCls: 'fa fa-id-card-o',
    children: [
      { path: '/page4', component: Page4, name: '医院管理' },
      { path: '/page5', component: Page5, name: '订单查询' },
      { path: '/user', component: user, name: '财务报表' },

    ]
  },
  {
    path: '/',
    component: Home,
    name: '医院端',
    iconCls: 'fa fa-id-card-o',
    children: [
      { path: '/page4', component: Page4, name: '基本信息维护' },
      { path: '/page5', component: Page5, name: '科室信息维护' },
      { path: '/user', component: user, name: '医生信息维护' },
      { path: '/user', component: user, name: '窗口支付' },
      { path: '/user', component: user, name: '预约挂号' },
      { path: '/user', component: user, name: '财务报表' },
    ]
  },
  // {
  //   path: '/',
  //   component: Home,
  //   name: '',
  //   iconCls: 'fa fa-address-card',
  //   leaf: true,//只有一个节点
  //   children: [
  //     { path: '/page6', component: Page6, name: '导航三' }
  //   ]
  // },
  // {
  //   path: '/',
  //   component: Home,
  //   name: 'Charts',
  //   iconCls: 'fa fa-bar-chart',
  //   children: [
  //     { path: '/echarts', component: echarts, name: 'echarts' }
  //   ]
  // }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to, from, next) => {
//   NProgress.start();
//   next()
// })

// router.afterEach(transition => {
//   NProgress.done();
// });

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
  //render: h => h(Login)
}).$mount('#app')

//router.replace('/login')


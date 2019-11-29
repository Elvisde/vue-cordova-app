import Vue from 'vue'
import Router from 'vue-router'
import login from '@/tabs/login'
import home from '@/tabs/home'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '*',
    redirect: login
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      isLogin: false,
      index: 1
    },
    component: login
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      isLogin: true
      // index:2,
    },
    redirect: '/home/index',
    component: home,
    children: [{
      path: '/home/index',
      component: () => import('@/tabs/index'),
      name: '首页',
      hidden: true,
      meta: {
        isLogin: true
        // index: 2
      }
    },
    {
      path: '/home/order',
      component: () => import('@/tabs/order'),
      name: '订单',
      hidden: true,
      meta: {
        isLogin: true
        // index: 3
      }
    },
    {
      path: '/home/mine',
      component: () => import('@/tabs/mine'),
      name: '我的',
      hidden: true,
      meta: {
        isLogin: true
        // index: 4
      }
    }
    ]
  },
  {
    path: '/forgetpsd',
    name: 'forgetpsd',
    component: () => import('@/tabs/forgetpsd'),
    meta: {
      index: 2
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/tabs/register'),
    meta: {
      index: 2
    }
  },
  {
    path: '/visitor',
    name: 'visitor',
    component: () => import('@/tabs/visitor'),
    meta: {
      index: 2
    }
  },
  {
    path: '/device',
    component: () => import('@/tabs/device'),
    name: 'device',
    hidden: true,
    meta: {
      isLogin: true
    }
  },
  {
    path: '/deviceinfo',
    component: () => import('@/tabs/deviceinfo'),
    name: 'deviceinfo',
    hidden: true,
    meta: {
      isLogin: true
    }
  },
  {
    path: '/personInfo',
    name: 'personInfo',
    component: () => import('@/tabs/personInfo'),
    meta: {
      isLogin: true
    }
  }
  ]
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import Vant from 'vant'
import store from './store'
import 'vant/lib/index.css'
// import {
//   Button,
//   NavBar,
//   TabbarItem,
//   Tabbar,
//   Icon,
//   Notify,
//   Field,
//   CountDown,
//   SubmitBar,
//   Checkbox,
//   Sticky,
//   Tab,
//   Tabs,
//   SwipeCell,
//   Swipe,
//   SwipeItem,
//   Cell,
//   CellGroup,
//   DatetimePicker,
//   ActionSheet,
//   Image,
//   Search,
//   DropdownMenu,
//   DropdownItem,
//   RadioGroup,
//   Radio,
//   Toast
// } from 'vant'

// Vue.use(Tabbar).use(TabbarItem).use(NavBar).use(Button).use(Icon).use(Notify).use(Field).use(CountDown).use(SubmitBar).use(Checkbox).use(Sticky).use(Tab).use(Tabs).use(SwipeCell)
//   .use(Swipe).use(SwipeItem).use(Cell).use(CellGroup).use(DatetimePicker).use(ActionSheet).use(Image).use(Search).use(DropdownMenu).use(DropdownItem).use(RadioGroup).use(Radio)
//   .use(Toast)
Vue.use(Vant)
Vue.config.productionTip = false
window.Promise = require('promise') // 解决手机上浏览器不支持promise的问题
/* eslint-disable no-new */
Vue.prototype.$http = axios
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
// router.beforeEach((to, from, next) => {

//   //获取用户登录成功后储存的登录标志
//   let getFlag = localStorage.getItem("isLogin");
//   //如果登录标志存在且为isLogin，即用户已登录
//   if(getFlag){
//     //设置vuex登录状态为已登录
//     store.state.isLogin = true;
//     if (!to.meta.isLogin) {
//       //iViewUi友好提示
//       Notify({type:"danger",message:"请先退出登录"});
//       console.log(to.meta.isLogin);
//       next({path:'/home'})

//    }else{
//      next()
//    }

//     //如果已登录，还想想进入登录注册界面，则定向回首页

//   //如果登录标志不存在，即未登录
//   }else{

//     //用户想进入需要登录的页面，则定向回登录界面
//     if(to.meta.isLogin){
//       next({
//         path: '/login',
//       })
//     }else{
//       next()
//     }
//   }

// });

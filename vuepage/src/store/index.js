import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        isLogin:false,
        loginInfo:{
            login_id:"",
            company_code:"",
            
        },
        keyboardHeight_max:0,  //屏幕的高度
        keyboardHeight:0,     //屏幕被键盘顶起的高度
      },
      mutations: {
        login(state) {
          state.isLogin = true;
        },
        logininfo(state,json){
          state.loginInfo = json;
        },
        setHeight(state,height){
          state.keyboardHeight_max = height;
        },
        resizeHeight(state,height){
          state.keyboardHeight = height;
        }
      }
})

export default store
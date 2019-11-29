<template>
  <div class="box" @keydown.enter="handleClick()">
    <div class="wrapper">
      <img src="static/logo.png" alt="" class="box-img">

      <div class="username">
        <input type="text" v-model="username" placeholder="用户名/手机号" @keyup="checkusername" autofocus>
        <span class="error_message">{{userError}}</span>
      </div>
      <div class="password">

        <input type="password" v-model="password" placeholder="密码" @keyup="checkpassword">

        <span class="error_message">{{passwordError}}</span>
      </div>
      <!-- <mt-button type="primary" style="width:100%"  @click.native="handleClick()">登录</mt-button> -->
      <van-button type="info" @click.native="handleClick()" style="width:100%"
        :disabled="!checkedform.username|| !checkedform.password">登录</van-button>
      <div class="login-control">
        <span @click="forgetpsd">忘记密码</span>
        <span @click="register">免费注册</span>
      </div>
      <van-button type="primary" @click.native="visitor()" style="width:100%">访客预约</van-button>
    </div>
    <div class="tips">
      <span>登陆及阅读并同意</span><span class="tipsnode" @click="tip()">MIPS服务条款</span>
    </div>
  </div>
</template>

<script>
import request from '@/axios/request'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'login',

  data () {
    return {
      pattern: {
        login_id: /^[a-z0-9_-]{3,18}$/,
        // password: /^(?!.*[\u4E00-\u9FA5])(?=.*\d)(?=.*[a-z]).{6,20}$/,
        password: /^((?!.*[\u4E00-\u9FA5])(?=.*\d)(?=.*[a-z]).{6,20})$/,
        company_name: /^[\u4E00-\u9FA5A-Za-z0-9_-]{3,32}$/,
        common_name: /^[\u4E00-\u9FA5A-Za-z0-9_-]{1,32}$/,
        sms_code: /^\d{6}$/,
        age: /^(?:[1-9][0-9]?|1[01][0-9]|120)$/,
        phone: /^[1][3,4,5,7,8][0-9]{9}$/,
        positive_integer: /^\+?[1-9][0-9]*$/,
        volume: /^([1-9]?\d|100)$/
      },
      checkedform: {
        username: false,
        password: false
      },
      username: '',
      password: '',
      notice: { type: 'danger', message: '请求错误' },
      userError: '',
      passwordError: ''
    }
  },
  computed: {
    ...mapState(['keyboardHeight', 'keyboardHeight_max'])
  },
  methods: {
    tip () {
      alert('我点击了MIPS服务条款')
    },
    checkusername () {
      if (!this.pattern.login_id.test(this.username)) {
        this.userError = '请输入有效的账号'
        this.checkedform.username = false
        //   console.log(1);
      } else {
        this.userError = ''
        this.checkedform.username = true
      }
    },
    checkpassword () {
      if (!this.pattern.password.test(this.password)) {
        this.passwordError = '请输入有效的密码'
        this.checkedform.password = false
      } else {
        this.passwordError = ''
        this.checkedform.password = true
      }
    },
    visitor () {
      this.$router.push('visitor')
    },
    handleClick () {
      //   alert("我点击了键盘提交的按钮");
      this.checkusername()
      this.checkpassword()
      if (this.checkedform.username && this.checkedform.password) {
        var json = { 'login_id': this.username, 'password': this.password }
        request.login(json).then(res => {
          let data = JSON.parse(res)
          localStorage.setItem('isLogin', true)
          this.$store.commit('login')
          var json = {}
          json.login_id = data.login_id
          json.company_code = data.company_code
          this.$store.commit('logininfo', json)
          this.$router.push('home')
          // eslint-disable-next-line handle-callback-err
        }).catch(err => {
          this.$notify(this.notice)
        })
      }
    },
    forgetpsd () {
      this.$router.push('forgetpsd')
    },
    register () {
      this.$router.push('register')
    }

  },
  watch: {
    keyboardHeight (newval, oldval) {
      if (newval > oldval) {
        var a = window.innerHeight
        document.getElementById('app').style.height = a + 'px'
        //   alert(document.getElementById("app").style.height);
      }
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box .wrapper {
  height: 100%;
  margin-bottom: -20px;
}
.box {
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  padding: 15vh 15px 15px 15px;
  height: 100%;
  box-sizing: border-box;
  /* background: url("../assets/login_bg.jpg") no-repeat; */
  background-color: black;
}
.box-img {
  /* margin-top: 100px; */
  width: 150px;
}
.box input {
  font-size: 20px;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 0;
  border: none;
  outline: none;
  color: #fff;
  background-color: transparent !important;
  border-bottom: 1px solid #8e8c94;
}
.box input::placeholder {
  /* placeholder颜色  */
  color: #b8b9bc;
  /* placeholder字体大小  */
  font-size: 20px;
}
.username {
  position: relative;
  margin: 40px 0 20px 0;
}
.password {
  position: relative;
  margin: 20px 0 40px 0;
}
.box input:focus {
  border-bottom: 1px solid #eee !important;
}
.login-control {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 35px;
}
.login-control span {
  color: #2365da;
  font-size: 14px;
}
.tips {
  width: 100%;
  position: static;
  bottom: 0px;
  color: #fff;
  text-align: center;
  font-size: 16px;
  height: 20px;
  line-height: 20px;
}
.tips .tipsnode {
  font-size: 16px;
  color: #2365da;
}
.error_message {
  position: absolute;
  bottom: -20px;
  left: 0;
  color: red;
  font-size: 14px;
}
</style>

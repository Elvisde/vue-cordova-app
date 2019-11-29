<template>
  <div id="forgetpsd">
    <headnav title="忘记密码" lefttext="返回" :leftarrow="true" @clickleft="clickleft"></headnav>
    <div class="content" v-if="!isrestPassword">
      <div class="column-phone">
        <div class="column-title">手机号</div>
        <input type="text" @keyup="checkphoneNumber" v-model="phoneNumber" placeholder="请输入手机号">
      </div>
      <div class="column-order">
        <div class="column-title">验证码</div>
        <div class="order-input">
          <input type="text" v-model="vCode" @keyup="checkvCode">
          <van-button type="info" @click.native="handleClick()" :disabled="disabled || !checkForm.phoneNumber"><span
              v-if="!disabled">{{btnMessage}}</span>
            <van-count-down v-else :time="time" @finish="finished" format="ss 秒后可重新发送" />
          </van-button>
        </div>
      </div>
      <van-button type="info" @click.native="submit()" style="width:100%"
        :disabled="!checkForm.phoneNumber || !checkForm.vCode" :loading="loading" loading-type="spinner"
        :loading-text="loadingText">提交</van-button>
    </div>
    <div class="content" v-if="isrestPassword">
      <div class="column-phone">
        <div class="column-title">新密码</div>
        <input type="password" @keyup="checkPassword" v-model="password" placeholder="6到15位字母或数字">
      </div>
      <div class="column-order">
        <div class="column-title">确认密码</div>
        <div class="order-input">
          <input type="password" v-model="confirmpassword" @keyup="checkconfirmpassword" placeholder="输入确认密码">
        </div>
      </div>
      <van-button type="info" @click.native="restPassword()" style="width:100%"
        :disabled="!checkForm.password || !checkForm.confirmpassword">确认修改</van-button>
    </div>

  </div>
</template>

<script>
import request from '@/axios/request'
import headnav from '@/components/van-nav.vue'
export default {
  components: {
    headnav
  },
  name: 'forgepsd',
  data () {
    return {
      verification: '',
      username: '',
      btnMessage: '获取验证码',
      time: 60 * 1000,
      disabled: false,
      phonepattern: /^[1][3,4,5,7,8][0-9]{9}$/,
      passwordpattern: /^((?!.*[\u4E00-\u9FA5])(?=.*\d)(?=.*[a-z]).{6,20})$/,
      codepattern: /^\d{6}$/,
      phoneNumber: '',
      vCode: '',
      checkForm: {
        phoneNumber: false,
        vCode: false,
        password: false,
        confirmpassword: false
      },
      password: '',
      confirmpassword: '',
      token: '',
      loading: false,
      isrestPassword: false,
      loadingText: ''
    }
  },
  methods: {
    clickleft () {
      this.$router.go(-1)
    },
    handleClick () {
      var json = { phone: this.phoneNumber }
      //   console.log(json);
      request.resetPhone(json).then(res => {
        // eslint-disable-next-line no-redeclare
        var res = JSON.parse(res)
        if (res.result == 'SUCCESS') {
          this.$notify({ type: 'primary', message: '获取验证码成功' })
          this.disabled = true
        }
      }).catch(err => {
        //   console.log(err.request.responseText);
        this.$notify({ type: 'danger', message: JSON.parse(err.request.responseText).err_msg })
      })
    },
    finished () {
      this.disabled = false
    },
    submit () {
      this.loading = true
      this.loadingText = '加载中...'
      let json = { phone: this.phoneNumber, verify_code: this.vCode }
      request.verifycode(json).then(res => {
        var res = JSON.parse(res)
        this.loading = false
        this.loadingText = ''
        if (res.token) {
          this.token = res.token
          this.isrestPassword = true
        }

        //   this.$notify({type:"primary",message:"操作成功"});
      }).catch(err => {
        this.loading = false
        this.loadingText = ''
        this.$notify({ type: 'danger', message: JSON.parse(err.request.responseText).err_msg })
      })
    },
    checkconfirmpassword () {
      if (this.confirmpassword === this.password) {
        this.checkForm.confirmpassword = true
      } else {
        this.checkForm.confirmpasswrod = false
      }
    },
    checkPassword () {
      if (this.passwordpattern.test(this.password)) {
        this.checkForm.password = true
      } else {
        this.checkForm.password = false
      }
    },
    checkphoneNumber () {
      if (this.phonepattern.test(this.phoneNumber)) {
        this.checkForm.phoneNumber = true
      } else {
        this.checkForm.phoneNumber = false
      }
    },
    checkvCode () {
      if (this.codepattern.test(this.vCode)) {
        this.checkForm.vCode = true
      } else {
        this.checkForm.vCode = false
      }
    },
    restPassword () {
      let json = { token: this.token, password: this.password }
      request.resetPassword(json).then(res => {
        this.$router.push('login')
      }).catch(err => {
        this.$notify({ type: 'danger', message: JSON.parse(err.request.responseText).err_msg })
      })
    }
  },
  mounted () {

  },
  watch: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#forgetpsd {
  background: #eee;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.column-title {
  height: 30px;
  line-height: 30px;
}
.column-phone input {
  font-size: 14px;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 0;
  border: none;
  outline: none;
  background-color: #fff;
  /* border-bottom:1px solid #8E8C94; */
}
#forgetpsd .content {
  flex: 1;
  padding: 0 10px;
  display: flex;
  /* height: 100%; */
  flex-direction: column;
  justify-content: center;
}
.order-input {
  display: flex;
  margin-bottom: 10px;
}
.order-input input {
  font-size: 14px;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 0;
  border: none;
  outline: none;
  background-color: #fff;
  flex: 1;
}
.column-phone {
  margin-top: -60px;
}
</style>

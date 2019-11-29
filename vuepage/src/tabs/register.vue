<template>
  <div id="forgetpsd">
    <headnav title="免费注册" lefttext="返回" :leftarrow="true" @clickleft="clickleft"></headnav>
    <div class="content">
      <van-cell-group>
        <van-field v-model="username" ref="username" required placeholder="请输入用户名" label="用户名"
          :error-message="error.username" @input="checkusername" @blur="checkname" clearable />
        <van-field v-model="password" type="password" ref="password" placeholder="请输入密码" label="密码"
          :error-message="error.password" @input="checkpassword" required clearable />
        <van-field v-model="phoneNumber" placeholder="请输入手机号" :error-message="error.phoneNumber" label="手机号"
          @input="checkphone" required clearable />
        <van-field v-model="vCode" clearable label="短信验证码" :error-message="error.vCode" placeholder="请输入短信验证码"
          @input="checkcode" required>
          <van-button slot="button" size="small" type="info" @click.native="getCode" :disabled="!checkForm.phoneNumber">
            <span v-if="!code_r">{{btnMessage}}</span>
            <van-count-down v-else :time="time" @finish="finished" format="ss 秒后可重新发送" />
          </van-button>
        </van-field>
      </van-cell-group>
      <div style="margin-top:15px">
        <van-button type="info" @click.native="submit" style="width:100%" :disabled="isDisabled">提交</van-button>
      </div>
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
      pattern: {
        username: /^[a-z0-9_-]{3,18}$/,
        password: /^((?!.*[\u4E00-\u9FA5])(?=.*\d)(?=.*[a-z]).{6,20})$/,
        sms_code: /^\d{6}$/,
        phoneNumber: /^[1][3,4,5,7,8][0-9]{9}$/
      },
      error: {
        username: '',
        password: '',
        phoneNumber: '',
        vCode: ''

      },
      verification: '',
      username: '',
      phoneNumber: '',
      password: '',
      btnMessage: '获取验证码',
      time: 60 * 1000,
      disabled: false,
      vCode: '',
      checkForm: {
        username: false,
        password: false,
        phoneNumber: false,
        vCode: false
      },
      code_r: false
    }
  },
  computed: {
    isDisabled () {
      return !this.checkForm.username || !this.checkForm.password || !this.checkForm.phoneNumber || !this.checkForm.vCode
    }
  },
  methods: {
    getCode () { // 获取验证码
      let json = { phone: this.phoneNumber }
      request.getsignCode(json).then(res => {
        this.code_r = true
        this.$notify({ type: 'primary', message: '验证码已发送' })
      }).catch(err => {
        this.$notify({ type: 'danger', message: JSON.parse(err.request.responseText).err_msg })
      })
    },
    checkname () {
      if (!this.checkForm.username) return
      let json = { login_id: this.username }
      request.checkname(json).then(res => {
        this.checkForm.username = true
        this.error.username = ''
        //   this.$notify({type:"primary",message:"该用户名可以使用"});
      }).catch(err => {
        this.error.username = JSON.parse(err.request.responseText).err_msg
        //   this.$notify({type:"danger",message:JSON.parse(err.request.responseText).err_msg});
        this.checkForm.username = false
      })
    },
    checkusername () {
      if (this.pattern.username.test(this.username)) {
        this.error.username = ''
        //   console.log(this.isDisabled);
        this.checkForm.username = true
      } else {
        this.error.username = '请输入3到18位数字或字母'
        this.checkForm.username = false
      }
    },
    checkpassword () {
      if (this.pattern.password.test(this.password)) {
        this.error.password = ''
        this.checkForm.password = true
      } else {
        this.error.password = '请输入6到20位包含数字和字母的密码'
        this.checkForm.password = false
      }
    },
    checkphone () {
      if (this.pattern.phoneNumber.test(this.phoneNumber)) {
        this.error.phoneNumber = ''
        this.checkForm.phoneNumber = true
      } else {
        this.error.phoneNumber = '请输入11位的手机号码'
        this.checkForm.phoneNumber = false
      }
    },
    checkcode () {
      if (this.pattern.sms_code.test(this.vCode)) {
        this.error.vCode = ''
        this.checkForm.vCode = true
      } else {
        this.error.vCode = '请输入6位的数字验证码'
        this.checkForm.vCode = false
      }
    },
    clickleft () {
      this.$router.go(-1)
    },
    //   handleClick(){
    //       this.disabled = true;
    //   },
    finished () {
      this.finished = false
    },
    submit () {
      let json = {
        login_id: this.username,
        password: this.password,
        phone: this.phoneNumber,
        verify_code: this.vCode
      }
      request.getsign(json).then(res => {
        this.$notify({ type: 'parimy', message: '注册成功' })
        this.$router.push('login')
      }).catch(err => {
        this.$notify({ type: 'danger', message: JSON.parse(err.request.responseText).err_msg })
      })
    },
    checkphoneNumber () {
      if (this.phonepattern.test(this.phoneNumber)) {
        this.checkForm.phoneNumber = true
      } else {
        this.checkForm.phoneNumber = false
      }
    },
    checkvCode () {
      if (this.vCode.length == 4) {
        this.checkForm.vCode = true
      } else {
        this.checkForm.vCode = false
      }
    }
  },
  mounted () {
    //   this.$refs.username.focus();
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
  font-size: 20px;
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
  font-size: 20px;
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

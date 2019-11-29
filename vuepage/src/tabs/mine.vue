<template>
  <div id="mine">
    <div class="user_info" style="padding-bottom:20px;border-bottom:1px solid #eee">
      <van-cell is-link @click="goPersonInfo()">
        <div class="user_info_box">
          <img src="static/icon.png" alt="">
          <div class="user_info_msg">
            <span style="font-size:18px;color: #000;">{{loginInfo.login_id}}</span>
            <span>{{loginInfo.company_code}}</span>
          </div>
        </div>
      </van-cell>
    </div>
    <div>
      <van-cell is-link @click="godevice()">
        <div class="cell">信发系统</div>
      </van-cell>
      <van-cell is-link @click="godevice()">
        <div class="cell">考勤系统</div>
      </van-cell>
      <van-cell is-link @click="godevice()">
        <div class="cell"><span>自助收银</span></div>
      </van-cell>
    </div>
    <div class="button-group">
      <van-button type="info" @click.native="handleloginout()" style="width:100%">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'mine',

  computed: {
    ...mapState(['loginInfo'])
  },
  data () {
    return {
      // username:"123456789",
      // companyname:"视美科技"
    }
  },
  methods: {
    goPersonInfo () {
      this.$router.push('/personInfo')
    },
    godevice () {
      this.$router.push('/device')
    },
    handleloginout () {
      this.$dialog.confirm({
        title: '退出登陆',
        message: '确认退出？'
      }).then(() => {
        this.$router.push('/login')
      }).catch(() => {
        // on cancel
      })
    }
  },
  mounted () {
    // console.log(this.loginInfo)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mine {
  padding: 10px 0;
}
#mine .van-cell__left-icon,
.van-cell__right-icon {
  min-width: 1em;
  height: 50px;
  font-size: 16px;
  line-height: 50px;
}
.user_info {
  background-color: #eee;
}
#mine .user_info img {
  border-radius: 50%;
}
#mine .user_info_box {
  display: flex;
  flex-direction: row;
}
#mine .user_info_msg {
  display: flex;
  flex-direction: column;
  margin-left: 15px;
}
#mine .van-cell {
  /* background: #a6d3ec; */
}
.cell {
  height: 100%;
  display: flex;
  align-items: center;
}
.button-group {
  padding: 10px;
}
</style>

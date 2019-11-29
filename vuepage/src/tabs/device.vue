<template>
  <div id="device">
    <headnav title="设备" lefttext="返回" :leftarrow="true" @clickleft="clickleft"></headnav>
    <div style="position:fixed;top:46px;width:100%;z-index:999">
      <van-search v-model="value" placeholder="请输入搜索关键词" show-action @search="onSearch" v-show="!multiple">
        <div slot="action" @click="edit">
          <div class="left-icon">
            <van-icon name="edit" size="20" />
          </div>
        </div>
      </van-search>
      <div class="multiple" v-show="multiple"><span @click="handlecancel">取消</span><span style="color: #2774f6;"
          @click="handleconfirm">确定</span>
      </div>
    </div>
    <devicelist :showchecked="multiple" :seachval="value" ref="devicelist" @opating="operating"></devicelist>
    <van-action-sheet v-model="showAction" title="操作设备">
      <div v-for="(item,index) in primaryActions" :key="index" class="box" @click="handleClick(item)">
        <div class="popup_first">
          <div class="popup_img">
            <img :src="item.image" alt="">
          </div>
          <span class="popup_name">{{item.name}}</span>
        </div>
      </div>
    </van-action-sheet>
    <van-action-sheet id="operating" v-model="showoperating" :actions="actions" :title="operatingtitle"
      cancel-text="取消" />

  </div>
</template>

<script>
import headnav from '@/components/van-nav.vue'
import devicelist from '@/components/devicelist'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    headnav,
    devicelist
  },
  computed: {
    ...mapState(['loginInfo'])
  },
  data () {
    return {
      actions: [],
      operatingtitle: '',
      showoperating: false,
      value: '', // 搜索框的内容
      multiple: false,
      showAction: false,
      primaryActions: [{
        id: 0,
        show: true,
        name: '关机',
        image: 'static/close_1_1.png'
      },
      {
        id: 1,
        show: true,
        name: '重启',
        image: 'static/restart_1_2.png'
      },
      {
        id: 2,
        show: true,
        name: '清空节目',
        image: 'static/clear_1_3.png'
      },
      {
        id: 3,
        show: true,
        name: '定时开关机',
        image: 'static/settime_1_4.png'
      },
      {
        id: 4,
        show: true,
        name: '应用屏幕旋转',
        image: 'static/rotate_1_5.png'
      },
      {
        id: 5,
        show: true,
        name: '音量计划',
        image: 'static/volum_1_6.png'
      }
      ]
      // secondaryActions: [{
      //   id: 0,
      //   show: true,
      //   name: '系统屏幕旋转',
      //   image: 'static/rotate_2_1.png'
      // },
      // {
      //   id: 1,
      //   show: true,
      //   name: '状态栏设置',
      //   image: 'static/statusset_2_2.png'
      // }
      // ]
    }
  },
  methods: {
    handlecancel () {
      this.multiple = false
    },
    clickleft () {
      this.$router.go(-1)
    },
    onSearch () {

    },
    onCancel () {

    },
    edit () {
      this.multiple = true
    },
    handleconfirm () {
      let listArr = this.$refs.devicelist.devicelist
      let choosed = []
      listArr.forEach((val, index) => {
        if (val.checked) {
          choosed.push(val)
        }
      })
      if (choosed.length === 0) {
        this.$toast('请选择要操作的设备')
      } else {
        this.showAction = true
      }
      // this.showAction = true
      // console.log(this.multiple)
    },
    setPowerOff (name) {
      this.actions.splice(0)
      this.actions.push({ 'name': name })
      this.showoperating = true
      this.operatingtitle = `是否${name}?`
    },
    handleClick (e) {
      // let id = e.currentTarget.dataset.id
      switch (e.id) {
        case 0:
          this.setPowerOff(e.name)
          break
        case 1:
          this.setReboot()
          break
        case 2:
          this.setClearProgram()
          break
        case 3:
          this.setPowerPlan()
          break
        case 4:
          this.setRotate()
          break
        case 5:
          this.setVol()
          break
      }
    },
    operating (mac) {
      this.showAction = true
      console.log(mac)
    }

  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-icon {
  width: 38px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.van-search {
  border-bottom: 1px solid #d9d9d9;
}
.multiple {
  /* margin-top: 46px; */
  /* position: fixed; */
  top: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 32px;
  height: 54px;
  box-sizing: border-box;
  background: #fff;
  z-index: 3;
  border-bottom: 1px solid #d9d9d9;
}
.van-action-sheet__content {
  background-color: #eee;
  display: flex;
  flex-direction: row;
  padding: 10px;
  /* flex-wrap: wrap; */
  justify-content: flex-start;
  overflow-x: auto;
}
.box {
  /* margin-right: 10px; */
  /* width: 55px; */
  font-size: 16px;
  flex: 1;
}
.popup_first {
  display: flex;
  width: 62px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.popup_first img {
  width: 100%;
  height: 100%;
}
.popup_name {
  text-align: center;
  width: 100%;
  margin-top: 10px;
}
.popup_img {
  width: 35px;
  height: 35px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
}
#operating .van-action-sheet__header i {
  display: none;
}
</style>

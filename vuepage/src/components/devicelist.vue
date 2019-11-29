<template>
  <div id="devicelist">
    <div style="position: fixed;top: 100px;width: 100%;z-index: 999;">
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
        <span class="tips" v-show="!!tips && !showwrapper">{{tips}}</span>
        <van-dropdown-item title="筛选" ref="item" @open="opendropdown" @close="closedropdown">
          <div class="content">
            <div class="title">屏幕配置</div>
            <div class="filter_content">
              <!-- <van-radio-group v-model="radio">
          <van-radio :name="item.value" v-for="(item,key) in menu" :key="key">{{item.title}}</van-radio>
        </van-radio-group> -->
              <span :class="['defalutspan',{'chooseSpan':radio==item.value}]" @click="filterMenu(1,item.value)"
                v-for="(item,key) in menu" :key="key">{{item.title}}</span>
            </div>
          </div>
          <div class="content">
            <div class="title">分辨率</div>
            <div class="filter_content">
              <!-- <van-radio-group v-model="radio1">
          <van-radio :name="item.value" v-for="(item,key) in menu1" :key="key">{{item.title}}</van-radio>
        </van-radio-group> -->
              <span :class="['defalutspan',{'chooseSpan':radio1==item.value}]" @click="filterMenu(2,item.value)"
                v-for="(item,key) in menu1" :key="key">{{item.title}}</span>
            </div>
          </div>
          <div class="chooseButton">
            <van-button @click.native="cancle()" style="width:50%">清除筛选</van-button>
            <van-button type="info" @click.native="confirm()" style="width:50%">确认 <span class="tipsbutton"
                v-show="!!tips">{{tips}}</span></van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <div class="list_info">
      <van-cell is-link v-for="(item,key) in devicelist" :key="key">
        <van-icon name="ellipsis" size="20" slot="right-icon" style="display:flex;align-items:center"
          @click.stop="handleoperating(item.mac)" />
        <div class="cell">
          <div class="checkbox" v-if="showchecked">
            <van-checkbox v-model="item.checked" @change="checkedchange()"></van-checkbox>
          </div>

          <div class="device_content" @click="deviceinfo()">
            <div class="device_title">{{item.device_name}}</div>
            <div class="device_cell"><span class="status"
                :style="{'background-color':(item.is_online==1?'#07c160':'#d9d9d9')}"></span>{{item.is_online==1?'在线':'离线'}}<span
                class="border-left">MAC:{{item.mac}}</span></div>
            <div class="device_cell">{{item.device_screen>2?'多屏':item.device_screen==1?'单屏':'双屏'}}({{item.res}})</div>
            <div class="device_cell">可用存储:{{item.disk_space}}
              <span class="border-left"> 版本号:{{item.soft_version}}</span>
            </div>
          </div>
        </div>
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  name: 'devicelist',
  props: {
    showchecked: {
      type: Boolean,
      default: false
    },
    seachval: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      devicelist: [{
        company_code: 'mips',
        department_id: 1,
        department_name: '默认用户组',
        dev_flow: '0',
        device_firmware: 'Android/rk3288/rk3288:7.1.2/NHG47K/lkf09251027:userdebug/test-keys',
        device_id: '9b5ce28f5e3bf8ec00e0dbb3',
        device_name: '智慧闸机',
        device_screen: 2,
        device_type: 1,
        disk_space: '3.71 GB',
        gmt_creat: '2019-11-06 16:04:49.0',
        gmt_offline: '2019-11-14T09:35:39+0800',
        group_id: 1,
        group_name: '默认分组',
        hard_version: 'rk3288',
        id: 57,
        ip: '192.168.2.152',
        is_active: '0',
        is_available: 0,
        is_invalid: '1',
        is_online: '0',
        mac: '8CFCA0064A97',
        mips_info: { one_program_play: '视频', two_program_play: '', device_variant: '1' },
        playtime_count: 3081,
        res: '800*1280',
        soft_version: '4.1.0',
        volume: 0
      }, {
        company_code: 'mips',
        department_id: 1,
        department_name: '默认用户组',
        dev_flow: '0',
        device_firmware: 'Android/rk3288/rk3288:7.1.2/NHG47K/lkf09251027:userdebug/test-keys',
        device_id: '9b5ce28f5e3bf8ec00e0dbb3',
        device_name: '智慧闸机',
        device_screen: 2,
        device_type: 1,
        disk_space: '3.71 GB',
        gmt_creat: '2019-11-06 16:04:49.0',
        gmt_offline: '2019-11-14T09:35:39+0800',
        group_id: 1,
        group_name: '默认分组',
        hard_version: 'rk3288',
        id: 57,
        ip: '192.168.2.152',
        is_active: '0',
        is_available: 0,
        is_invalid: '1',
        is_online: '0',
        mac: '8CFCA0064A97',
        mips_info: { one_program_play: '视频', two_program_play: '', device_variant: '1' },
        playtime_count: 3081,
        res: '800*1280',
        soft_version: '4.1.0',
        volume: 0
      }, {
        company_code: 'mips',
        department_id: 1,
        department_name: '默认用户组',
        dev_flow: '0',
        device_firmware: 'Android/rk3288/rk3288:7.1.2/NHG47K/lkf09251027:userdebug/test-keys',
        device_id: '9b5ce28f5e3bf8ec00e0dbb3',
        device_name: '智慧闸机',
        device_screen: 2,
        device_type: 1,
        disk_space: '3.71 GB',
        gmt_creat: '2019-11-06 16:04:49.0',
        gmt_offline: '2019-11-14T09:35:39+0800',
        group_id: 1,
        group_name: '默认分组',
        hard_version: 'rk3288',
        id: 57,
        ip: '192.168.2.152',
        is_active: '0',
        is_available: 0,
        is_invalid: '1',
        is_online: '0',
        mac: '8CFCA0064A97',
        mips_info: { one_program_play: '视频', two_program_play: '', device_variant: '1' },
        playtime_count: 3081,
        res: '800*1280',
        soft_version: '4.1.0',
        volume: 0
      }, {
        company_code: 'mips',
        department_id: 1,
        department_name: '默认用户组',
        dev_flow: '0',
        device_firmware: 'Android/rk3288/rk3288:7.1.2/NHG47K/lkf09251027:userdebug/test-keys',
        device_id: '9b5ce28f5e3bf8ec00e0dbb3',
        device_name: '智慧闸机',
        device_screen: 2,
        device_type: 1,
        disk_space: '3.71 GB',
        gmt_creat: '2019-11-06 16:04:49.0',
        gmt_offline: '2019-11-14T09:35:39+0800',
        group_id: 1,
        group_name: '默认分组',
        hard_version: 'rk3288',
        id: 57,
        ip: '192.168.2.152',
        is_active: '0',
        is_available: 0,
        is_invalid: '1',
        is_online: '0',
        mac: '8CFCA0064A97',
        mips_info: { one_program_play: '视频', two_program_play: '', device_variant: '1' },
        playtime_count: 3081,
        res: '800*1280',
        soft_version: '4.1.0',
        volume: 0
      }, {
        company_code: 'mips',
        department_id: 1,
        department_name: '默认用户组',
        dev_flow: '0',
        device_firmware: 'Android/rk3288/rk3288:7.1.2/NHG47K/lkf09251027:userdebug/test-keys',
        device_id: '9b5ce28f5e3bf8ec00e0dbb3',
        device_name: '智慧闸机',
        device_screen: 2,
        device_type: 1,
        disk_space: '3.71 GB',
        gmt_creat: '2019-11-06 16:04:49.0',
        gmt_offline: '2019-11-14T09:35:39+0800',
        group_id: 1,
        group_name: '默认分组',
        hard_version: 'rk3288',
        id: 57,
        ip: '192.168.2.152',
        is_active: '0',
        is_available: 0,
        is_invalid: '1',
        is_online: '0',
        mac: '8CFCA0064A97',
        mips_info: { one_program_play: '视频', two_program_play: '', device_variant: '1' },
        playtime_count: 3081,
        res: '800*1280',
        soft_version: '4.1.0',
        volume: 0
      }, {
        company_code: 'mips',
        department_id: 1,
        department_name: '默认用户组',
        dev_flow: '0',
        device_firmware: 'Android/rk3288/rk3288:7.1.2/NHG47K/lkf09251027:userdebug/test-keys',
        device_id: '9b5ce28f5e3bf8ec00e0dbb3',
        device_name: '智慧闸机',
        device_screen: 2,
        device_type: 1,
        disk_space: '3.71 GB',
        gmt_creat: '2019-11-06 16:04:49.0',
        gmt_offline: '2019-11-14T09:35:39+0800',
        group_id: 1,
        group_name: '默认分组',
        hard_version: 'rk3288',
        id: 57,
        ip: '192.168.2.152',
        is_active: '0',
        is_available: 0,
        is_invalid: '1',
        is_online: '0',
        mac: '8CFCA0064A97',
        mips_info: { one_program_play: '视频', two_program_play: '', device_variant: '1' },
        playtime_count: 3081,
        res: '800*1280',
        soft_version: '4.1.0',
        volume: 0
      }, {
        company_code: 'mips',
        department_id: 1,
        department_name: '默认用户组',
        dev_flow: '0',
        device_firmware: 'Android/rk3288/rk3288:7.1.2/NHG47K/lkf09251027:userdebug/test-keys',
        device_id: '9b5ce28f5e3bf8ec00e0dbb3',
        device_name: '智慧闸机',
        device_screen: 2,
        device_type: 1,
        disk_space: '3.71 GB',
        gmt_creat: '2019-11-06 16:04:49.0',
        gmt_offline: '2019-11-14T09:35:39+0800',
        group_id: 1,
        group_name: '默认分组',
        hard_version: 'rk3288',
        id: 57,
        ip: '192.168.2.152',
        is_active: '0',
        is_available: 0,
        is_invalid: '1',
        is_online: '0',
        mac: '8CFCA0064A97',
        mips_info: { one_program_play: '视频', two_program_play: '', device_variant: '1' },
        playtime_count: 3081,
        res: '800*1280',
        soft_version: '4.1.0',
        volume: 0
      }],
      radio: '', // 刷选绑定的数值
      radio1: '',
      tips: 0,
      showwrapper: false,
      menu: [{
        title: '单屏',
        value: 1
      }, {
        title: '双屏',
        value: 2
      }],
      menu1: [{
        title: '1920*1080',
        value: '1920*1080'
      }, {
        title: '1280*800',
        value: '1280*800'
      }, {
        title: '1366*768',
        value: '1366*768'
      }, {
        title: '1080*1920',
        value: '1080*1920'
      }, {
        title: '800*1080',
        value: '800*1080'
      }],
      value1: 0,
      option1: [
        { text: '全部', value: 0 },
        { text: '在线', value: 1 },
        { text: '离线', value: 2 }
      ]
    }
  },
  // computed: {
  //   showwrapper: function () {
  //     console.log(this.refs)
  //     return false
  //   }
  // },
  methods: {
    checkedchange (val) {
      console.log(val)
    },
    filterMenu (filters, value) {
      switch (filters) {
        case 1:
          if (this.radio === value) {
            this.radio = ''

            this.tips--
          } else {
            this.radio = value
            if (this.tips < 2) {
              this.tips++
            }
          }
          break
        case 2:
          if (this.radio1 === value) {
            this.radio1 = ''
            this.tips--
          } else {
            this.radio1 = value
            if (this.tips < 2) {
              this.tips++
            }
          }
          break
      }
    },
    confirm () {
      this.$refs.item.toggle()
    },
    cancle () {
      this.radio = ''
      this.radio1 = ''
      this.tips = 0
    },
    opendropdown () {
      this.showwrapper = true
    },
    closedropdown () {
      this.showwrapper = false
    },
    handleoperating (mac) {
      this.$emit('opating', mac)
    },
    deviceinfo () {
      this.$router.push('deviceinfo')
    }
  },
  mounted () {

  },
  watch: {
    seachval (val) {
      console.log(val)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filter {
  position: relative;
  flex: 1;
}
.tips {
  position: absolute;
  top: 17px;
  right: 20px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #666;
  color: #fff;
  text-align: center;
  line-height: 15px;
  font-size: 10px;
}
.van-dropdown-menu {
  border-bottom: 1px solid #d9d9d9;
}
#devicelist {
  margin-top: 56px;
}
#devicelist .content {
  padding: 15px;
}
#devicelist .title {
  margin-bottom: 13px;
  font-size: 12px;
  color: #888;
  /* line-height: 1; */
}
.defalutspan {
  /* box-sizing: border-box; */
  display: inline-block;
  height: 29px;
  line-height: 29px;
  width: 100px;
  margin-right: 10px;
  font-size: 14px;
  text-align: center;
  border-radius: 0;
  overflow: hidden;
  color: #000;
  background-color: #fff;
  border: 1px solid #eee;
}
.chooseSpan {
  color: #2774f6;
  background-color: #edf4ff;
  border-color: #2774f6;
}
.chooseButton {
  display: flex;
  flex-direction: row;
}
.tipsbutton {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #fff;
  color: #2774f6;
  text-align: center;
  line-height: 15px;
  font-size: 10px;
}
.device_title {
  font-size: 16px;
  color: #000;
  margin-bottom: 10px;
}
.status {
  display: inline-block;
  height: 10px;
  width: 10px;
  border-radius: 50%;
}
.device_cell {
  font-size: 14px;
  color: #888;
  margin-bottom: 5px;
}
.border-left {
  display: inline-block;
  /* border-left: 1px solid #888; */
  padding-left: 10px;
  /* margin-left: 10px; */
  height: 20px;
}
.list_info {
  margin-top: 106px;
}
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
}
.checkbox {
  width: 25px;
  margin-right: 15px;
}
.device_content {
  flex: 1;
}
</style>

<template>
  <div id="order">
    <van-tabs v-model="active" :sticky="true" :offset-top="46" @change="changeTabs">
      <van-tab title="未支付订单">
        <van-swipe-cell v-for="(item,key) in list" :key="key">
          <div class="list">
            <div class="checkbox">
              <van-checkbox v-model="item.checked" @change="handlechange"></van-checkbox>
            </div>
            <div class="contentbox">
              <div class="list-row">
                <span>订单编号:{{item.orderNum}}</span>
                <span>{{item.system}}</span>
              </div>
              <div class="list-row">
                <span>名称:{{item.name}}</span>
                <span>{{item.time}}</span>
              </div>
              <div class="list-row">
                <span style="color:red">{{item.price}}元</span>
                <van-button type="danger" @click.native="handledel(key)" size="small">删除</van-button>
              </div>
            </div>
          </div>
          <template slot="right">
            <van-button square type="danger" text="删除" @click.native="handledel(key)" />
            <!-- <van-button square type="primary" text="收藏"/> -->
          </template>
        </van-swipe-cell>
        <van-submit-bar :price="totalprice" button-text="提交订单" @submit="onSubmit">
          <van-checkbox v-model="checked" @click="selectAll">全选</van-checkbox>
        </van-submit-bar>
      </van-tab>
      <van-tab title="已支付订单">
        <van-swipe-cell v-for="(item,key) in list" :key="key">
          <div class="list">
            <div class="contentbox">
              <div class="list-row">
                <span>订单编号:{{item.orderNum}}</span>
                <span>{{item.system}}</span>
              </div>
              <div class="list-row">
                <span>名称:{{item.name}}</span>
                <span>{{item.time}}</span>
              </div>
              <div class="list-row">
                <span style="color:red">{{item.price}}元</span>
                <van-button type="danger" @click.native="handlebuy(key)" size="small">再次购买</van-button>
              </div>
            </div>
          </div>
          <template slot="right">
            <van-button square type="danger" text="删除" @click.native="handledel(key)" />
            <!-- <van-button square type="primary" text="收藏"/> -->
          </template>
        </van-swipe-cell>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import headnav from '@/components/van-nav.vue'
export default {
  name: 'home',
  components: {
    headnav
  },
  data () {
    return {
      totalprice: 0.00,
      checked: false,
      active: 0,
      list: [{ orderNum: '2019102901920', system: '信发系统1', name: '设备续费', time: '2019-11-14 09:10:20', price: '299' },
        { orderNum: '20191029019201', system: '信发系统2', name: '设备续费', time: '2019-11-14 09:10:20', price: '299' },
        { orderNum: '20191029019201', system: '信发系统3', name: '设备续费', time: '2019-11-14 09:10:20', price: '299' },
        { orderNum: '201910290192', system: '信发系统4', name: '设备续费', time: '2019-11-14 09:10:20', price: '299' },
        { orderNum: '2019102901921', system: '信发系统5', name: '设备续费', time: '2019-11-14 09:10:20', price: '299' },
        { orderNum: '2019102901922', system: '信发系统6', name: '设备续费', time: '2019-11-14 09:10:20', price: '299' }]
    }
  },
  methods: {
    handledel (key) {
      this.list.splice(key, 1)
      this.handlechange()
    },
    handlechange (val) {
      let totalprice = 0
      let totalchecked = 0
      this.list.forEach((item, index) => {
        if (item.checked) {
          totalprice += Number(item.price)
          totalchecked += 1
        }
        if (totalchecked == this.list.length) {
          this.checked = true
        } else {
          this.checked = false
        }
      })
      // console.log( this.totalprice);
      this.totalprice = totalprice * 100
    },
    selectAll () {
      //  console.log(this.checked);
      if (!this.checked) {
        this.list.forEach((item, index) => {
          this.$set(this.list[index], 'checked', true)
        })
      } else {
        this.list.forEach((item, index) => {
          this.$set(this.list[index], 'checked', false)
        })
      }
    },
    onSubmit () {
      //    Wechat.isInstalled(function (installed) {
      //       alert("Wechat installed: " + (installed ? "Yes" : "No"));
      //   }, function (reason) {
      //       alert("Failed: " + reason);
      // });
      //  var params = {
      //      appid: 'wx709338df47408b37',  // appid
      //       package: 'XXXXX', // package
      //       partnerid: '1507643221', // merchant id
      //       prepayid: 'wx201411101639507cbf6ffd8b0779950874', // prepay id
      //       noncestr: '1add1a30ac87aa2db72f57a2375d8fec', // nonce
      //       timestamp: '1439531364', // timestamp
      //       sign: '0CB01533B8C1EF103065174F50BCA001', // signed string

      // };
      // Wechat.sendPaymentRequest(params, function (res) {
      //   alert("Success");
      //   console.log(res);
      // }, function (reason) {
      //   alert("Failed: " + reason);
      // });
      Wechat.share({
        message: {
          title: '这是分享的标题',
          description: '这是分享的描述',
          thumb: 'www/assets/imgs/logo.png',
          media: {
            type: Wechat.Type.MINI,
            webpageUrl: 'https://www.jason-z.com', // 兼容低版本的网页链接
            userName: 'gh_745127d80c0f', // 小程序原始id
            path: 'pages/logs/logs', // 小程序的页面路径
            hdImageData: 'https://www.jason-z.com/storage/test_image.jpg', // 程序新版本的预览图二进制数据 不超过128kb 支持 地址 base64 temp
            withShareTicket: true, // 是否使用带shareTicket的分享
            miniprogramType: Wechat.Mini.PREVIEW
          }
        },
        scene: Wechat.Scene.SESSION
      }, function () {
        alert('Success')
      }, function (reason) {
        alert('Failed: ' + reason)
      })
    },
    handlebuy () {
      console.log('handlebuy')
    },
    changeTabs (name) {
      if (name == 1) {
        document.getElementById('order').style.paddingBottom = '50px'
      } else {
        document.getElementById('order').style.paddingBottom = '100px'
      }
    }
  },
  mounted () {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.van-submit-bar {
  bottom: 50px !important;
  height: 50px;
}
.van-checkbox {
  margin-left: 15px;
}
.van-swipe-cell__right .van-button {
  height: 100%;
}
#order {
  /* overflow-y:scroll; */
  padding-bottom: 100px;
}
.checkbox {
  margin-right: 10px;
  /* width:45px; */
}
#order .list {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-between; */
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.contentbox {
  flex: 1;
}
.list-row {
  flex: 1;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}
</style>

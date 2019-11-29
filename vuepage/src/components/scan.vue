<template>
  <div id="scan">
    <headnav title="二维码/条码" :leftarrow="true" @clickleft="back"></headnav>
    <div id="qrcode-box" class="qrcode-box">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script>
import headnav from '@/components/van-nav'
export default {
  name: 'App',
  components: {
    headnav
  },
  methods: {
    back () {
      this.$emit('back')
    }
  },
  mounted () {
    var eQRCodeBox = document.querySelector('#qrcode-box')
    var top = (window.innerHeight - 200) / 2
    var left = (window.innerWidth - 200) / 2
    // $api.css(eQRCodeBox, 'top: '+top+'px;left:'+left+'px;display:block;');
    eQRCodeBox.style.top = top + 'px'
    eQRCodeBox.style.left = left + 'px'
  }
}
</script>

<style scoped>
.qrcode-box {
  width: 200px;
  height: 200px;
  position: absolute;
}
.qrcode-box:after {
  -webkit-animation: rotateAnim linear 3.68s infinite;
  animation: rotateAnim linear 3.68s infinite;
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  background-color: #d8be26;
}
/*二维码上下移动的扫描横线*/
@keyframes rotateAnim {
  from {
    top: 0;
  }
  to {
    top: 100%;
  }
}
@-webkit-keyframes rotateAnim {
  from {
    top: 0;
  }
  to {
    top: 100%;
  }
}
/*二维码扫描框的四角*/
.qrcode-box span {
  width: 14px;
  height: 14px;
  position: absolute;
  border: 2px solid #1fa2ff;
}
.qrcode-box span:nth-child(1) {
  left: 0;
  top: 0;
  border-width: 2px 0 0 2px;
}
.qrcode-box span:nth-child(2) {
  right: 0;
  top: 0;
  border-width: 2px 2px 0 0;
}
.qrcode-box span:nth-child(3) {
  right: 0;
  bottom: 0;
  border-width: 0 2px 2px 0;
}
.qrcode-box span:nth-child(4) {
  left: 0;
  bottom: 0;
  border-width: 0 0 2px 2px;
}
</style>

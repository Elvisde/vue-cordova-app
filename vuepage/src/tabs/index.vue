<template>
  <div id="index">
    <div id="swiper_box">
      <van-swipe :autoplay="2000" indicator-color="white" :height="300">
        <van-swipe-item>1</van-swipe-item>
        <van-swipe-item>2</van-swipe-item>
        <van-swipe-item>3</van-swipe-item>
        <van-swipe-item>4</van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import request from '@/axios/request'
import headnav from '@/components/van-nav.vue'
export default {
  name: 'home',
  components: {
    headnav

  },
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
    // request.getOrder().then(res => {
    //   console.log(res)
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#swiper_box {
  height: 300px;
  background-color: #39a9ed;
}
#swiper_box .van-swipe-item {
  color: #fff;
  line-height: 300px;
  font-size: 20px;
  text-align: center;
}
</style>

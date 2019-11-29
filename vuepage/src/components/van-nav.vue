<template>
  <van-nav-bar :title="title" :left-text="lefttext" :left-arrow="leftarrow" :right-text="righttext"
    @click-left="onClickLeft" @click-right="onClickRight">
    <van-icon v-if="name" :name="name" slot="right" :size="20" id="van_nav_icon">
      <div v-if="flag" class="tipsClass">
        <span class="arrow"></span>
        <span v-for="(item,key) in tips" :key="key" class="tips_span" @click.stop="tipsclick(item)">
          {{item}}
        </span>
      </div>
    </van-icon>
  </van-nav-bar>
</template>

<script>
export default {
  name: 'forgepsd',
  props: {
    title: { // 头部title
      type: String,
      required: true
    },
    lefttext: { // 左边的文字
      type: String
    },
    leftarrow: { // 是否显示左边箭头
      type: Boolean,
      default: false
    },
    righttext: {
      type: String
    },
    name: {
      type: String // 是否显示右侧插槽图标右侧图标的样式
    }

  },
  data () {
    return {
      flag: false,
      tips: ['扫一扫', '拍一拍', '选择照片']
    }
  },
  methods: {
    onClickLeft () {
      this.$emit('clickleft')
    },
    onClickRight () {
      this.$emit('clickright')
      if (this.name) {
        if (this.flag) {
          this.flag = false
        } else {
          this.flag = true
        }
      }
    },
    tipsclick (item) {
      this.flag = false
      //   console.log(this.flag);
      this.$emit('tipsclick', item)
    }
  },
  mounted () {
    document.addEventListener('click', (ele) => {
      //   console.log(ele)
      if (this.flag && ele.srcElement.id !== 'van_nav_icon') {
        this.flag = false
      }
      // ele.
    }, true)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.van-nav-bar {
  background-color: #cbdecc !important;
  color: #fff;
  position: fixed !important;
  top: 0;
  right: 0;
  left: 0;
}
#icon {
  position: relative;
}
.tipsClass {
  position: absolute;
  font-size: 14px;
  color: #fff;
  background-color: #5d5858;
  width: 100px;
  border-radius: 10px;
  top: 35px;
  right: -10px;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  z-index: 1001;
}
.tips_span {
  display: inline-block;
  height: 35px;
  line-height: 35px;
}
.arrow {
  position: absolute;
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid #5d5858;
  top: -8px;
  right: 12px;
}
#order .van-tabs__line {
  z-index: 0 !important;
}
#order .van-sticky {
  z-index: 1;
}
</style>

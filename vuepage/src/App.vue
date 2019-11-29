<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="router-view" />
    </transition>

  </div>
</template>

<script>
import '@/components/common.css'
export default {
  name: 'App',
  data () {
    return {
      transitionName: ''
    }
  },
  mounted () {
    let a = window.innerHeight
    document.getElementById('app').style.height = a + 'px'
    this.$store.commit('setHeight', a)
    this.$store.commit('resizeHeight', a)
    window.onresize = () => {
      return (() => {
        let resize = window.innerHeight
        this.$store.commit('resizeHeight', resize)
        //  console.log(this.$store.state.keyboardHeight);
      })()
    }
  },
  watch: {// 使用watch 监听$router的变化
    $route (to, from) {
      // console.log(to.meta.index)
      if (!to.meta.index || !from.meta.index) {
        this.transitionName = ''
        return
      }
      // console.log(to.meta);
      // 如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if (to.meta.index > from.meta.index) {
        // 设置动画名称
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  /* overflow: hidden; */
  position: relative;
}
.router-view {
  position: absolute;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  padding-top: 46px;
}
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeOutLeft {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
}
.slide-left-enter-active {
  animation: fadeInLeft 0.5s;
}
.slide-left-leave-active {
  animation: fadeOutRight 0.5s;
}

@keyframes fadeInRight {
  from {
    transform: translate3d(100%, 0, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeOutRight {
  from {
  }

  to {
    transform: translate3d(100%, 0, 0);
  }
}

.slide-right-enter-active {
  animation: fadeInRight 0.5s;
}
.slide-right-leave-active {
  animation: fadeOutLeft 0.5s;
}
</style>

<template>
  <div id="personInfo">
    <headnav title="个人信息" lefttext="返回" :leftarrow="true" @clickleft="clickleft"></headnav>
  </div>
</template>

<script>
import headnav from '@/components/van-nav.vue'
import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'personInfo',
  components: {
    headnav
  },
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
    clickleft () {
      this.$router.go(-1)
    }
  },
  mounted () {
    // console.log(this.loginInfo)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

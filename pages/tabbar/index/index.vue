<template>
  <view class="content">
    <!-- 自定义的搜索bar -->
    <navbar></navbar>

    <!-- tab 栏 -->
    <tab :list="tabList"></tab>
  </view>
</template>

<script>
  // easyCom: 自动识别 components/组件名/组件名.vue 并引入
  // import navbar from '@/components/navbar/navbar.vue'

  export default {
    // components:{
    //   navbar
    // },
    data() {
      return {
        title: 'Hello',
        tabList: []
      }
    },
    onLoad() {
      this.getLabel()
    },
    methods: {
      // 因为 tab 是个组件，所以数据的管理是在“主”页面文件里
      getLabel() {
        this.$api.get_label()
          .then((res) => {
            this.tabList = res.data
          })
      }
    }
  }
</script>

<style lang="scss">

</style>

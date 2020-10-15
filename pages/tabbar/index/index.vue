<template>
  <view class="content">
    <!-- 自定义的搜索bar -->
    <navbar></navbar>
    <view v-for="item in 100">
      {{item}} neiron
    </view>
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
        title: 'Hello'
      }
    },
    onLoad() {

    },
    methods: {

    }
  }
</script>

<style lang="scss">

</style>

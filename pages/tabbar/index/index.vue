<template>
  <view class="home">
    <!-- 自定义的搜索bar -->
    <navbar></navbar>

    <!-- tab 栏 -->
    <tab :list="tabList" :tabIndex="tabIndex" @tab="tab"></tab>

    <!-- 新闻内容（滚动） -->
    <view class="home-list">
      <list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
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
        title: 'Hello',
        tabList: [],
        tabIndex: 0,
        activeIndex: 0
      }
    },
    onLoad() {
      this.getLabel()
    },
    methods: {
      // 子组件传回来的事件在这里处理
      tab({
        data,
        index
      }) {
        this.activeIndex = index
      },
      change(current) {
        this.tabIndex = current
      },
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
  page {
    height: 100%;
    display: flex;
  }

  .home {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;

    .home-list {
      flex: 1;
      box-sizing: border-box;
    }
  }
</style>

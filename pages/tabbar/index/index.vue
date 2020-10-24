<template>
  <view class="home">
    <!-- 自定义导航栏 -->
    <navbar></navbar>

    <tab :list="tabList" :tabIndex="tabIndex" @tab="tab"></tab>

    <view class="home-list">
      <list :tab="tabList" :activeIndex="activeIndex" @change="change"></list>
    </view>
  </view>
</template>

<script>
  // easyCom components / 组件名/组件名.vue 局部引入
  export default {
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
      change(current) {
        this.tabIndex = current
        this.activeIndex = current
      },
      tab({
        data,
        index
      }) {
        this.activeIndex = index
      },
      getLabel() {
        // 调用云函数方法
        this.$api.get_label().then((res) => {
          const {
            data
          } = res
          data.unshift({
            name: '全部'
          })
          this.tabList = data
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

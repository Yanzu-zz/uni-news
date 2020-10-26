<template>
  <view class="navbar">
    <view class="navbar-fixed">
      <!-- 状态栏 -->
      <!-- 状态栏的高度是获取设备的顶部高度设置的，在H5页面时为0，在其他程序时则自动设值 -->
      <view :style="{height: statusBarHeight + 'px'}"></view>
      <!-- 导航栏 -->
      <view class="navbar-content" :class="{search:isSearch}" :style="{width: windowWidth + 'px',height:navbarHeight+'px'}"
        @click.stop="open">
        <!-- 返回按钮（首页不出现） -->
        <view v-if="isSearch" class="navbar-content__search-icons" @click="back">
          <uni-icons type="back" size="22" color="#fff"></uni-icons>
        </view>

        <!-- 非搜索页显示 -->
        <view v-if="!isSearch" class="navbar-search">
          <view class="navbar-search_icon">
            <uni-icons type="search" size="16" color="#999"></uni-icons>
          </view>
          <view class="navbar-search_text">uni-app, vue</view>
        </view>

        <!-- 搜索页显示 -->
        <view v-else class="navbar-search">
          <input class="navbar-search_text" type="text" v-model="val" placeholder="请输入你需要输入的内容..." @input="inputChange">
        </view>
      </view>
    </view>

    <!-- 填充 fixed 高度 -->
    <view :style="{height:statusBarHeight+navbarHeight+'px'}"></view>
  </view>
</template>

<script>
  export default {
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      isSearch: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        statusBarHeight: 20,
        navbarHeight: 45,
        windowWidth: 375,
        val: ''
      };
    },
    watch: {
      value(newVal) {
        this.val = newVal
      }
    },
    // 注意，onload 是用在页面上的
    // 而组件就只能用过 create
    created() {
      // 获取手机系统信息
      const info = uni.getSystemInfoSync()
      this.statusBarHeight = info.statusBarHeight

      this.windowWidth = info.windowWidth

      // #ifndef H5 || APP-PLUS || MP-ALIPAY
      // 获取胶囊的位置（微信小程序右上角分享和关闭位置）
      const menuButtonInfo = uni.getMenuButtonBoundingClientRect()

      // 下面开始动态计算胶囊位置并给予相应的代码
      // （胶囊底部高度 - 状态栏的高度） + （胶囊顶部高度 - 状态栏的高度）= 导航栏的高度
      this.navbarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
      this.windowWidth = menuButtonInfo.left
      // #endif
    },
    methods: {
      back() {
        uni.switchTab({
          url: '../../pages/tabbar/index/index'
        })
      },
      open() {
        if (this.isSearch) return
        uni.navigateTo({
          url: '/pages/home-search/home-search'
        })
      },
      inputChange(e) {
        const {
          value
        } = e.detail

        this.$emit('input', value)
      }
    }
  }
</script>

<style lang="scss">
  @import '../../common/css/icons.css';

  .navbar {
    width: 100%;

    .navbar-fixed {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
      width: 100%;
      background-color: $mk-base-color;

      .navbar-content {
        padding: 0 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 45px;
        box-sizing: border-box;

        .navbar-search {
          display: flex;
          align-items: center;
          padding: 0 10px;
          width: 100%;
          height: 30px;
          border-radius: 30px;
          background-color: #fff;

          .navbar-search_icon {
            margin-right: 10px;
          }

          .navbar-search_text {
            width: 100%;
            font-size: 14px;
            color: #999;
          }
        }

        &.search {
          padding-left: 0;

          .navbar-content__search-icons {
            margin-left: 10px;
            margin-right: 10px;
          }

          .navbar-search {
            border-radius: 5px;
          }
        }
      }
    }
  }
</style>

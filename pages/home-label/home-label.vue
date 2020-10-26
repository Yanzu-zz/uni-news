<template>
  <view class="label">
    <!-- 已添加的标签 -->
    <view class="label-box">
      <view class="label-header">
        <view class="label-title">我的标签</view>
        <view class="label-edit">编辑</view>
      </view>

      <view class="label-content">
        <view class="label-content__item" v-for="item in 13">
          {{item}} 标签
          <uni-icons class="icons-close" type="clear" size="18" color="red"></uni-icons>
        </view>
      </view>
    </view>

    <!-- 其它推荐标签 -->
    <view class="label-box">
      <view class="label-header">
        <view class="label-title">标签推荐</view>
      </view>

      <view class="label-content">
        <view class="label-content__item" v-for="item in 13">{{item}} 标签</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  page {
    background-color: #f5f5f5;
  }

  .label {
    .label-box {
      background-color: #fff;
      margin-bottom: 10px;

      .label-header {
        display: flex;
        justify-content: space-between;
        padding: 10px 15px;
        box-sizing: border-box;
        font-size: 14px;
        color: #666;
        border-bottom: 1px #f5f5f5 solid;

        .label-edit {
          color: #30b33a;
          font-weight: bold;
        }
      }

      .label-content {
        display: flex;
        flex-wrap: wrap;
        padding: 15px;
        padding-top: 0;

        .label-content__item {
          position: relative;
          padding: 2px 5px;
          margin-top: 12px;
          margin-right: 12px;
          border-radius: 5px;
          border: 1px #666 solid;
          font-size: 14px;
          color: #666;

          .icons-close {
            position: absolute;
            right: -8px;
            top: -8px;
            background-color: #fff;
            border-radius: 50%;
          }
        }
      }
    }
  }
</style>

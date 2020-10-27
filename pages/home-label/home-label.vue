<template>
  <view class="label">
    <!-- 已添加的标签 -->
    <view class="label-box">
      <view class="label-header">
        <view class="label-title">我的标签</view>
        <view class="label-edit" @click="editLabel">{{is_edit ? '完成' : '编辑'}}</view>
      </view>

      <uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
      <view v-if="!loading" class="label-content">
        <view class="label-content__item" v-for="(item,index) in labelList" :key="item._id">
          {{ item.name }}
          <uni-icons v-if="is_edit" class="icons-close" type="clear" size="18" color="red" @click="del(index)"></uni-icons>
        </view>
        <view v-if="labelList.length === 0  && !loading" class="no-data">
          当前没有数据
        </view>
      </view>
    </view>

    <!-- 其它推荐标签 -->
    <view class="label-box">
      <view class="label-header">
        <view class="label-title">标签推荐</view>
      </view>

      <uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
      <view v-if="!loading" class="label-content">
        <view class="label-content__item" v-for="(item, index) in list" :key="item._id">
          {{ item.name }}
          <uni-icons v-if="is_edit" class="icons-add" type="plus" size="18" color="green" @click="add(index)"></uni-icons>
        </view>
        <view v-if="list.length === 0 && !loading" class="no-data">
          当前没有数据
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        is_edit: false,
        labelList: [], // 我的标签
        list: [], // 推荐标签
        loading: true
      }
    },
    onLoad() {
      this.getLabel()
    },
    methods: {
      editLabel() {
        // 正在编辑状态
        if (this.is_edit) {
          this.is_edit = false
          this.setUpdateLabel(this.labelList)
        } else { // 正常状态
          this.is_edit = true
        }
      },
      add(index) {
        this.labelList.push(this.list[index])
        this.list.splice(index, 1)
      },
      del(index) {
        this.list.push(this.labelList[index])
        this.labelList.splice(index, 1)
      },
      setUpdateLabel(label) {
        let newArrIds = []
        label.forEach(item => {
          newArrIds.push(item._id)
        })

        uni.showLoading()
        this.$api.update_label({
          label: newArrIds
        }).then(res => {
          uni.hideLoading()
          uni.showToast({
            title: '更新成功',
            icon: 'none'
          })

          // 自定义事件只能在打开的页面触发
          uni.$emit('labelChange')
        })
      },
      getLabel() {
        this.loading = true
        this.$api.get_label({
          type: 'all'
        }).then((res) => {
          const {
            data
          } = res

          this.labelList = data.filter(item => item.current)
          this.list = data.filter(item => !item.current)
          this.loading = false
        })
      }
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

          .icons-close,
          .icons-add {
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

  .no-data {
    padding: 50px 0;
    width: 100%;
    text-align: center;
    color: #999;
    font-size: 14px;
  }
</style>

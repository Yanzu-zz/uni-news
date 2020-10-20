<template>
  <swiper class="home-swiper" :current="activeIndex" @change="change">
    <swiper-item v-for="(item, index) in tab" :key="index" class="swiper-item">
      <list-item :list="listCatchData[index]" :load="load[index]" @loadmore="loadmore"></list-item>
    </swiper-item>
  </swiper>
</template>

<script>
  import listItem from './list-item.vue'

  export default {
    components: {
      listItem
    },
    props: {
      tab: {
        type: Array,
        default () {
          return []
        }
      },
      activeIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        listCatchData: {},
        // 每个标签的加载页面不能共享
        load: {},
        // 加载数据条数倒是可以，因为这是统一的
        pageSize: 10
      };
    },
    watch: {
      tab(newVal) {
        if (newVal.length === 0) return
        this.getList(this.activeIndex)
      }
    },
    methods: {
      loadmore() {
        if (this.load[this.activeIndex].loading === 'noMore') return
        
        this.load[this.activeIndex].page++
        this.getList(this.activeIndex)
      },
      change(e) {
        const {
          current
        } = e.detail

        this.$emit('change', current)

        // 当数据已经请求过时，用户再点击再滑动也不会再请求一遍
        if (!this.listCatchData[current] || this.listCatchData[current].length === 0) {
          this.getList(current)
        }
      },
      getList(current) {
        if (!this.load[current] || this.load[current].length === 0) {
          this.load[current] = {
            page: 1,
            loading: 'loading'
          }
        }

        this.$api.get_list({
            name: this.tab[current].name,
            page: this.load[current].page,
            pageSize: this.pageSize
          })
          .then(res => {
            const {
              data
            } = res

            // 如果已经没有更多数据
            if (data.length === 0) {
              let oldLoad = {}
              oldLoad.loading = 'noMore'
              oldLoad.page = this.load[current].page
              this.$set(this.load, current, oldLoad)
              // 强制渲染页面
              this.$forceUpdate()
              return
            }

            let oldList = this.listCatchData[current] || []
            oldList.push(...data)

            // 由于 js 的限制，单纯这样赋值页面是不会重新渲染的
            // this.listCatchData[current] = data
            // 必须用这个 Vue 提供的函数
            this.$set(this.listCatchData, current, oldList)
          })
      }
    }
  }
</script>

<style lang="scss">
  .home-swiper {
    height: 100%;

    .swiper-item {
      height: 100%;
      overflow: hidden;

      .list-scroll {
        height: 100%;
      }
    }
  }
</style>

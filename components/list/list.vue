<template>
  <swiper class="home-swiper" :current="activeIndex" @change="change">
    <swiper-item v-for="(item ,index) in tab" :key="index" class="swiper-item">
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
        load: {},
        pageSize: 10
      };
    },
    watch: {
      tab(newVal) {
        if (newVal.length === 0) return
        
        this.listCatchData = {}
        this.load = {}
        this.getList(this.activeIndex)
      }
    },
    // onLoad 在页面才会有周期 ，而 created 是在组件中
    created() {
      // this.$nextTick(function() {
      //   this.getList(this.activeIndex)
      // })
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
        // 当数据不存在 或者 长度是 0 的情况下，才去请求数据
        if (!this.listCatchData[current] || this.listCatchData[current].length === 0) {
          this.getList(current)
        }

      },
      getList(current) {
        if (!this.load[current]) {
          this.load[current] = {
            page: 1,
            loading: 'loading'
          }
        }

        this.$api.get_list({
          name: this.tab[current].name,
          page: this.load[current].page,
          pageSize: this.pageSize,
        }).then(res => {
          const {
            data
          } = res
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

          // 懒加载
          // 由于 js 的限制，单纯这样赋值页面是不会重新渲染的，必须用这个 Vue 提供的 $set 函数
          this.$set(this.listCatchData, current, oldList)
        }).catch(e => {
          console.log(e)
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

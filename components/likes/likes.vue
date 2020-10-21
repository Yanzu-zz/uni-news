<template>
  <view class="icons">
    <uni-icons type="heart" size="20" 
    color="#f07373" @click.stop="likeTap"></uni-icons>
  </view>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods:{
      likeTap(){
        console.log('收藏成功')
      }
    }
  }
</script>

<style lang="scss">
  .icons {
    positon: absolute;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
  }
</style>

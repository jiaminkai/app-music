<template>
  <view class="category">
     <scroll-view scroll-x="true" class="scroll">
        <view class="item"  @click="change(item,index)" v-for="(item,index) in this.category" :class="countindex==index?'active':''" :key="index">{{item.name}}</view>
     </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return{
      countindex:0
    }
  },
  props:{
    category:Array
  },
  methods:{
    change(item,index){
      this.countindex = index
      this.$emit("change",item.id )
    }
  }
}
</script>

<style>
  .category{
    width: 100%;
    position:fixed;
    top: 80rpx;
    background-color:#fff;
    height:84rpx;
    display: flex;
  }
  .scroll{
    white-space: nowrap;
    box-shadow: 2px 2px 5px #ccc; 
  }
  .list{
    display: flex;
    flex-wrap: nowrap;
  }
  .item{
    	display: inline-block;
		  padding:0 26rpx;
      height:100%;
      line-height: 80rpx;
      font-size: 30rpx;
  }
  .active{
    color: coral;
    position: relative;
  }
  .active::after{
    content: "";
    display: block;
    width: 100%;
    height:2rpx;
    position: absolute;
    bottom: 0;
    left: 0;
    background: coral;
  }
</style>
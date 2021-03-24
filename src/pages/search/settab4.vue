<template>
  <view class="video">
	  <view class="videoitem" v-for="(item,index) in this.songs.videos" :key="index">
		  <view class="bj">
			  <img :src="item.coverUrl" alt="">
		  </view>
		  <text class="title">{{item.title}}</text>
		  <view class="icon">
			  
		  </view>
		  <view class="playtime">
			  {{$palytime(item.playTime)}}
		  </view>
	  </view>
  </view>
</template>

<script>
export default {
	props:{
		songs:Object
	}
}
</script>

<style>
 .video{
	 width:100%;
	 padding: 20rpx 20rpx;
	 box-sizing: border-box;
	 display: flex;
	 flex-wrap: wrap;
	 justify-content: space-between;
	 background:#f5f5f5
 }
 .videoitem{
	 width:48.2%;
	 display: flex;
	flex-direction: column;
	height:490rpx;
	border-radius:30rpx;
	background: #fff;
	margin-bottom: 25rpx;
	box-shadow: 4px 2px 10px #eee;
	position: relative;
 }
 .bj{
	 height:340rpx;
	 border-top-left-radius:20rpx;
	 border-top-right-radius:20rpx;
	 overflow: hidden;
	 
 }
 .bj img{
	 width:400rpx;
	 height:360rpx;
	 
 }
 .title{
	 font-size: 23rpx;
	 padding: 20rpx 15rpx;
	 box-sizing: border-box;
	 text-align: left;
	 height:80rpx;
	 overflow: hidden;
	 display:flex;
 }
 .playtime{
	 font-size: 26rpx;
	 color: #f5f5f5;
	 position:absolute;
	 bottom: 160rpx;
	 right: 16rpx;
	 /* z-index: 1; */
 }

</style>
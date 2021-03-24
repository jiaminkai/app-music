<template>
  <view class="commentitem">
	  <view class="commentitemimg">
		  <img :src="itemdata.user.avatarUrl" alt="">
	  </view>
	  <view class="content">
		  	<view class="userbox">
				  <view class="usertext">
					  <view class="username">{{itemdata.user.nickname}} &nbsp; <text v-if="itemdata.user.vipType !=0" class="iconfont vip">&#xe619;</text></view>
				  	  <text class="time">{{this.$time(itemdata.time)}}</text>
				  </view>
				  <view class="dianzan">
					  <text class="count">{{itemdata.likedCount}}</text>
					  <text class="iconfont">&#xe604;</text>
				  </view>
			</view>
			<view class="text">
				{{itemdata.content}}
			</view>
	  </view>

  </view>
</template>

<script>
export default {
	props:{
		itemdata:Array
	}
}
</script>

<style scoped>
	@font-face {
	font-family: 'iconfont';  /* project id 2223549 */
	src: url('//at.alicdn.com/t/font_2223549_daaufagrmdu.eot');
	src: url('//at.alicdn.com/t/font_2223549_daaufagrmdu.eot?#iefix') format('embedded-opentype'),
	url('//at.alicdn.com/t/font_2223549_daaufagrmdu.woff2') format('woff2'),
	url('//at.alicdn.com/t/font_2223549_daaufagrmdu.woff') format('woff'),
	url('//at.alicdn.com/t/font_2223549_daaufagrmdu.ttf') format('truetype'),
	url('//at.alicdn.com/t/font_2223549_daaufagrmdu.svg#iconfont') format('svg');
	}
	.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}	
	.commentitem{
		display: flex;
	}
	.content{
		display: flex;
		flex:1;
		flex-direction: column;
		border-bottom: 1px solid #f5f5f5;
		padding: 10rpx 15rpx 10rpx 0;
	}
	.commentitemimg{
		display: flex;
		width:140rpx;
		place-content: center;
	}
	.commentitemimg img{
		width:90rpx;
		height: 90rpx;
		border-radius: 50%;
	}
	.userbox{
		display: flex;
		font-size: 28rpx;
		justify-content: space-between;
		align-items: center;
	}
	.vip{
		margin-left: 20rpx;
		font-size: 32rpx;
		color: coral;
	}
	.usertext{
		display: flex;
		flex-direction: column;
	}
	.time{
		font-size: 26rpx;
		color:rgb(206, 194, 194)
	}
	.text{
		padding: 10rpx 0;
		font-size: 32rpx;
		margin-right: 40rpx;box-sizing: border-box;
	}
	.count{
		font-size: 26rpx;
		color:rgb(206, 194, 194);
		margin-right: 15rpx;
	}
</style>
<template>
  <view class="artists">
	  <view class="aetistsitem" v-for="(item,index) in this.songs.artists" :key="index">
		  <img :src="item.img1v1Url" alt="">
		  <text class="name">{{item.name}}</text>
		  <view class="icong" ><text class="iconfont">&#xebd8;</text><text>已入驻</text></view>
	  </view>
  </view>
</template>

<script>
export default {
	props:{
		songs:Array
	}
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_dtz3a3z90d.eot');
  src: url('//at.alicdn.com/t/font_2223549_dtz3a3z90d.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_dtz3a3z90d.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_dtz3a3z90d.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_dtz3a3z90d.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_dtz3a3z90d.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
	.artists{
		background:#fff;
	}
	.aetistsitem{
		display: flex;
		place-items: center;
		border-bottom: 1px solid #f5f5f5;
		padding: 15rpx 20rpx;box-sizing: border-box;
	}
	.aetistsitem img{
		width:80rpx;height: 80rpx;
		border-radius: 50%;
		box-shadow: 1rpx 1rpx 5rpx #f5f5f5;
		margin-right: 30rpx;
	}
	.name{
		font-size: 26rpx;
		font-weight: 500;
	}
	.icong{
		font-size: 27rpx;
		margin-left: auto;
	}
	.icong text:nth-child(1){
		color: coral;
		margin-right: 15rpx;
	}
</style>
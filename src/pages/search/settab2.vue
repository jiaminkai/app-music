<template>
  <view class="songs"  >
	  <view class="title">
		  <text class="iconfont">&#xe768;</text>
		  <text class="titlename">全部播放</text>
	  </view>
	  <view class="songitem" v-for="(item,index) in this.songs.songs" :key="index">
		  <view class="center">
			  <view class="name">{{item.name}}</view>
			  <view class="username"><text>{{item.ar[0].name}}</text>-<text v-if="item.al.name">{{item.al.name}}</text></view>
			  <view class="desc ">{{item.alia[0]}}</view>
		  </view>
		  <view class="mv iconfont" v-if="item.mv!=0">&#xe62c;</view>
		  <view class="move iconfont" >&#xe689;</view>

	  </view>	
  </view>
</template>

<script>
export default {
	props:{
		songs:Object
	},
	methods:{
		nextpage(){
			console.log("aaa")
		}
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
	.songs{
		display: flex;
		flex-direction: column;
		width: 100%;
		background: #fff;
		padding:30rpx;
		box-sizing: border-box;
	}
	.title{
		font-size: 36rpx;
		display:flex;
		place-items: center;
		margin-bottom: 25rpx;
	}
	.title text:nth-child(1){
		color: coral;
		font-size: 48rpx;
		margin-right: 20rpx;
	}
	.songitem{
		display: flex;
		padding: 15rpx 10rpx;
		place-items: center;
		border-bottom: 1px solid #f5f5f5;
	}
	.songindex{
		font-size: 36rpx;
		width:40rpx;
		text-align: center;
		padding-right:25rpx;
	}
	.center{
		font-size: 30rpx;
		width:500rpx
	}
	.name{
		flex: 1;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.move{
		font-size: 40rpx;
		position:absolute;
		right: 0rpx;
		width: 76rpx;
	}
	.mv{
		font-size: 40rpx;
		position:absolute;
		right: 90 rpx;
	}
	.username{
		font-size: 22rpx;
		color: rgb(158, 152, 152);
	}
	.desc{
		flex: 1;
		font-size: 22rpx;
		color:  rgb(158, 152, 152);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
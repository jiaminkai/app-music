<template>
	  <view class="album">
			<view class="albumsitem" v-for="(item,index) in this.songs.albums" :key="index">
				<view class="albumimg">
					<img :src="item.blurPicUrl" alt="">
				</view>
				<view class="content">
					<view class="name">{{item.name}}</view>
					<view class="user">{{item.artist.name}} &nbsp; &nbsp; {{$time(item.publishTime)}}</view>
				</view>
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
  .album{
    background:#fff;
    padding-top: 20rpx;
  }
  .albumsitem{
		display: flex;
		margin: 25rpx 0;
    border-bottom: 1px solid #f5f5f5;
	}
	.albumimg{
		position: relative;
	}
	.albumimg::after{
		content:"";
		display:block;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		position:absolute;
		background:#000;
		top: -10rpx;
	}
	.albumimg img{
		width:100rpx;
		height:100rpx;
		position: relative;
		z-index: 1;
		border-radius: 15rpx;
		margin-right: 20rpx;
	}
  .name{
		font-size: 30rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 500rpx;
	}
	.user{
		font-size: 22rpx;
		color: rgb(158, 152, 152);
	}
  .content{
		font-size: 24rpx;
		display: flex;
		flex-direction: column;
		place-self: center;
		line-height: 40rpx;
	}
</style>
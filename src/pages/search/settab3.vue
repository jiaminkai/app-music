<template>
	<view class="playlist" v-if="songs.playlists">
		<view class="playimg" v-for="(item,index) in this.songs.playlists" :key="index">
				<img :src="item.coverImgUrl" alt="">
				<view class="content">
					<text class="name">{{item.name}}</text>
					<text class="user">{{item.trackCount}}首,by {{item.creator.nickname}},播放{{$palycount(item.playCount)}}次</text>
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

<style scoped>
		.playlist{
		padding:30rpx;
		background: #fff;
		box-sizing: border-box;
	}
	.playimg{
		display: flex;
		padding: 8rpx 0;
		
	}
	.playimg img{
		width:90rpx;
		height:90rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
	}
		.content{
		font-size: 24rpx;
		display: flex;
		flex-direction: column;
		place-self: center;
		line-height: 40rpx;
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
</style>
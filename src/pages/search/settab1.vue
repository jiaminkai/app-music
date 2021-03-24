<template>
  <view class="songs">
	  <!-- 猜你喜欢 -->
	  <view class="like" >
		  <text style="font-size:24rpx;color:#ccc">你可能感兴趣</text>
		  <view class="srtisitem" v-if="this.like.artist" >
			  	<img style="width:100rpx;height:100rpx;border-radius:50%;margin-right:20rpx" :src="this.like.artist[0].img1v1Url">
				<view class="content">
					<text class="name">歌手：{{this.like.artist[0].name}}</text>
					<text class="user">粉丝：{{this.$palycount(this.like.artist[0].fansSize)}} &nbsp; 歌曲：{{this.like.artist[0].musicSize}}</text>
					<text class="yun" v-if="this.like.artist[0].searchCircle">TA的云圈</text>
				</view>
		  </view>
		  <view class="albumsitem" v-if="this.like.album">
			    <view class="albumimg" >
					<img  :src="this.like.album[0].blurPicUrl">
				</view>
				<view class="content">
					<text class="name">专辑：{{this.like.album[0].name}}</text>
					<view class="user">{{this.like.album[0].artist.name}}</view>
				</view>
				
		  </view>
		  <view class="playimg"   style="width:100rpx;height:100rpx;margin-right:20rpx" >
			  <img  :src="this.songs.playList.playLists[0].coverImgUrl" alt="">
			  <view class="content">
				<text class="name">视频歌单：{{this.songs.playList.playLists[0].name}}</text>
				<text class="user">{{this.songs.playList.playLists[0].trackCount}}首,&nbsp; 播放:{{$palycount(this.songs.playList.playLists[0].playCount)}}次</text>
		  	  </view>
		  </view>

	  </view>
	  <!-- 单曲 -->
	  <view class="songbox">
			<view class="title">单曲</view>
			<view class="songsitem" v-for="(item,index) in this.songs.song.songs" :key="index">
				<view class="content">
					<text class="name">{{item.name}}</text>
					<text class="user">{{item.ar[0].name}} - {{item.al.name}}</text>
				</view>
				<view class="iconfont mover">&#xe631;</view>
			</view>
			<view class="songmove">{{songs.song.moreText}}</view>
	  </view>
	  <!-- 专辑 -->
	  <view class="album">
			<view class="title" style="border:none">专辑</view>
			<view class="albumsitem" v-for="(item,index) in this.songs.album.albums" :key="index">
				<view class="albumimg">
					<img :src="item.blurPicUrl" alt="">
				</view>
				<view class="content">
					<view class="name">{{item.name}}</view>
					<view class="user">{{item.artist.name}} &nbsp; &nbsp; {{$time(item.publishTime)}}</view>
				</view>
			</view>
			<view class="playListmove">{{songs.album.moreText}}</view>
	  </view>
		<!-- 歌单 -->
	  <view class="playlist" v-if="songs.playList">
		  <view class="title">歌单</view>
		  <view  @click="toplay(item.id)" class="playimg" v-for="(item,index) in this.songs.playList.playLists" :key="index">
			  <img :src="item.coverImgUrl" alt="">
			  <view class="content">
			  <text class="name">{{item.name}}</text>
			  <text class="user">{{item.trackCount}}首,by {{item.creator.nickname}},播放{{$palycount(item.playCount)}}次</text>
		  </view>
		  </view>
		  <view class="playListmove">{{songs.playList.moreText}}</view>
	  </view>
	  <!-- 视频 -->
	  <view class="video" v-if="songs.video">
		   <view class="title">视频</view>
		   <view class="videoitem" v-for="(item,index) in this.songs.video.videos" :key="index">
			   <view class="videoimg">
				   <img :src="item.coverUrl" alt="">
				   <view class="content">
					   <view class="videoname">{{item.title}}</view>
					   <view class="user">{{$palytime(item.playTime)}},by &nbsp;{{item.creator[0].userName}},&nbsp; {{$palycount(item.durationms)}}播放</view>
				   </view>
			   </view>
		   </view>
		   <view class="playListmove">{{songs.video.moreText}}</view>
	  </view>
	  <!-- 艺人 -->
	  <view class="artist" v-if="songs.artist">
			<view class="title" style="border:none">艺人</view>
			<view class="srtisitem" v-for="(item,index) in this.songs.artist.artists" :key="index">
				<img class="srtisitemimg" :src="item.img1v1Url">
				<text class="name">{{item.name}}</text>
				<view class="artistgaunzhu">
					<text class="iconfont" style="color:coral">&#xebd8;</text>
					<text class="user">已入驻</text>
				</view>
			</view>
			<view class="playListmove">{{this.songs.artist.moreText}}</view>
	  </view>
	  <!-- 相关搜索 -->
	  <view class="remmoner" v-if="songs.sim_query">
		  <view class="title" style="border:none">相关搜索</view>
		  <view class="remmoneritem">
				<text class="rembutton" v-for="(item,index) in this.songs.sim_query.sim_querys" :key="index">{{item.keyword}}</text>
			</view>
	  </view>
	  <!-- 用户 -->
	  <view class="userbox" v-if="songs.user">
		  <view class="title" style="border:none">用户</view>
		  <view class="remmoneritem" v-for="(item,index) in this.songs.user.users" :key="index">
				<img class="srtisitemimg" :src="item.avatarUrl" alt="">
				<view class="content">
					<view class="name" style="width:300rpx">{{item.nickname}}</view>
					<view class="user"></view>
				</view>
				<text class="button"><text class="iconfont">+</text> 关注</text>
		  </view>
		  <view class="playListmove">{{this.songs.user.moreText}}</view>

	  </view>
  </view>
</template>

<script>
export default {
	props:{
		songs:Array,
		like :Object,
	},
	methods:{
		toplay(id){
			uni.navigateTo({
				url:"/pages/recommend/recommendplay?id="+id+""
			})
		}
	}
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_hr5je8eczw.eot');
  src: url('//at.alicdn.com/t/font_2223549_hr5je8eczw.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_hr5je8eczw.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_hr5je8eczw.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_hr5je8eczw.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_hr5je8eczw.svg#iconfont') format('svg');
}
	.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
	.songs{
		width:100%;
		padding: 30rpx;
		box-sizing: border-box;
	}
	.songbox,.playlist,.album,.artist,.remmoner,.userbox,.video,.like{
		border-radius:20rpx;
		background: #fff;
		padding: 25rpx;
		box-shadow: 1rpx 1rpx 10rpx #f5f5f5;
		margin-bottom: 30rpx;
	}
	.songsitem{
		display: flex;
		width: 100%;
		padding:  15rpx 0;
		border-bottom: 1px solid #f5f5f5;
	}
	.title{
		font-weight: 700;
		font-size: 36rpx;
		padding-bottom: 20rpx;
		border-bottom: 1px solid #f5f5f5;
	}
	.content{
		font-size: 24rpx;
		display: flex;
		flex-direction: column;
		place-self: center;
		line-height: 40rpx;
	}
	.mover{
		margin-left: auto;
		margin-right: 20rpx;
		font-size: 36rpx;
		font-weight: 600;
		place-self: center;
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
	.songmove{
		font-size: 24rpx;
		text-align: center;
		padding-top: 15rpx;
		color: rgb(158, 152, 152);
	}
	.playlist{
		margin-top: 30rpx;
	}
	.playimg{
		display: flex;
		padding: 15rpx 0;
		
	}
	.playimg img{
		width:90rpx;
		height:90rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
	}
	.playListmove{
		font-size: 24rpx;
		text-align: center;
		padding-top: 15rpx;
		color: #ccc;
		border-top: 1rpx solid #f5f5f5;
	}
	.albumsitem{
		display: flex;
		margin: 15rpx 0;
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
	.srtisitem{
		display: flex;
		place-items: center;
		padding: 10rpx 0;
	}
	.srtisitemimg{
		width: 80rpx;
		height: 80rp;
		border-radius: 50%;
		box-shadow: 1rpx 1rpx 5rpx #ccc;
		margin-right: 30rpx;
	}	
	.artistgaunzhu{
		display: flex;
		font-size: 28rpx;
		width: 160rpx
	}
	.artistgaunzhu text:nth-child(1){
		margin-right: 10rpx;
	}
	.remmoneritem{
		display: flex;	
		flex-wrap: wrap;
		place-items: center;
	}
	.rembutton{
		font-size: 30rpx;
		padding: 0 15rpx;
		border-radius: 30rpx;
		background: #eee;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}
	.button{
		font-size: 22rpx;
		border: 1px solid coral;
		border-radius: 40rpx;
		padding:0 20rpx;
		height:40rpx;
		line-height: 40rpx;
		margin-left: auto;
		color: coral;
	}
	.videoitem{
		display: flex;
		place-items: center;
	}
	.videoimg{
		display: flex;
	}
	.videoimg img{
		width: 190rpx;
		height:115rpx;
		border-radius:20rpx;
		margin-right: 20rpx;
		padding:10rpx 0;
	}
	.yun{
		color: #00a1d6;
		font-size: 16rpx;
		-webkit-text-size-adjust:none
	}
</style>
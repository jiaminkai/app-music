<template>
  <view>
	<!-- 轮播图 -->
	<swiper
		:indicator-dots="true"
		:autoplay="true"
		interval="2000"
		:circular="true"
		class="banner"
	>
		<swiper-item class="banner-item" v-for="(item,index) in this.banner" :key="index">
			<img :src="item.pic" alt="">
		</swiper-item>
	</swiper>
	<!-- 推荐tab -->
	<view class="subtab">
			<scroll-view class="scroll-view_H" :show-scrollbar="true" scroll-x="true"  scroll-left="120">
				<view  class="scroll-view-item_H uni-bg-red" v-for="(item,index) in this.icon" :key="index">
					<view  class="scroll-view-item-icon" @click="tabto(index)">
						<img :src="item.iconUrl" alt="">
						<text class="">{{item.name}}</text>
					</view>
				</view>
				
			</scroll-view>
	</view>
	<!-- 推荐歌单 -->
	<view class="subablum">
		<view class="ablum">
			<text>推荐歌单</text>
				<view class="move" @click="toplayguan">
					<text>更多</text>
					<text class="iconfont moveleft">&#xe65f;</text>
				</view>
		</view>
		<view class="subablumlist" >
			<scroll-view :scroll-x="true" :scroll-with-animation="true" scroll-left="40" :show-scrollbar="false" class="scroll-view_H">
				<view class="subablumitem" @click="toplay(item)" v-for="(item,index) in this.paly" :key="index">
					<view class="ablumitem">
						<img :src="item.picUrl" alt="">
						<text class="name">{{item.name}}</text>
						<view class="playcount">
							<text class="iconfont">&#xe630;</text>
							<text >{{item.playCount}}</text>
						</view>
						
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
	<!-- 最新歌曲 -->
	<view class="newmusic">
		<view class="mintitle">私人订制</view>
		<view class="newmuscititle">
			<text class="titleleft"><text class="iconfont">&#xe62b;</text>推荐新音乐</text>
			<text class="titleright"><text class="iconfont">&#xe630;</text>更多</text>
		</view>
		<view class="newsongs">
			<swiper
				:autoplay="false"
				class="newswiper"
				next-margin="30px"
				previous-margin="20px"
			>
				<swiper-item class="newsong" v-for="(items,index) in this.newsongs"  :key="index">
					<view class="songitem" v-for="(item) in items"  :key="item.id">
						<img :src="item.picUrl" alt="">
						<text class="songartists">
							<text class="songname">{{item.name}}</text> - <text class="artistsname">{{item.song.artists[0].name}}</text>
						</text>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
	<!-- 推荐节目 -->
	<view class="subablum">
		<view class="ablum">
			<text>推荐歌单</text>
				<view class="move">
					<text>更多</text>
					<text class="iconfont moveleft">&#xe65f;</text>
				</view>
		</view>
		<view class="subablumlist" >
			<scroll-view :scroll-x="true" :scroll-with-animation="true" scroll-left="40" :show-scrollbar="false" class="scroll-view_H">
				<view class="subablumitem" v-for="(item,index) in this.programs" :key="index">
					<view class="ablumitem">
						<img :src="item.coverUrl" alt="">
						<!-- <text class="dtname">{{item.name}}</text> -->
						<text class="dtdesc">{{item.reason}}</text>
						<view class="dtplay">
							<text class="iconfont">&#xe768;</text>
						</view>
						
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
	<!-- 音乐视频 -->
	<view class="musicmv">
		<view class="musicmvtitle"><text>精选音乐视频</text><text class="titleright"><text class="iconfont">&#xe630;</text>更多</text></view>
		<scroll-view class="musiclist" :scroll-x="true">
			<view class="musiclist">
				<view class="musicmvitem" v-for="(item,index) in this.musicmv" :key="index">
					<img :src="item.picUrl" alt="">
					<view class="musicmvitemtext">
						<text class="mvname">{{item.name}}</text>
						<text class="mvartistname">{{item.artistName}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
	<!-- 热门歌手 -->
	<view class="artists">
		<view class="musicmvtitle"><text>热门歌手</text><text class="titleright"><text class="iconfont">&#xe630;</text>查看更多</text></view>
		<view class="hotaetists">
			<view class="aetistsitem" v-for="(item,index) in this.hotartists" :key="index">
				<img :src="item.picUrl" alt="">
				<text class="aetistsname">{{item.name}}</text>
				<text class="iconfont guanicon">&#xe605;</text>
			</view>
		</view>
	</view>
	<!-- 音乐日历 -->
	<view class="artists" v-if="this.musiccalendar.length!=0">
		<view class="musicmvtitle"><text>音乐日历</text><text class="titleright"><text class="iconfont">&#xe630;</text>查看更多</text></view>
		<view class="calendar">
			<view class="aetistsitem" v-for="(item,index) in this.hotartists" :key="index">
				<img :src="item.picUrl" alt="">
				<text class="aetistsname">{{item.name}}</text>
				<text class="iconfont guanicon">&#xe605;</text>
			</view>
		</view>
	</view>
  </view>
</template>

<script>
export default {
	props:{
		banner:{
			type:Array,
			default:{
				return:[]
			}
		},
		icon:{
			type:Array,
			default:{
				return:[]
			}
		},
		paly:{
			type:Array,
			default:{
				return:[]
			}
		},
		newsongs:{
			type:Array,
			default:{
				return:[]
			}
		},
		musicmv:{
			type:Array,
			default:{
				return:[]
			}
		},
		hotartists:{
			type:Array,
			default:{
				return:[]
			}
		},
		programs:{
			type:Array,
			default:{
				return:[]
			}
		},
		musiccalendar:{
			type:Array,
			default:{
				return:[]
			}
		},
	},
	methods: {
		// 每日推荐跳转
		tabto(index){
			if(index==0){
				uni.navigateTo({
					url:'/pages/recommend/recommend'
				})
			}
			if(index==2){
				this.toplayguan()
			}
		},
		// 调往歌单详情
		toplay(item){
			console.log(item)
			uni.navigateTo({
				url:'/pages/recommend/recommendplay?id='+item.id
			})
		},
				// 调往歌单详情
		toplayguan(){
			uni.navigateTo({
				url:'/pages/playlist/playlist'
			})
		}
	}
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_6flch1nx8zm.eot');
  src: url('//at.alicdn.com/t/font_2223549_6flch1nx8zm.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_6flch1nx8zm.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_6flch1nx8zm.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_6flch1nx8zm.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_6flch1nx8zm.svg#iconfont') format('svg');
}

	.iconfont{
    font-family:"iconfont" !important;
    font-size:20px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
		.banner{
		height:150px;
		width:100%;
		margin-top: 100rpx;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.banner-item{
		width:100%;
		height:100%;

	}
	.banner-item img{
		width:100%;
		height:100%;
		border-radius:15px;
	}
	.subtab{
		background:#fff;
		padding-bottom: 20rpx;
	}
	.scroll-view_H{
		white-space: nowrap;
		width:100%;

	}
	.scroll-view-item_H{
		display: inline-block;
		padding:0 26rpx;

	}

	.scroll-view-item-icon{
		display: flex;
		flex-direction: column;
		font-size:24rpx;
		align-items:center;

	}

	.scroll-view-item-icon img{
		background:red;
		width:90rpx;
		border-radius: 50%;
		height:90rpx;
		margin-bottom:10rpx;

	}
	.ablum{
		display: flex;
		justify-content: space-between;
		font-size: 34rpx;
		padding:36rpx 26rpx 26rpx ;
	}
	.move{
		font-size: 28rpx;
		border: 1px solid #ccc;
		border-radius: 20px;
		padding: 0 12rpx;
	}
	.subablum{
		display:flex;
		flex-direction: column;
		background:#fff;
		margin-top: 1px;
	}
	.ablum text:nth-child(1){
		font-weight: 600;
	}
	.move text:nth-child(1){
		font-size: 28rpx;
		font-weight: 500;
	}
	.move text:nth-child(2){
		font-size: 28rpx;
		font-weight: 500;
	}
	.subablumitem{
		display:inline-block;
		margin-bottom: 20rpx;

	}
	.ablumitem{
		display:flex;
		flex-direction: column;
		width: 200rpx;
		margin: 0 15rpx;
		position: relative;
	}
	.ablumitem img{
		width:200rpx;
		height:200rpx;
		border-radius: 8px;
	}
	.name{
		font-size: 24rpx;
		width: 100%;
		white-space: pre-line;
		line-height: 28rpx;
		height: 56rpx;
		overflow: hidden;
		text-align: left;
	}
	.playcount{
		position:absolute;
		color: #Fff;
		right: 10rpx;
		top:-2rpx;
	}
	.playcount text{
		font-size: 16rpx;
	}
	.newmusic{
		display: flex;
		flex-direction: column;
		background:#fff;
		margin: 20rpx 0;
		padding: 10rpx 20rpx;
		
	}
	.mintitle{
		color: #ccc;
		font-size: 12rpx;
		
    	margin-left: 12rpx;
	}
	.newmuscititle{
		display: flex;
		justify-content: space-between;
		width: 100%;
		font-size: 34rpx;
		
	}
	.titleleft {
		font-size: 34rpx;
		font-weight: 600;
	}
	.titleleft text{
		font-size: 30rpx;
		font-weight: 400;
	}
	.titleright {
		font-size: 22rpx;
		border: 1px solid #ccc;
		border-radius: 24rpx;
		padding:0 15rpx;
		display:flex;
		align-items: center;
	}
	.titleright text {

		font-size: 22rpx;
		font-weight: 500;
	}
	.newswiper{
		width: 100%;
	}
	.newsongs{
		width: 100%;
		height:500rpx;
	}
	.newsong{
		box-shadow: 2px 2px 10px #ccc;
		border-radius: 30rpx;
		height:100%;
		margin: 20rpx 0;
		box-sizing: border-box;
	}
	.songitem{
		display: flex;
		margin: 20rpx ;
	}
	.songitem img{
		width: 90rpx;
		height:90rpx;
		border-radius:20rpx;
		margin-right: 20rpx;
	}
	.songartists{
		font-size: 20rpx;
		height:100%;
		line-height: 90rpx;
		width: 520rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		position: relative;
	}
	.songartists::after{
		content:"";
		width: 520rpx;
		position:absolute;
		height:2rpx;background:#e0e0e0;
		bottom:0;
		left: 0;
	}
	.songname{
		font-size: 28rpx;font-weight: 550;
		color: #000;
	}
	.musicmv{
		margin-top: 20rpx;
		padding:36rpx 26rpx 0rpx ;
		background:#fff;
		font-size:32rpx;
		display: flex;
		flex-direction: column;
	}
	.musicmvtitle{
		display: flex;
		justify-content:space-between;
		font-size: 34rpx;font-weight:600;
	}
	.musiclist{
		display: flex;
		flex-wrap: nowrap;
	}
	.musicmvitem{
		display: inline-block;
		margin: 20rpx 30rpx 36rpx 0;  
		width:340rpx;
		border-radius:30rpx;
		box-shadow: 2px 2px 10px #aaa;
	}
	.musicmvitem img{
		width:340rpx;
		height:180rpx;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;

	}
	.musicmvitemtext{
		width: 320rpx;
		height:80rpx;
		border-bottom-left-radius: 30rpx;
		border-bottom-right-radius: 30rpx;
		padding-left: 15rpx;
		box-sizing: border-box;
		background-color: #fff;
		overflow: hidden;
	}
	.mvname,.mvartistname{
		display: flex;
		font-size: 24rpx;
	}
	.mvname{
		font-size: 28rpx;
	}
	.artists{
		margin: 20rpx 0;
		padding:26rpx 26rpx 0rpx ;
		background:#fff;
	}
	.hotaetists{
		margin-top: 40rpx ;
		display: flex;
		flex-wrap: wrap;
	}
	.aetistsitem{
		display: flex;
		flex-direction: column;
		width:212rpx;
		height:220rpx;
		box-shadow: 2px 2px 10px #aaa;
		margin-right: 30rpx;
		margin-bottom: 30rpx;
		align-items: center;
		text-align: center;
		justify-content: space-evenly;
		border-radius: 20rpx;
		font-size: 28rpx;
		position: relative;
	}
	.aetistsitem img{
		width: 160rpx;height:160rpx;
		border-radius: 50%;
		place-items: center;
	}
	.aetistsitem:nth-child(3n){
		margin-right: 0;
	}
	.guanicon{
		position: absolute;
		bottom: 50rpx;
		right:24rpx;
		color: red;
	}
	.dtplay{
		position: absolute;
		bottom: 85rpx;
    	right: 16rpx;
		color:coral
	}
	.dtname{
		font-size: 30rpx;
		font-weight:550;
	}
	.dtdesc{
		font-size: 24rpx;
	}
	.dtdesc,.dtname{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;

	}
</style>
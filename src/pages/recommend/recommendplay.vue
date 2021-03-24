<template>
  <view class="playdetail">
    <view
      class="mengben"
      :style="{
        'background-image': 'url(' + this.recomms.playlist.coverImgUrl + ')',
      }"
    >
    </view>
	 <view class="tabbg" v-if="this.show">
	</view>
    <tabnav class="tabnav" :style="{
        'background-image': 'url(' + this.recomms.playlist.coverImgUrl + ')',
      }">
      <view slot="didongyi"><text>歌单</text></view>
    </tabnav>
	<scroll-view class="scroll" @scroll="scoll" scroll-y="true">
		<view class="top">
			<view class="img">
				<img :src="this.recomms.playlist.coverImgUrl" alt="">
			</view>
			<view class="desc">
				<view class="title">{{this.recomms.playlist.name}}</view>
				<view class="user">
					<img class="icon" :src="this.recomms.playlist.creator.avatarUrl" alt="">
					<text class="name">{{this.recomms.playlist.creator.nickname}}</text>
					<text class="addsub">+</text>
				</view>
				<view class="desctext">{{this.recomms.playlist.description}}
					<text class="iconfont you">&#xe65f;</text>
				</view>
			</view>
			<view class="tab">
				<view class="tabitem" >
					<text class="iconfont">&#xe66a;</text>
					<text>{{$palycount(this.recomms.playlist.subscribedCount)}}</text>
				</view>
				<view class="tabitem" @click="topinglun">
					<text class="iconfont">&#xeaa5;</text>
					<text>{{$palycount(this.recomms.playlist.commentCount)}}</text>
				</view>
				<view class="tabitem">
					<text class="iconfont">&#xe785;</text>
					<text>{{$palycount(this.recomms.playlist.shareCount)}}</text>
				</view>
			</view>
		</view>
		<view class="hudu">
			<!-- <view class="vsip"></view> -->
			<view class="allplay" :class="[this.position?'allplay-fiexd':'allplay']">
				<i class="iconfont">&#xe768;</i>
				<text class="text">全部播放</text>
				<text class="songcount">({{this.recomms.privileges.length}})</text>
				<view class="down">
					<text class="iconfont size">&#xe730;</text>
					<text class="iconfont size">&#xe62e;</text>
				</view>
			</view>
			<view class="palyitem" v-for="(item,index) in this.recomms.privileges" :key="index">
				<view class="index">{{index+1}}</view>
				<view class="center">
					<view class="songname">{{item.song.music}}</view>
					<view class="songar">{{item.song.username}} - {{item.song.albumname}}</view>
				</view>
				<view class="down">
					<text v-if="item.song.mvid!=0" class="iconfont size">&#xe62c;</text>
					<text class="iconfont size">&#xe689;</text>
				</view>
			</view>
		</view>
	</scroll-view>
	<request-loading></request-loading>
	
  </view>
</template>

<script>
import tabnav from "../components/back/backNav.vue";
import { playdetail } from "../../api/main/play";
import { songs,Song } from "../../api/main/songs";

export default {
  data() {
    return {
      recomms: [],
      id: "",
	  show:false,
	  position:false,
    };
  },
  components: { tabnav },
  onLoad(target) {
	this.$showLoading()
    this.id = target.id;
    this.getdetails();
	this.$hideLoading()
  },
  methods: {
	//处理歌单数据
    async getdetails() {
      const data = await playdetail(this.id);
	  console.log(data)
	  data.privileges.forEach(item=>{
		songs(item.id).then(res=>{
		  var song = new Song(res[0].songs[0],res[1].data[0])
		  this.$set(item,'song',song)
	  	})
	  })

      this.recomms = data;
    },
	scoll(item){
		console.log(item.detail.scrollTop)
		if(item.detail.scrollTop>=180){
			this.position=true
		}else{
			this.position=false
		}
		
	},
	topinglun(){
		var data={id:this.id,type:2,count:this.recomms.playlist.commentCount}
		uni.navigateTo({
			url:`/pages/comment/comment?data=${JSON.stringify(data)}`,
		})
	}
  },
};
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_pp280d8lypg.eot');
  src: url('//at.alicdn.com/t/font_2223549_pp280d8lypg.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_pp280d8lypg.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_pp280d8lypg.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_pp280d8lypg.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_pp280d8lypg.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
.playdetail{
	background:#fff;
	position: relative;
}
.scroll{
	height:100vh;	
}
	.mengben{
		filter: blur(100px);
		width: 100%;
		height:100%;
		position:absolute;
		background-size: 100% 900px;
	}
	.tabnav{
		position:sticky;
		top: 0;
		background:#ffffff;
	}
	.hudu{
		width: 100%;  
		/* height: 200px;   */
		position: relative; 
		 background:#fff;
		z-index: 3;  
		overflow: hidden;
		margin-top: 36rpx;
		padding: 60rpx 30rpx;
		box-sizing: border-box;
	}
	.hudu::after{
		content:"";
		width: 140%;
		height: 20px;
		position:absolute;
		left: -20%;
		top: 0;
		z-index: 2;
		border-radius: 0 0 50% 50%;
		background:#f5f5f599;
	}
	.top{
		padding: 40rpx 30rpx;
		box-sizing: border-box;
		display:flex;
		position: relative;
	}
	.img{
		width:200rpx;
		height: 200rpx;
		position: relative;
		
	}
	.img::after{
		display: flex;
		content:"";
		width:90%;
		height:40rpx;
		border-radius:30rpx;
		background: #ccc;
		position:absolute;
		top: -10rpx;
		left: 10rpx;
	}
	.img img{
		width:200rpx;
		height: 200rpx;
		border-radius: 20rpx;
		box-shadow: 1rpx 1rpx solid #ccc;
		position: relative;
		z-index: 3;
	}
	.desc{
		margin-left: 30rpx;
		/* flex:1; */
	}
	.user{
		display: flex;
		place-items: center;
		margin: 20rpx 0;
	}
	.title{
		font-size: 30rpx;

	}
	.icon{
		width:50rpx;
		height: 50rpx;
		border-radius: 50%;
	}
	.name{
		font-size: 24rpx;
		margin: 0 20rpx;
	}
	.addsub{
		border: 1px solid #ccc;
		padding: 5rpx 15rpx;
		border-radius: 40rpx;
		height:25rpx;
		line-height: 25rpx;
	}
	.desctext{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width:440rpx;
		font-size: 24rpx;
		position: relative;
		padding-right: 30rpx;
		color: #ccc
	}
	.you{
		position:absolute;
		right: 0;
		font-size: 22rpx;
		margin-top: 2rpx;
	}
	.tab{
		display: flex;
		position: absolute;
		background-color:#ffffff99;
		padding: 5rpx 30rpx ;
		border-radius: 50rpx;
		left:50%;
		transform:translateX(-50%);
		bottom:-60rpx;
		box-shadow: 2rpx 2rpx 5rpx #ccc ;
		z-index: 6;

	}
	.tabitem{
		padding: 0 20rpx;
		display: block;
		white-space: nowrap;
		font-size: 26rpx;
		margin: 10rpx 0;
	}
	.tabitem:nth-child(2){
		border-left: 1px solid rgb(199, 196, 196);
		border-right: 1px solid rgb(199, 196, 196);

	}
	.tabitem text:nth-child(2){
		margin-left: 10rpx;
	}
	.allplay{
		display: flex;
		place-items: center;
		font-size: 34rpx;
		margin-bottom: 30rpx;
	}
	.allplay-fiexd{
		position: fixed;
		top: 80rpx;
		display: flex;
		place-items: center;
		font-size: 34rpx;
		width: 100%;
		left:0;
		padding: 15rpx 20rpx;
		background-color:#fff;
		box-sizing: border-box;
		box-shadow: 2rpx 2rpx 5rpx #ccc;
	}
	.size{
		font-size: 40rpx;
		width:80rpx;
		text-align:center;
	}
	.allplay i:nth-child(1){
		font-size: 40rpx;
		color: coral;
		margin-right: 20rpx;
	}
	.down{
		margin-left: auto;
		color: rgb(114, 109, 109);
	}
	.down text:nth-child(2){
		margin-left: 30rpx;
	}
	.palyitem{
		display: flex;
		place-items: center;
		padding: 10rpx 0;
	}
	.index{
		margin-right: 30rpx;
		text-align: center;
		width:40rpx
	}
	.center{
		font-size: 30rpx;
	}
	.songar{
		font-size: 24rpx;
		color:rgb(156, 151, 151)
	}
	.tabbg{
		width:100%;
		height: 100%;
		position: fixed;
		filter:blur(100px);
		/* background:rgba(1, 1, 1, 1); */
		z-index: 999999;
		
	
	}
</style>
<template>
  <view class="play" @click="toplay">
	  <img :src="this.$store.state.playlist[this.$store.state.index].song.al.picUrl" class="img" alt="">
	  <view class="title">
		  <text class="name">{{this.$store.state.playlist[this.$store.state.index].song.name}}</text>&nbsp;-&nbsp; </text><text class="user">{{this.$store.state.playlist[0].song.ar[0].name}}</text>
	  </view>
	  <view class="button">
		  <text class="iconfont playicon" v-if="this.$store.state.playchange" @click.stop="play">&#xe768;</text>
		  <text class="iconfont playicon" v-else @click.stop="pause">&#xe606;</text>
		  <text class="iconfont" @click.stop="show">&#xe60b;</text>
	  </view>
	  <view class="lishi" @click.stop="close" v-if="isshow">
		 <view class="lishibox" v-if="isshow" @touchstart="touchstart"   :style="{ transform: 'translateY('+moveY+'px) translateX(-50%)'}" @touchend="touchend"   @touchmove="touchmove">
			<view class="lishitop">
			  <view class="title">当前播放(24)</view>
			  <view class="lishilist">
				  <text class="iconfont">&#xe61f;列表循环</text>
				  <view class="sub">
					  <text class="iconfont">&#xe66a;</text>
					  <text class="suball">收藏全部</text>
					 <view class="iconfont del">&#xe674;</view>
				  </view>
			  </view>
		   </view>
		    <view class="musiclist">
				  <scroll-view scroll-y="true" class="scroll">
					  <view class="musicitem" v-for="(item,index) in this.adddata" :key="index">
						  <view class="content">
								<text class="name">{{item.song.name}}&nbsp;-&nbsp; </text>
						  		<text class="user">{{item.song.ar[0].name}}</text>
						  </view>
						  <view class="iconfont">&#xe701;</view>
					  </view>
				  </scroll-view>
			</view>
		 </view>
	  </view>
  </view>
</template>

<script>
import { lishi } from "../../../api/user/user";
import { songurl } from "../../../api/main/songs";
export default {
	data(){
		return{
			isshow:false,
			staticY:0,
			moveY:0,
			login:{},
			adddata:[],
			playlist:[],
			isplay:true,
			
		}
	},
	mounted(){

		setInterval(() => {
			var c =this.$palytime(parseInt(this.$music.currentTime)*1000)
			this.$store.commit('changetime',c)
		}, 1000);
	},
	methods:{
		show(){
			this.isshow =true
		},
		close(){
			this.isshow =false
		},

		touchstart(event){
			this.staticY =event.touches[0].clientY
		},
		// 手指松开：事件
		touchend(event){
			if(this.moveY>130){
				this.isshow=false
			}
				this.moveY =0
		},
    // 手指移动：事件 
		touchmove(event){
			console.log(this.moveY)
			if(event.touches[0].clientY-this.staticY >0){
				this.moveY =event.touches[0].clientY-this.staticY
			}
			},
		// 获取历史播放
		async getlishi(uid){
			var ids =[]
			const data = await lishi(uid)
			data.allData.filter(item=>{
				songurl(item.song.id).then(res=>{
					this.$set(item.song,'url',res.data[0].url)
				})
				
			 })
			this.$store.commit('addplaylist',data.allData||[])
			this.adddata = data.allData ||[]
		},
		toplay(){
			uni.navigateTo({
				url:'/pages/play/playbox'
			})
		},
		play(){
			this.$play()
			setTimeout(()=>{this.$store.commit('endtime',this.$palytime(parseInt(this.$music.duration)*1000))},500)
			

		},
		pause(){
			this.$pause()
		}
		},

	created(){
		var login = JSON.parse(sessionStorage.getItem('Login'));
		this.getlishi(login.userId)

	},

}	
</script>

<style scoped>
	@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_le4mouy8u8f.eot');
  src: url('//at.alicdn.com/t/font_2223549_le4mouy8u8f.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_le4mouy8u8f.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_le4mouy8u8f.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_le4mouy8u8f.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_le4mouy8u8f.svg#iconfont') format('svg');
}
	.iconfont{
    font-family:"iconfont" !important;
    font-size:22px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
	background:#fff;
	z-index: 1}
	.play{
		position:fixed;
		bottom:0;
		left: 0;
		width:100%;
		z-index: 999;
		background:#fff;
		display: flex;
		place-items: center;
		box-sizing: border-box;
		padding: 15rpx 20rpx;
		box-shadow: 2rpx 1rpx 4rpx #000;
	}
	 
	.img{
		width:65rpx;height: 65rpx;
		border-radius: 15rpx;
		margin-right: 20rpx;
		border-radius: 50%;
		position: relative;
		box-shadow: 2rpx 2rpx 4rpx #000;
		animation: rotation 8s linear infinite;
	}
	.button{
		display: flex;
		width:120rpx;
		justify-content: space-between;
		font-size: 40rpx;
		position: relative;
	}

	.title{
		flex: 1;
		font-size: 30rpx;

	}
	.user{
		font-size:25rpx;color: rgb(173, 164, 164);
		margin-left: 8rpx;
	}
	.playicon{
		border-radius: 50%;
	}
	.lishi{
		position:fixed;
		width:100%;
		height:100vh;
		z-index: 22;
		padding:25rpx;
		background:#00000033;
		box-sizing: border-box;
		left: 0;
		bottom: 0;
	}
	.lishibox{
		background:#fff;
		border-radius: 20rpx;
		height:60vh;
		width:93%;
		position:fixed;
		bottom: 20rpx;
		left:50%;
		padding: 30rpx 20rpx;box-sizing: border-box;
		overflow: hidden;
	}
	.lishitop{
		height:auto;
	}
	.lishilist{
		display: flex;
		font-size: 28rpx;
		justify-content: space-between;
		padding: 20rpx 0;
	}
	.lishilist text:nth-child(1){
		font-size: 28rpx;
		margin-right: 10rpx;
	}
	.sub{
		display: flex;
		place-items: center;
		color: rgb(187, 183, 183);

	}
	.suball{
		color: #000;
	}
	.del{
		width:70rpx;
		text-align: center;
		font-size: 28rpx;
		border-left: 1px solid rgb(187, 183, 183);
		margin-left: 30rpx;
		color: rgb(187, 183, 183);
	}
	.musiclist{
		flex: 1;
		height:630rpx;
	}
	.scroll{
		height:100%;
	}
	.musicitem{
		display: flex;
		justify-content: space-between;
		padding: 21rpx 0;
		overflow: hidden;
	}

	.musicitem .iconfont{
		font-size:24rpx;
		color: rgb(187, 183, 183);
		width:70rpx;
		text-align: center;
	}
	.content{
		display: flex;
		font-size: 28rpx;
	}
	.content .user{
		font-size: 24rpx;
		color: rgb(187, 183, 183);
	}
</style>
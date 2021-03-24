<template>
   <view class="playbj">
	   <backnav class="backnav">
		   <text slot="didongyi">评论</text>
	   </backnav>
	   <view class="playbox">
		   <swiper  class="scroll">
			   <swiper-item>
					<view class="pengmian">
						 <view class="zhizhen"></view>
						 <view class="yuan">
							 <img :src="this.$store.state.playlist[this.$store.state.index].song.al.picUrl" alt="">
						 </view>
						 <view class="fengbotton">
							 <view class="chengetab">
								 <text class="iconfont">&#xe607;</text>
								 <text class="iconfont">&#xe730;</text>
								 <text class="iconfont">&#xe811;</text>
								 <text class="iconfont">&#xeaa5;</text>
								 <text class="iconfont">&#xe689;</text>
							 </view>
							 <view class="jindu">
								 <text class="static">{{this.$store.state.currentTime}}</text>
								 <progress class="progress"  :percent="(parseInt(this.$music.currentTime)/parseInt(this.$music.duration))*100"  stroke-width="3" />
								 <text class="end">{{this.$store.state.EndTime}}</text>
							 </view>
							 <view class="playtab">
								 <text class="iconfont">&#xe61f;</text>
								 <text class="iconfont" @click="up">&#xe637;</text>
								 <view class="play">
									 <text class="iconfont playicon" v-if="this.$store.state.playchange" @click.stop="play">&#xe768;</text>
		 							 <text class="iconfont playicon" v-else @click.stop="pause">&#xe606;</text>
								 </view>
								 <text class="iconfont" @click="next">&#xe600;</text>
								 <text class="iconfont">&#xe636;</text>
							 </view>
						 </view>
					</view>
			   </swiper-item>
			   <swiper-item>
					<view class="geci"></view>
			   </swiper-item>
		   </swiper>
	   </view>
   </view>
</template>

<script>
import backnav from "../components/back/backNav.vue"
import { lyric } from "../../api/main/play";
export default {
	
	data(){
		return{
			isplay:true,
			Timer:null,
			EndTime:"00:00",
			jindu:0,
		}
	},

	components:{backnav},
	created(){
		this.$onCanplay();
		this.getlyric()

	},
	methods:{
		play(){
			this.$play()
			this.$store.commit('change',false)
			setTimeout(()=>{this.$store.commit('endtime',this.$palytime(parseInt(this.$music.duration)*1000))},500)
		},
		pause(){
			this.$pause()
			this.$store.commit('change',true)

		},
		next(){
			var index =this.$store.state.index;
			var playlist =this.$store.state.playlist.length-1
			console.log("播放完了");
				this.$store.commit('change',true)
			if(index < playlist){
				this.$store.commit('changeindex',index+1)
			}else if(index =playlist){
				this.$store.commit('changeindex',0)
			}
			this.play()
		},
		up(){
			var index =this.$store.state.index;
			var playlist =this.$store.state.playlist.length-1
			console.log("播放完了");
				this.$store.commit('change',true)
			if(index > 0){
				this.$store.commit('changeindex',index-1)
			}else if(index =0){
				this.$store.commit('changeindex',playlist)
			}
			this.play()
		},
		async getlyric(){
			const data =await lyric(this.$store.state.playlist[this.$store.state.index].song.id)
			console.log(data.lrc)
		}

	}
}
</script>

<style  scoped>
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
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
	.playbj{
		width:100%;
		height:100vh;
		display: flex;
		flex-direction: column;
		background: #00000099
	}
	.backnav{
		height:80rpx;
		color: #fff;
	}
	.playbox{
		flex: 1;
	}
	.pengmian , .geci{
		width:100%;
		height:100%;
	}
	.pengmian{
		/* background: coral */
	}
	.geci{
		/* background: blue */
	}
	.scroll{
		height:100%;
	}
	.zhizhen{
		background-image: url('../../static/zhizhen.png');
		background-size: cover;
		width:80rpx;
		height:310rpx;
		position:absolute;
		top: 40rpx;
		left: 50%;
		margin-left: -40rpx;
		transform:rotate(-30deg);
		transform-origin:0% 0%;
		z-index: 99;
	}
	.yuan img{
		width :350rpx;
		height: 350rpx;
		border-radius: 50%;
		background: #fff;
		box-shadow: 4rpx 4rpx 5rpx #ccc;
	}
	@keyframes rotation{
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }}

	.yuan{
		width:500rpx;height: 500rpx;
		border-radius: 50%;
		background: #000;
		display:block;
		position:fixed;
		top: 20%;
		left: 50%;
		margin-left: -250rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		transform: rotate(360deg);
		animation: rotation 8s linear infinite

	}
	.yuan::after{
		width:520rpx;height: 520rpx;
		border-radius: 50%;
		background: #00000033;
		display:block;
		position:fixed;
		left: 50%;
		margin-left: -260rpx;
		display: flex;
		content:""
	}
	.fengbotton{
		width: 100%;
		padding:30rpx 20rpx;
		box-sizing: border-box;
		position:absolute;
		bottom:0;
		left: 0;
	}
	.playtab{
		place-items: center;
	}
	.chengetab ,.playtab{
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
	.chengetab .iconfont,.playtab .iconfont{
		font-size:42rpx;
		color: #ccc;
	}
	.play .playicon{
		font-size: 70rpx;
	}
	.jindu{
		margin: 60rpx 0;
		display: flex;
		box-sizing: border-box;
	}
	.static,.end{
		font-size:28rpx;
		width:80rpx;
	}
	.progress{
		flex-grow: 1;
		padding: 0 15rpx;
	}
</style>
<template>
	<view class="content">
		<!-- 导航栏 -->
		<toptab  :login="this.login">
			<view class="tabcentent" slot="centent">
				<!-- <input type="text" placeholder="The name of">
				<text class="iconfont searchicon">&#xe618;</text> -->
				<view class="tabitem" @click="changetab(0)" :class="this.index==0?'active':''">我的</view>
				<view class="tabitem" @click="changetab(1)" :class="this.index==1?'active':''">发现</view>
				<view class="tabitem" @click="changetab(2)" :class="this.index==2?'active':''">视频</view>
				<view class="tabitem" @click="changetab(3)" :class="this.index==3?'active':''">云村</view>
			</view>
			<view class="tingge" slot="right">
				<text class="iconfont">&#xe618;</text>
			</view>
		</toptab>
		<swiper
			class="main"
			:current="this.index"
			@change="changecurrent"
		>
			<swiper-item>
				<view>
					<scroll-view class="mianscroll" :scroll-y="true" @scroll="myscroll" :scroll-top="scrolltop" >
						<my :login="this.login" :subplay="subplay"   @scrollto ="scrollto" :level="level" :like="like" :creatplay="creatplay"></my>
					</scroll-view>
				</view>
			</swiper-item>
			<!-- 发现页 -->
			<swiper-item>
				<scroll-view class="mianscroll" :scroll-y="true" :show-scrollbar="false">
					<faxina :banner="this.banner" :icon="this.icon" :paly="this.paly"
					:newsongs="this.newsongs" :musicmv="this.musicmv" :hotartists="this.hotartists"
					:programs="this.programs" :musiccalendar="this.musiccalendar"
					></faxina>
				</scroll-view>
			</swiper-item>
			<!-- 视频页 -->
			<swiper-item>
				<view >
				</view>
			</swiper-item>
			<swiper-item>
				<view>
					云村
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
import toptab from "../components/toptab/toptab";
import { login,playlist,level,likelist } from "../../api/user/user";
import faxina from "./indextab.vue"
import my from "./indextabmy.vue"

import { getbanner,geticon,subablum,musicmv,newsongs,getsongsurl,getcalendar,hotartists,getprogram} from "../../api/main/main";

	export default {
		data() {
			return {
				title: 'Hello',
				banner:[],
				icon:[],
				paly:[],
				limit:12,
				newsongs:[],
				musicmv:[],
				hotartists:[],
				programs:[],
				musiccalendar:[],
				index:1,
				login:{},
				creatplay:[],
				subplay:[],
				like:[],
				level:{},
				scrolltop:0
			}
		},
		components:{faxina,toptab,my},
		onLoad() {
			this.login = JSON.parse(sessionStorage.getItem('Login'))||"";
			geticon().then(res=>{
				this.icon = res.data
			})
			this.GetBanner()
			this.GetPlay()
			this.GetSongs()
			this.GetMusicMv()
			this.GetArtists()
			this.GetProgram()
			this.Getcalendar()
			this.Getplaylist()
		},
		onShow(){
			this.login = JSON.parse(sessionStorage.getItem('Login'))||"";
		},
		methods: {
			// 获取轮播图
			GetBanner (){
				getbanner().then(res=> {
					this.banner= res.banners
				})
			},
			myscroll(res){
				console.log(res.target.scrollTop)
				if(res.target.scrollTop>320){

				}
			},
			 scrollto(scrollTop){
				 console.log(scrollTop)
				 this.scrolltop=scrollTop
			 },
			// 获取推荐歌单
			async GetPlay(){
				const data =await subablum()
				data.result.forEach(item => {
					item.trackNumberUpdateTime=this.$time(item.trackNumberUpdateTime)
					item.playCount=this.$palycount(item.playCount)
				});
				this.$set(this,'paly',data.result)
			},
			// 获取新歌
			async GetSongs(){
				const data =await newsongs(this.limit)
				data.result.forEach(item=>{
						getsongsurl(item.id).then(res=>{
							this.$set(item,'url',res.data[0].url)
						})
					}	
				)
				this.newsongs =this.group(data.result, 3);

			},
			// 获取推荐mv
			async GetMusicMv(){
				const data =await musicmv()
				// console.log("mv",data)
				this.musicmv =data.result
			},
			// 获取热门歌手
			async GetArtists(){
				const data =await hotartists()
				// console.log("hotartists",data)
				this.hotartists =data.artists
			},
			async GetProgram(){
				const data =await getprogram()
				this.programs =data.programs
			},
			// 获取音乐日历
			async Getcalendar(){
				const data =await getcalendar()
				// console.log("getprogram",data)
				console.log(this.musiccalendar.length)
			},
			//获取用户歌单
			async Getplaylist(){
				console.log(this.login)
				const like =await likelist(this.login.userId)
				const data =await playlist(this.login.userId)
				const leve =await level(this.login.userId)
				var creatplay =data.playlist.filter(item=>{
					return item.userId == this.login.userId
				})
				var subplay =data.playlist.filter(item=>{
					return item.userId != this.login.userId
				})
				this.$set(this,'creatplay',creatplay)
				this.$set(this,'subplay',subplay)
				this.$set(this,'like',like.ids)
				this.$set(this,'level',leve.data)


			},
			//切换tab栏
			changetab(index){
				this.index=index
			},
			//滑动页面
			changecurrent(data){
				this.index=data.target.current
			},
			// 分割数组
			group(arr,num){
				let index = 0;
				let newArray = [];
				while(index < arr.length) {
					newArray.push(arr.slice(index, index += num));
				}
				return newArray;
			}
		},
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
	.content {
		display: flex;
		flex-direction: column;
		align-items: left;
		background: #f5f5f5;
		height:100vh;
	}
	.search{
		display: flex;
		width: 100%;
		align-items: center;
		position: relative;
	}
	.tabcentent{
		height:80rpx;
		width: 70%;
		margin: 0 auto;
		display: flex;
		line-height: 80rpx;
		font-size: 32rpx;
		color: #d3d0d0;
		justify-content: space-around;
	}
	.main{
		flex:1
	}
	.mianscroll{
		height:100%
	}
	.active{
		font-size:34rpx;
		color: #000;
	}
	.searchicon{
		position: absolute;
		top: 4px;
		left: 6px;
		color: #ccc;
	}
	input{
		height:56rpx;
		background:#fff;
		border-radius:30px;
		width:100%;	
		padding-left:50rpx;
		font-size: 28rpx;
		box-sizing: border-box;
	}
	.tingge{
		font-size: 32rpx;
		
	}

</style>

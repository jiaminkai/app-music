<template>
	<view class="playlist">
		<backnav class="backnav"><text slot="didongyi">歌单广场</text></backnav>
		<categorytab class="categorytab" :category="this.category" @change="change"></categorytab>
			<view class="scroll">
				<scroll-view scroll-y="true" style="height:100%" @scrolltolower="lower" lower-threshold="20"> 
					<view class="playguang">
					<view class="playitem"
						@click="toplayde(item)"
						v-for="(item,index) in this.playlists" 
						:key="index">
						<img :src="item.coverImgUrl" alt="">
						<text class="playitemtitle">{{item.name}}</text>
						<view class="playcount">
							<text class="iconfont min">&#xe630;</text>
							<text class="count">{{$palycount(item.playCount)}}</text>
						</view>
					</view>
				</view>
				</scroll-view>
			</view>

			
		<request-loading></request-loading>
	</view>
</template>

<script>
import backnav from "../components/back/backNav";
import categorytab from "../components/categorytab/categorytab";

import {Hotplaylist,playlist} from "../../api/main/play"
export default {
	data(){
		return{
			category:[
				{name:'全部',id:'全部'},
				{name:'华语',id:'华语'},
				{name:"摇滚",id:"摇滚"},
				{name:'民谣',id:'民谣'},
				{name:'电子',id:'电子'},
				{name:'另类/独立',id:'另类/独立'},
				{name:"轻音乐",id:"轻音乐"},
				{name:"综艺",id:"综艺"},
				{name:"影视原声",id:"影视原声"},
				{name:"ACG",id:"ACG"},
			],
			playlists:[],
			cat:'全部',
			offset:0
		}
	},
	methods:{
		change(item){
			console.log(item)
			this.cat = item
			this.playlists=[]
			this.offset=0
			this.gettablist()
		},
		async gettablist(){
			this.$showLoading();
			const tablist =await playlist(this.cat,30,this.offset*30	)
			console.log(tablist.playlists)
			this.playlists.push(...tablist.playlists)
			this.$hideLoading();

		},
		toplayde(item){
			console.log(item.id)
			uni.navigateTo({
				url:'/pages/recommend/recommendplay?id='+item.id
			})
		},
		lower(){
			this.offset+=1
			this.derber(this.gettablist,300)()
		},
		derber( fn,wait){
			var  timer = null;
			var that=this;
			return function(){
				console.log(that.timer)
				if(that.timer){
					console.log("清除函数")
					clearTimeout(that.timer)
				}
				that.timer = setTimeout(()=>{
					console.log("执行节流函数")
					fn.apply(this,arguments)
					that.timer = null
				},wait)
			}
		}
	},
	components:{backnav,categorytab},
	created(){
		this.gettablist()

	}
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
    font-size:8px;font-style:normal;
    -webkit-font-smoothing: antialiased;
	-webkit-text-size-adjust:none;
    -moz-osx-font-smoothing: grayscale;}
	.playlist{
		width:100%;
		height: 100%;
	}
	.backnav{
		position:sticky;
		top: 0;
		background:#fff;
		box-shadow: 1rpx 1rpx 5rpx #ccc;
		z-index: 999;
		height:80rpx;
		flex-basis:40px;
	}
	.categorytab{
		z-index: 999;
		flex-basis:40px;

	}
	.scroll{
		position:absolute;
		bottom: 0;
		top: 80rpx;left: 0;
		width:100%;

	}
	.playguang{
		display: flex;
		flex-wrap: wrap;
		padding: 20rpx 30rpx;
		margin-top: 80rpx;
		}
	.playitem {
		width:210rpx;
		display: flex;
		flex-direction: column;
		position: relative;
		margin-right:30rpx;
	}
	.playitem:nth-child(3n){
		margin-right: 0;
	}
	.playcount{
		position:absolute;
		font-size: 20rpx;
		color: #fff;
		right: 10px;
		top: 6px;

	}
	.playitem img{
		width:210rpx;
		height: 210rpx;
		border-radius: 20rpx;
		box-shadow: 1rpx 1rpx 5rpx #ccc;
	}
	.playitemtitle{
		font-size: 28rpx;
		width: 210rpx;
		line-height: 34rpx;
		height: 68rpx;
		overflow: hidden;
		margin-bottom: 25rpx;

	}
	.min{
		transform:scale(0.5);
		-webkit-transform:scale(0.8)
	}
</style>
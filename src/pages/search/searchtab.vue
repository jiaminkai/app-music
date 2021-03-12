<template>
	<view class="topnav">
		<view class="iconfont back" @click="backnav">&#xe703;</view>
		<view class="searchinput">
			<input type="text" placeholder="请输入歌手名、关键字" v-model="value">
			<text v-if="isclose" class="iconfont cloce" @click="close">&#xe701;</text>
		</view>
		<view  class="searchbox" :class="this.isf?'searchset':'create-content'">
			<view class="keysitem" v-if="this.keys">
				<view class="artists tit">搜索“{{this.value}}”</view>
				<view class="artists " @click="tosearchset(item)" v-for="(item,index) in this.keys" :key="index">
					<text class="iconfont">&#xe618;</text>{{item.keyword}}
				</view>
			</view>
			<view class="keysitem" v-else>
				<view class="artists tit">没有关于“{{this.value}}”的结果</view>
			</view>
		</view>
	</view>
</template>

<script>
import {Searchkey} from '../../api/user/user';
export default {
	data(){
		return{
			value:"",
			isf:false,
			Timer:null,
			keys:[],
			isheight:true,
			isclose:false,
		}
	},
	props:{
		setvalue:String
	},
	watch:{
		value:function(newValue,oldValue){
			if(newValue==""){
				this.isf = false;
				this.isclose = false;
			}else{
				this.isf = true;
				this.isclose = true;
				this.$nextTick(()=>{
					setTimeout(()=>{
						this.isf=true
					},50)
				})
				this.derber(this.getsearchkey,500)
			}
		},
	},
	methods:{
			//清空搜索
		close(){
			this.value=""
			uni.navigateTo({
				url:'/pages/search/search'
			})
		},
		tosearchset(item){
			this.tosearch(item)
			this.isf=false
		},
			//节流函数
		derber(fn,delay){
			var that = this
			return function(){
				if(!that.Timer){
					clearTimeout(that.Timer);
				}
				that.Timer = setTimeout(()=>{
					fn();
					that.Timer = null;
				},delay)
			}()
		},
			// 搜索关键词
		async getsearchkey(){
			const search =await Searchkey(this.value)
			this.keys=search.result.allMatch
		},
		// 点击热搜结果
		tosearch(item){
			this.$emit('addhis',item)
			var list = item.searchWord ||item.keyword
		},
	},
	created(){
		if(this.setvalue){
			this.value = this.setvalue
				this.$nextTick(()=>{
					setTimeout(()=>{
						this.isf=false
					},100)
				})
		}
	}

}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_jyqygq8btub.eot');
  src: url('//at.alicdn.com/t/font_2223549_jyqygq8btub.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_jyqygq8btub.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_jyqygq8btub.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_jyqygq8btub.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_jyqygq8btub.svg#iconfont') format('svg');
}
	.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
	.back{
	width:60rpx;
	height:100%;
	line-height:80rpx;
	margin-left: 30rpx;
	}
	.topnav{
		display: flex;
		place-self: center;
		position: relative;
		margin-top: 0rpx;
	}
	.searchinput{
		flex: 1;
		margin-right: 30rpx;
		border-bottom:1px solid #ccc;
		place-items: center;
		display: flex;
		color: #ccc;
		position: relative;
	}
	.searchinput input{
		width: 100%;
	}
	.searchset{
		opacity:1;
		z-index: 3;
	}
	.searchbox{
		position: absolute;	
		width: 90%;
		left:6%;
		box-shadow: 1rpx 1rpx 10rpx #ccc;
		background:#fff;
		top: 90rpx;
		transition:all 1s;
	}
	.create-content{
		opacity:0;
		z-index: -1;
	}
	.keysitem{
		width:100%;
		overflow: hidden;
	}
	.artists{

		color: #a3a0a0;
		width:100%;
		text-align: left;
		height:80rpx;
		line-height:80rpx;
		padding-left: 30rpx;
		border-bottom: 1rpx #ccc solid;
		font-size: 30rpx;
	}
	.tit{
		font-size: 34rpx;
		color: #00a1d6
	}
	.artists text{
		margin-right: 15rpx;
		
	}
</style>
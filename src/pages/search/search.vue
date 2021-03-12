<template>
  <view class="search">
	  <topnav @addhis="addhis"></topnav>
	  	<view class="historyset" >
			<text class="settitle">历史</text>
			<scroll-view :scroll-x="true" class="setitem" >
				<view class="box">
					<view v-for="(item,index) in this.history" :key="index" class="historyitem">
						<text v-if="item.searchWord">{{item.searchWord}}</text>
						<text v-if="item.keyword">{{item.keyword}}</text>
					</view>
				</view>
			</scroll-view>
			<text class="iconfont deleteicon" @click="deleteicon">&#xe674;</text>
		</view>
	  <view class="hotserch">
		  <view class="hostitle">
			  <view class="titl">热搜榜</view>
		  </view>
		  <view class="hotsearchlist" :style="{'height':isheight?'480rpx':'auto'}">
			  <view class="hotsearchitem"  v-for="(item,index) in this.hotsearch" :key="index">
				  <text>{{index+1}}</text>
				  <text class="name" @click="tosearch(item)">{{item.searchWord}}</text>
				  <img v-if="item.iconUrl" :src="item.iconUrl" alt="">
			  </view>
		  </view>	
		  <view v-if="isheight" class="isheight" @click="showheight()">展开更多热搜<text class="iconfont">&#xe601;</text></view>
	  </view>
	  <view class="searchta">
	  </view>
  </view>
</template>

<script>
import {Searchkey,HotSearch} from '../../api/user/user';
import topnav from './searchtab.vue'
export default {
	name:'search',
	data(){
		return{
			value:"",
			isf:false,
			Timer:null,
			keys:[],
			hotsearch:[],
			isheight:true,
			history:[],
			isclose:false,
		}
	},
	components:{topnav},
	methods:{
		backnav(){
			uni.navigateBack(1)	
		},
	
		//热搜榜
		async gethotsearch(){
			const hotsearc =await HotSearch()
			this.hotsearch=hotsearc.data
			console.log(this.hotsearch)
		},
		// 点击热搜结果
		tosearch(item){
			this.addhis(item)
				uni.setStorage({
					key: 'history',
					data: this.history
				})
				var list = item.searchWord ||item.keyword
				uni.navigateTo({
					url:'/pages/search/searchset?key='+list,
				})
			},
		// 清空历史搜索
		deleteicon(){
			this.history =[]
			uni.setStorage({
					key: 'history',
					data:[]
				})
		},
		// 展开更多热搜
		showheight(){
			console.log("展开")
			this.isheight=false
			console.log(this.isheight)
		},
		addhis(item){
			if(this.history.length==0){
				this.history.unshift(item)
			}else{
				console.log(item)
				var index=	this.history.findIndex((res)=>{
					if(item.searchWord){
						return	res.searchWord == item.searchWord 
					}else{
						return res.keyword == item.keyword
					}
					
				})
				console.log(index)
				if(index==-1){
					this.history.unshift(item)
				}else{
					var c =this.history[index]
					this.history[index]	= this.history[0] 
					this.history[0] =c
				}
			}
			uni.setStorage({
				key: 'history',
				data: this.history
			})

		}
	},
	created(){
		this.gethotsearch()
		var that =this
		uni.getStorage({
			key: 'history',
			success: function (res) {
				if(res.data!=undefined){
					that.$set(that,'history',res.data)
				}
				
    		}
		})
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
		margin-top: 20rpx;
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
	.hotserch{
		display: flex;
		flex-direction: column;
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 30rpx;
	}
	.hostitle{
		display:flex ;
		justify-content: space-between;
		font-weight: 600;
		border-bottom: 3rpx solid #f3f3f3;
		padding-bottom: 30rpx;
	}
	.historyset{
		display: flex;
		height:60rpx;
		padding: 50rpx 30rpx;
		box-sizing: border-box;
		place-items: center;
	}
	.settitle{
		font-size: 26rpx;
		width:70rpx;
		font-weight: 500;
	}	
	.setitem{
		width:580rpx
	}
	.box{
		display: flex;
		flex-wrap: nowrap;
	}
	.historyitem{
		white-space: nowrap;
		border-radius: 50rpx;
		font-size: 26rpx;
		height:100%;
		margin-right: 15rpx;
		border: 1rpx solid #f5f5f5;
		background:#e3e3e3;
		color:#000;
		padding: 6rpx 15rpx;
	}
	.deleteicon{
		font-size: 28rpx;
		width:40rpx;
		text-align: right;
		opacity: 0.4;
		background:#f5f5f5;
		padding:0 10rpx
	}
	.hotsearchlist{
		display: flex;
		flex-wrap: wrap;
		overflow: hidden;
	}

	.hotsearchitem{
		width:50%;
		padding:20rpx 0;
		font-size: 28rpx;
		display:flex;
		place-items: center;
	}
	.hotsearchitem img{

		height:30rpx;
	}
	.hotsearchitem text{
		margin-right: 30rpx;
	}
	.hotsearchitem:nth-child(1) text:nth-child(1),.hotsearchitem:nth-child(2) text:nth-child(1),.hotsearchitem:nth-child(3) text:nth-child(1){
		color:coral;
	}
	.hotsearchitem:nth-child(1) text:nth-child(2),.hotsearchitem:nth-child(2) text:nth-child(2),.hotsearchitem:nth-child(3) text:nth-child(2){
		color:#000;
		font-weight: 600;
	}
	.isheight{
		font-size: 24rpx;
		color:#ccc;
		width:100%;
		text-align: center;
	}
	.isheight text{
		font-size: 20rpx;
		margin-left: 10rpx;
		}
	.cloce{
		position: absolute;
		right: 30rpx;

	}
	.name{
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
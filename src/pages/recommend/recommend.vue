<template>
   <view class="event">
	   <backNav>
			<view slot="didongyi">每日推荐</view>
	   </backNav>
	   <scroll-view class="scoll" scroll-y="true">
		   <view class="eventitem" v-for="(item,index) in this.list.dailySongs" :key="index">
			   	<view class="content">
					<view class="title">{{item.name}}</view>
					<view class="name">{{item.ar[0].name}} &nbsp;-&nbsp;{{item.al.name}}</view>	   
				</view>
				<view class="move">
					<text v-if="item.mv!=0" class="mv iconfont">&#xe62c;</text>
					<text class="iconfont">&#xe689;</text>

				</view>
		   </view>
	   </scroll-view>
   </view>
</template>

<script>
import backNav from '../components/back/backNav.vue';
import { recommsongs } from "../../api/main/event";
export default {
	data(){
		return{
			name:'每日推荐',
			list:[]
		}
	},
	components:{backNav},
	methods:{
		async recommsongs(){
			const data =await recommsongs()
			this.list = data.data
			console.log(data)
		},
		backnav(){
			uni.navigateBack(1)
		},
	},
	onLoad(){
		this.recommsongs()
	}
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_dtz3a3z90d.eot');
  src: url('//at.alicdn.com/t/font_2223549_dtz3a3z90d.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_dtz3a3z90d.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_dtz3a3z90d.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_dtz3a3z90d.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_dtz3a3z90d.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:24px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
	.event{
		width:100%;
		background: #fff;
	}	
	.scoll{
		width:100%;
		padding:20rpx;
		box-sizing: border-box;
		background: #fff;

	}
	.eventitem{
		display: flex;
		border-bottom: 1px solid #f5f5f5;
		padding: 13rpx;
		place-items: center;
	}
	.content{
		display: flex;
		flex-direction: column;
		font-size: 30rpx;
		justify-content: space-around;
	}
	.name{
		font-size: 26rpx;color: rgb(158, 152, 152);
		white-space: nowrap;
		width: 500rpx;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.move{
		color: #ccc;
		margin-left: auto;
	
	}
	.mv{
		margin-right: 40rpx;
	}
	
</style>
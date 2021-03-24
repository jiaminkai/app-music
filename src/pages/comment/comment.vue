<template>
  <view class="comment">
	  <tabback class="tabnav"><text slot="didongyi">评论({{this.count}})</text></tabback>
	<view class="scroll">
		<scroll-view scroll-y="true" :style="{height:'100%'}" lower-threshold="20" @scrolltolower="lower">
			<commentitem v-for="(item,index) in this.comment" :key="index" :itemdata="item"></commentitem>
		</scroll-view>
	</view>
	<view class="witrecomment">
		<input type="text" adjust-position="true" class=" witer"	placeholder="写评论...">
		<text class="iconfont biaoqing">&#xebf0;</text>
		<text class="send">发送</text>
	</view>
	<request-loading></request-loading>
  </view>
</template>
<script>
import { getcomment } from "../../api/main/comment";
import tabback from "../components/back/backNav";
import commentitem from "./commentitem";

export default {
	data(){
		return{
			type:2,count:'',id:'',
			cursor: Date.now(),
			comment:[],
			page:0,
			hasMore:true,
		}
	},
	methods:{
		async GetComment(){
			this.$showLoading()
			if(this.hasMore){
				this.page+=1
				const data =await getcomment(this.type,this.id,this.cursor,30,this.page);
				this.comment.push(...data.data.comments);
				this.hasMore =  data.data.hasMore;
				this.cursor=data.data.cursor
			}
			this.$hideLoading()
		},
		lower(){
			console.log("到底了")
			this.GetComment()
		},
	},
	components:{tabback,commentitem},
	onLoad(target){
		console.log(JSON.parse(target.data))
		var data =JSON.parse(target.data)
		this.count = data.count;
		this.id = data.id;
		this.type =data.type;
		this.GetComment()
		
	}
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_a69f0iovuq8.eot');
  src: url('//at.alicdn.com/t/font_2223549_a69f0iovuq8.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_a69f0iovuq8.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_a69f0iovuq8.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_a69f0iovuq8.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_a69f0iovuq8.svg#iconfont') format('svg');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
 .tabnav{
	 background:coral;
	 color: #fff;
	 font-size: 32rpx;
	 position:sticky;
	 top:0
 }
 .comment{
	 width:100%;
	 height: 100vh;display: flex;
	 flex-direction: column;
	 
 }
 .tabnav{
	 height:80rpx;
 }
 .scroll{
	 width:100%;
	 height: 100%;
	 margin-top: 40rpx;
	 flex:1;
	 
 }
 .witrecomment{
	 position:fixed;
	 bottom:0;
	 left:0;
	 width:100%;
	 display:flex;
	 background:#fff;
	 padding:  15rpx;
	 place-items: center;
 }
 .witer{
	 width:77%;
	 font-size:28rpx;
	 background:#fff
 }
 .biaoqing{
	 width:40rpx;
	 font-size:40rpx;
	 padding: 0 15rpx;
 }
 .send{
	 font-size: 30rpx;
	 color: rgb(202, 187, 187);
 }
</style>
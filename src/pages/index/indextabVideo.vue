<template>
  <view class="videos">
	  <categorytab :category="category" @change="sendcate"></categorytab>
	  <view class="videoslist" v-if="this.videos!=[]">
		  <view class="videositem" v-for="(item,index) in this.videos" :key="index">
			  <view class="itemimg">
				  <img :src="item.data.coverUrl" alt="">
				  <text class="title">{{item.data.title}}</text>
			  </view>
			  <view class="itemuser">
				  <view class="itemusericon">
					  <img v-if="item.data.creator.avatarUrl" :src="item.data.creator.avatarUrl" alt="">
					  <img v-else :src="item.data.creator.img1v1Url" alt="">
					  <text class="name">{{item.data.creator.nickname}}</text>
				  </view>
				  <view class="itemusercount">
					  <view class="dainzan">
						  <text class="iconfont">&#xe604;</text>
						  <text class="count">{{item.data.praisedCount}}</text>
					  </view>
					  <view class="message">
						  <text class="iconfont">&#xe669;</text>
						  <text class="count">{{item.data.commentCount}}</text>
					  </view>

				  </view>
			  </view>
		  </view>
	  </view>
	  <view class="videoslist" v-else>
		  暂无推荐视频，请稍后再试
	  </view>
	  <request-loading></request-loading>
  </view>
  
</template>

<script>
import categorytab from '../components/categorytab/categorytab';
import { Videourl,VideodetailCount,Videodetail,related,categroup,category } from "../../api/user/user";
	export default {
		name:'videos',
		data(){
			return {
				category:[],
				videos:[],
				page:0,
				id:0
			}
		},
		components:{categorytab},
		methods: {
			// 获取分类
			async getcategory(){
				const data =await category();
				this.category= data.data
			},
			//点击分类
			async sendcate(id){
				this.id = id
				this.page= 1
				this.$showLoading()
				const data =await categroup(id,this.page);
				 data.datas.forEach(item=>{
					Videourl(item.data.vid).then(res=>{
						this.$set(item,'url',res.urls[0].url)
					})
				})
				this.videos=data.datas
				console.log(this.videos)
				this.$emit('backtop')
				this.$hideLoading()
			},
			nextpage(){
				categroup(this.id,this.page).then(res=>{
					res.datas.forEach(item=>{
						Videourl(item.data.vid).then(res=>{
							this.$set(item,'url',res.urls[0].url)
						})
					})
				this.videos.push(...res.datas)
				})
				this.$hideLoading()
			}

		},
		created(){
			this.sendcate('58100')
			this.getcategory()
			var that =this
			uni.$on('update',function(){
				that.page+=1
				this.$showLoading()
				that.nextpage()	
				
			})

		}
	}
</script>

<style scoped>
	@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_jl3fut238h.eot');
  src: url('//at.alicdn.com/t/font_2223549_jl3fut238h.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_jl3fut238h.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_jl3fut238h.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_jl3fut238h.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_jl3fut238h.svg#iconfont') format('svg');
	}
	.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
	.videos{
		margin-top: 80rpx;
		width: 100%;
	}
	.videoslist{
		margin-top: 160rpx;
		width: 100%;
	}
	.videositem{
		margin-bottom: 20rpx;
		padding:30rpx 30rpx 20rpx 30rpx;
		background:#ffffff;
		box-sizing: border-box;
	}
	.itemimg{
		width: 100%;
		box-sizing: border-box;
		border-bottom: 1rpx solid #f5f5f5;
		padding-bottom: 20rpx;
	}
	.itemimg img{
		width: 100%;
		height:330rpx;
		border-radius: 20rpx;
		
	}
	.title{
		font-size: 30rpx;
		width:100%;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.itemuser{
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
	}
	.itemusericon{
		display: flex;
		place-items: center;
		font-size: 28rpx;
	}
	.itemusericon img{
		width: 60rpx;
		height:60rpx;
		border-radius: 50%;
		margin-right: 15rpx;
	}
	.itemusercount{
		display: flex;
		margin-right: 40rpx;
	}
	.count{
		font-size: 28rpx;
		color: #ccc;
		margin-left: 6px;
		margin-right: 16px;
		}
</style>
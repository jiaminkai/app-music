<template>
<scroll-view class="mianscroll" :scroll-y="true" :show-scrollbar="false" 
lower-threshold="30" 
@scrolltolower="scrolltolower" >
  <view class="yuncun">
	  <view class="yuntab">
		  <view @click="changetab(0)" class="yunping" :class="this.index==0?'active':''">热评墙</view>
		  <view @click="changetab(1)" class="yunping" :class="this.index==1?'active':''">热门话题</view>
	  </view>
	  <view class="centent" v-if="this.index==1">
		  <view class="yunitem" 
		  		v-for="(item,index) in this.Hotcommet" 
				:key="index">
				<img :src="item.sharePicUrl" alt="">
				<view class="text">
					<view class="title">#{{item.title}}#</view>
					<view class="count">{{item.participateCount}} 人参与</view>
				</view>
		  </view>
		<view class="nullcooment" v-if="this.isf">
		  没有更多的话题了
		</view>
		<view class="nullcooment" v-else>
			客官别急！正在加载中
		</view>
	  </view>
	  <view class="centent" v-else>
		  	官方下架，暂时不能用
	  </view>

  </view>
</scroll-view>
</template>

<script>
import { Hotcommet } from "../../api/user/user";
export default {
	data(){
		return{ 
			Hotcommet:[],
			hotpage:1,
			fencommet:[],
			hotlist:50,
			index:1,
			newtime:'',
			isf :false
		}
	},
	methods:{
		// 获取热门话题
		async gethotcommet(){
			const hotcommet =await Hotcommet(this.hotlist,(this.hotlist*this.hotpage));
			console.log(hotcommet)
			this.fencommet =hotcommet.hot
			this.Hotcommet = this.fencommet.filter((item,index)=>{
				return index<10
				})
		},
		fenhotcommet(){
			var len =this.fencommet.length  -(this.hotpage*10)
			if(len <10 && len>0){
				var c = this.fencommet.filter((item,index)=>{
					return  index > this.hotpage*10
				})
				this.Hotcommet.push(...c)
				return
			}
			if(len>0){
				var c = this.fencommet.filter((item,index)=>{
					return index <= this.hotpage*10 &&  index > (this.hotpage-1)*10
				})
				this.Hotcommet.push(...c)
				return 
			}
			this.isf =true;
		},
		//切换tab
		changetab(index){
			this.index =index
		},
		//上拉加载更多
		scrolltolower(){
			this.$showLoading()
			this.device(this.fenhotcommet,500)()
			this.$hideLoading()
		},
		//时间节流
		device(fn,delayTime){
			var that =this
			return ()=>{
				if(that.newtime){
					clearTimeout(that.newtime)
				}
				that.newtime= setTimeout(()=>{
					if(that.index==1){
						that.hotpage+=1
						fn()
						that.newtime = ""
					}
				},delayTime)

			}
		}
	},
	created(){
		this.gethotcommet()
	}
}
</script>

<style scoped>
	.yuncun{
		margin-top: 160rpx;
		background-color:#fff;

		
	}
	.yuntab{
		width:100%;
		font-size: 30rpx;
		display: flex;
		height:80rpx;
		align-items:center;
		justify-content: center;
		position:fixed;
		top: 80rpx;
		background-color:#fff;
		box-shadow: 2rpx 2rpx 10rpx #ccc;
		z-index: 1;
	}
	.yunping{
		width:30%;
		text-align:center;
		height:100%;
		line-height: 80rpx;
	}
	.active{
		color: coral;
		border-bottom: 2px solid coral;
	}
	.centent{
		padding:20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: 100%;
		position: relative;

	}
	.yunitem{
		width:100%;
		margin-bottom: 20rpx;
		display: flex;
	}
	.yunitem img {
		width:110rpx;
		height:110rpx;
		border-radius: 15rpx;
		box-shadow: 2rpx 2rpx 10px #ccc;
		margin-right: 30rpx;
	}
	.text{
		display: flex;
		flex-direction: column;
		justify-content:center;
		flex:1
	}
	.title{
		font-size: 34rpx;
		color: #000;
		font-weight: 500;
		white-space: nowrap;
		width: 93%;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.count{
		font-size: 28rpx;
		color: #ccc;
	}
	.mianscroll{
		height:100%
	}
	.nullcooment{
		width:100%;
		text-align:center;
		color: #ccc;
		padding: 80rpx 0rpx;
		position: absolute;
		bottom: -100px;
	}

</style>
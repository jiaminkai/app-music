<template>
  <view class="set">
	  	<topnav class="topnav" :setvalue="value"></topnav>
		<view class="setlist">
			<scroll-view scroll-x="true" class="scroll" >
				<view class="item"  @click="change(item,index)"  v-for="(item,index) in this.category" :class="countindex==index?'active':''" :key="index">{{item.name}}</view>
			</scroll-view>
		</view>
		<scroll-view scroll-y="true" class="scrolly" lower-threshold="30" @scrolltolower="nextpage">
			<settab1 class="settab" v-if="countindex==0" :songs="this.keys" :like="like"></settab1>
			<settab2 class="settab" v-if="countindex==1" :songs="this.keys"></settab2>
			<settab3 class="settab" v-if="countindex==2" :songs="this.keys"></settab3>
			<settab4 class="settab" v-if="countindex==3" :songs="this.keys"></settab4>
			<settab5 class="settab" v-if="countindex==4" :songs="this.keys"></settab5>
			<settab6 class="settab" v-if="countindex==5" :songs="this.keys"></settab6>
			<settab7 class="settab" v-if="countindex==6" :songs="this.keys"></settab7>

		</scroll-view>
		
		
		<request-loading></request-loading>
  </view>
</template>

<script>
import topnav from './searchtab.vue'
import settab1 from './settab1.vue'
import settab2 from './settab2.vue'
import settab3 from './settab3.vue'
import settab4 from './settab4.vue'
import settab5 from './settab5.vue'
import settab6 from './settab6.vue'
import settab7 from './settab7.vue'


import categorytab from '../components/categorytab/categorytab.vue'
import { Searchmatch,Searchnum,searcsub} from "../../api/user/user";
export default {
	data(){
		return{
			value:"",
			isf:false,
			category:[
				{name:'综合',id:1018},
				{name:'单曲',id:1},
				{name:'歌单',id:1000},
				{name:'视频',id:1014},
				{name:'歌手',id:100},
				{name:'专辑',id:10},
				{name:'主播电台',id:1009},
			],
			keys:{},
			countindex:0,
			like:{},
			index:1018,
			page:0
		}
	},
	components:{topnav,categorytab,settab1,settab2,settab3,settab7,settab4,settab5,settab6},
	methods:{
		change(item,index){
			console.log(index)
			this.$showLoading()
			this.countindex = index
			this.index =item.id
			this.page = 0
			this.keys =null
			this.getSeach(item.id)

		},

		async getSeach(id=1018){
			this.$showLoading()
			if(id==1018){
				const data =await Searchnum(this.value)
				const like = await searcsub(this.value)
				this.like = like.result
				this.keys=data.result
			}else{
				const data =await Searchmatch(this.value,id,30,this.page)
				if(this.keys!=null){
					console.log("不空")
					if(this.index==1){
						this.keys.songs.push(...data.result.songs)
					}
					if(this.index==1000){
						this.keys.playlists.push(...data.result.playlists)
					}if(this.index==1014){
						this.keys.videos.push(...data.result.videos)
					}if(this.index==100){
						this.keys.artists.push(...data.result.artists)
					}if(this.index==10){
						this.keys.albums.push(...data.result.albums)
					}if(this.index==1009){
						this.keys.djRadios.push(...data.result.djRadios)
					}
					
				}else{
					console.log("空")
					this.keys=data.result
					console.log(data.result)
				}


			}
			this.$hideLoading()
		},
		nextpage(){
			if(this.index!=1018){
					if(this.index==1){
						if(this.keys.songCount < this.page*30){
							return 
						}
					}
					if(this.index==1002){
						if(this.keys.userprofileCount< this.page*30){
							return 
						}
					}if(this.index==1014){
						if(this.keys.videoCount< this.page*30){
							return
						}
					}if(this.index==100){
						if(this.keys.artistCount< this.page*30){
							return
						}
					}if(this.index==10){
						if(this.keys.albumCount< this.page*30){
							return
						}
					}if(this.index==1009){
						if(this.keys.djRadiosCount< this.page*30){
							return
						}
					}
					this.page +=1
					this.debounce(this.getSeach(this.index),10000)
			}

		},
		// 防抖
		debounce(fn,wait){
			 var OldTime = Date.now();
			 return function(){
				 var that =this,
				 NewTime = Date.now(),
				 arg =arguments
				 if((NewTime-wait)>=OldTime){
					 	OldTime = Date.now();
						return fn()		
				 }
			 }
		}

	},

	onLoad: function (option) {
		this.value = option.key
		this.getSeach()
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
	.topnav{
		position:sticky;
		top: 0;
		width: 100%;
		z-index: 3;
		background: #fff;
	}
	.setlist{
		position:sticky;
		top: 80rpx;
		width: 100%;
		background: #fff;
		z-index: 2;
	}
	.set{
		background:#f5f5f5;
		/* height:100vh; */
		
	}
	.scroll{
		width:100%;	
		white-space: nowrap;
	}
	.item{
		display: inline-block;
		padding:0 26rpx;
		height:100%;
		line-height: 80rpx;
		font-size: 30rpx;
	}
	.active{
		color:coral;
		border-bottom: 1px solid coral;
	}
	.scrolly{
		height:100vh;
	}
</style>
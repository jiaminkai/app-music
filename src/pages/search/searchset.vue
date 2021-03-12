<template>
  <view class="set">
	  	<topnav :setvalue="value"></topnav>
		<view class="setlist">
			<scroll-view scroll-x="true" class="scroll">
				<view class="item"  @click="change(item,index)" v-for="(item,index) in this.category" :class="countindex==index?'active':''" :key="index">{{item.name}}</view>
			</scroll-view>
		</view>
  </view>
</template>

<script>
import topnav from './searchtab.vue'
import categorytab from '../components/categorytab/categorytab.vue'
import { Searchmatch } from "../../api/user/user";
export default {
	data(){
		return{
			value:"",
			isf:false,
			category:[
				{name:'综合',id:1018},
				{name:'单曲',id:1},
				{name:'歌单',id:1002},
				{name:'视频',id:1014},
				{name:'歌手',id:100},
				{name:'专辑',id:10},
				{name:'主播电台',id:1009},
			],
			keys:[]
		}
	},
	methods:{
		change(item){
			console.log("change")
		},
		async getSeach(id=1018){
			const data =await Searchmatch(this.value,id)
			this.keys=data.result
			console.log(data.result)
		}
	
	},
	components:{topnav,categorytab},
	onLoad: function (option) {
        console.log("sda",option.key);
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
	
</style>
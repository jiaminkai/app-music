<template>
  <view class="title">
	  <view class="iconfont back" @click="back">&#xe703;</view>
	  <view v-if="this.name" class="name">{{this.name}}</view>
	  <view v-else class="solt">
		  <view  solt="didongyi"></view>
	  </view>
	  

  </view>
</template>

<script>
export default {
	props:{
		name:String
	},
	methods:{
		back(){
			this.$emit('backnav')
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
	.title{
		width:100%;height: 80rpx;
		box-shadow: 2px 2px 10px #ccc;
		display: flex;
		align-items: center;
		position: relative;
	}
	.name{
		position:absolute;
		top: 50%;
		left:50%;
		transform:translate(-50%,-50%);
		font-size: 34rpx;
	}
	.back{
		width:60rpx;
		height:100%;
		line-height:80rpx;
		margin-left: 30rpx;
	}
	.solt{
		flex:1
	}
</style>
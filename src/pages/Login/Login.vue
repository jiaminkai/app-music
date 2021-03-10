<template>
	<view class="Login">
		<view class="loginicon">
			<img src="../../static/logo.png" alt="">
		</view>
		<view class="phonelogin">
			<navigator url="./PhoneLogin" class="phone" >手机号登录</navigator>
			<view class="Experience">立即体验</view>
			<view class="changelogin">
				<view class="iconfont icon">&#xe64f;</view>
				<view class="iconfont icon">&#xe610;</view>
				<view class="iconfont icon">&#xe611;</view>
				<view class="iconfont icon">&#xe60f;</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name:'Login',

}
</script>

<style scoped>
	@font-face {
	font-family: 'iconfont';  /* project id 2223549 */
	src: url('//at.alicdn.com/t/font_2223549_5532hkmqhxn.eot');
	src: url('//at.alicdn.com/t/font_2223549_5532hkmqhxn.eot?#iefix') format('embedded-opentype'),
	url('//at.alicdn.com/t/font_2223549_5532hkmqhxn.woff2') format('woff2'),
	url('//at.alicdn.com/t/font_2223549_5532hkmqhxn.woff') format('woff'),
	url('//at.alicdn.com/t/font_2223549_5532hkmqhxn.ttf') format('truetype'),
	url('//at.alicdn.com/t/font_2223549_5532hkmqhxn.svg#iconfont') format('svg');
	}
	.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
	.Login{
		background:rgb(252, 23, 23);
		width: 100%;
		height: 100vh;
		position: relative;
	}
	.loginicon{
		position: absolute;
		top: 200rpx;
		left: 50%;
		transform:translateX(-50%)
	}
	.loginicon img{
		width:120rpx;height:120rpx
	}
	.phonelogin{
		position: absolute;
		bottom:300rpx;left:50%;
		transform:translateX(-50%);
		width:60% ;
	}
	.changelogin{
		color: #fff;
		display: flex;
		justify-content: space-evenly;
	}
	.icon{
		font-size: 35rpx;
		border-radius: 50%;
		border: 1px solid #fff;
		padding:10rpx;

	}
	.phone,.Experience{
		height:45rpx;
		line-height: 45rpx;
		border-radius: 50rpx;
		padding: 10rpx 15rpx;
		margin-bottom: 30rpx;
		text-align: center;
		font-size: 28rpx;
	}
	.phone{
		background:#fff;
		color: coral;
	}
	.Experience{
		border: 1px solid #fff;
		color: #fff;
	}
</style>
<template>
	<view>
		<titlenav :name="this.name" @backtop="backtop"></titlenav>
		<view class="login">
			<text class="desc">没有注册过的手机号会自动注册</text>
			<view class="phone">
				<text class="mima">手机号：</text>
				<input type="text" placeholder="请输入手机号"  v-model="phone"/>
			</view>
			<view class="phone">
				<text class="mima">密码：</text>
				<input type="password" placeholder="请输入密码"  v-model="pasw"/>
			</view>
		</view>	
		<view class="loginbutton" @click="login"> 点击登录</view>
	</view>
</template>

<script>
import titlenav from "pages/components/back/backNav.vue"
import { PhoneLogin } from "./login";
export default {
	data() {
		return{
			name:'手机号登录',
			phone:'',
			pasw:''
		}
	},
	components:{titlenav},
	methods:{
		backtop(){
			uni.navigateBack(1)	
		},
		async login(){
			var password =this.$md5(this.pasw)
			const data = await PhoneLogin(this.phone,password)
			console.log(data)
			if(data.code==200){
				console.log("登录成功")
				sessionStorage.setItem('Login',JSON.stringify(data.profile))
				uni.navigateTo({
					url:'/pages/index/index'
				})
			}
		}
	}
}
</script>

<style>
	.login{
		display:flex;
		flex-direction: column;
		margin-top:30rpx;
	}
	.desc{
		font-size: 30rpx;
		color: #ccc;
		margin:0 auto;
	}
	.phone{
		width:90%;
		margin: 20rpx auto;
		height:80rpx;
		background:#fff;
		border-bottom: 1px solid #ccc;
		display: flex;
		font-size: 30rpx;
		align-items:center;
	}
	.mima{
		width: 120rpx;
		text-align: right;
	}
	.loginbutton{
		width:90%;
		height:80rpx;
		color: #fff;
		background:rgb(248, 26, 26);
		border-radius: 40rpx;
		margin: 40rpx auto;
		text-align:center;
		line-height: 80rpx;
	}
</style>
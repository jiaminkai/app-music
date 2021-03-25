<template>
  <view class="my">
	  <!-- 登录框 -->
	<view class="iconlogin">
	<img v-if="!this.login.avatarUrl" src="../../static/icon.png" alt="">
	<img v-else  :src="this.login.avatarUrl" alt="">
	<view class="username">
		<view class="loginchange">
			<text v-if="!this.login.nickname" @click="tologin">未登录</text>
			<view class="loginbox" v-else>
				<view class="loginname">{{this.login.nickname}}</view>
				<view class="level">Lv{{this.level.level}}</view>
			</view>
		</view>
		<view class="iconfont">&#xe65f;</view>
	</view>
	</view>
	<!-- 用户操作tab -->
	<view class="logintab">
		<view class="tabitem">
			<img src="../../static/localhost.png" alt="">
			<text>本地音乐</text>
		</view>
		<view class="tabitem">
			<img src="../../static/yunpan.png" alt="">
			<text>云盘</text>
		</view>
		<view class="tabitem">
			<img src="../../static/goumai.png" alt="">
			<text>已购</text>
		</view>
		<view class="tabitem">
			<img src="../../static/newplay.png" alt="">
			<text>最近播放</text>
		</view>
		<view class="tabitem">
			<img src="../../static/myguan.png" alt="">
			<text>我的关注</text>
		</view>
		<view class="tabitem">
			<img src="../../static/mysub.png" alt="">
			<text>收藏与赞</text>
		</view>
		<view class="tabitem">
			<img src="../../static/mydt.png" alt="">
			<text>我的电台</text>
		</view>
		<view class="tabitem">
			<img src="../../static/move.png" alt="">
			<text>音乐应用</text>
		</view>
		
	</view>
	<!-- 喜欢的音乐 -->
	<view class="likemusic">
		<view class="likeicon">
			<img src="../../static/like.png" alt="">
		</view>
		<view class="liketitle">
			<view>我喜欢的歌</view>
			<view>{{this.like.length}}首</view>
		</view>
		<view class="likebutton">
			<img src="../../static/Heartbeat.png" alt="">
			<text>心动模式</text>
		</view>
	</view>
	<!-- 歌单分类 -->
	<view class="albumtab" :class="fixed?'sticky-fixed':'sticky'">
		<view class="albumtabitem" @click="changealbumtab(0)"  ><text :class="this.index==0?'active':''">创建歌单</text></view>
		|
		<view class="albumtabitem" @click="changealbumtab(1)" ><text :class="this.index==1?'active':''">收藏歌单</text></view>
	</view>
	<!-- 创建歌单 -->
	<view class="createalbum" ref="creat" >
		<view class="albumtop">
			<view class="albumtoptitle">创建歌单{{this.creatplay.length}}个</view>
			<view class="albumtopicon">
					<view class="iconfont">&#xebd7;</view>
					<view class="iconfont">&#xe631;</view>
			</view>
		</view>
		<view class="playitem" v-for="(item,index) in this.creatplay" @click="toplay(item)" :key="index">
			<view class="playimg"><img :src="item.coverImgUrl" alt=""></view>
			<view class="playcontent">
				<view class="playname">{{item.name}}</view>
				<view class="playcount">{{item.trackCount}}首</view>
			</view>
			<view class="iconfont playmove">&#xe631;</view>
		</view>
		<view class="albumbotton">
			<view class="iconfont daoru">&#xe803;</view>
			<view>一键导入外部音乐</view>
		</view>
	</view>
	<!-- 收藏歌单 -->
	<view class="createalbum"  ref="sub">
		<view class="albumtop">
			<view class="albumtoptitle">收藏歌单{{this.subplay.length}}个</view>
			<view class="albumtopicon">
					<view class="iconfont">&#xebd7;</view>
					<view class="iconfont">&#xe631;</view>
			</view>
		</view>
		<view class="albumbotton" v-if="this.subplay.length==0">
			<view class="albumnull">暂时还没有收藏的歌单</view>
		</view>
		<view class="playitem" v-else @click="toplay(item)" v-for="(item,index) in this.subplay" :key="index">
			<view class="playimg"><img :src="item.coverImgUrl" alt=""></view>
			<view class="playcontent">
				<view class="playname">{{item.name}}</view>
				<view class="playcount">{{item.trackCount}}首, by {{item.creator.nickname}}</view>
			</view>
			<view class="iconfont playmove">&#xe631;</view>
		</view>
	</view>
  </view>
</template>

<script>
export default {
	name:'mytab',
	data(){
		return{
			index:0,
			fixed:false
		}
	},
	props:{
		login:Object,
		creatplay:Array,
		subplay:Array,
		like:Array,
		level:Object,
		isF:Number,
	},
	watch:{
		isF:function(newValue,oldValue){
				 if(newValue>=320){
					 this.fixed= true
				 }else{
					 this.fixed= false
				 }
		}

	},
	methods:{
		changealbumtab(index){
			var scrollTop= 0
			this.index=index
			if(index==0){
					scrollTop =this.$refs.creat.$el.getBoundingClientRect().top
				}else{
					scrollTop =this.$refs.sub.$el.getBoundingClientRect().top
				}
			this.$emit('scrollto',scrollTop)

		},
		tologin(){
			uni.navigateTo({
				url:'/pages/Login/Login'
			})
		},
		toplay(item){
			console.log(item)
			uni.navigateTo({
				url:'/pages/recommend/recommendplay?id='+item.id
			})
		}
	}
}
</script>

<style scoped>
@font-face {
  font-family: 'iconfont';  /* project id 2223549 */
  src: url('//at.alicdn.com/t/font_2223549_ytxyyjsmhva.eot');
  src: url('//at.alicdn.com/t/font_2223549_ytxyyjsmhva.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_2223549_ytxyyjsmhva.woff2') format('woff2'),
  url('//at.alicdn.com/t/font_2223549_ytxyyjsmhva.woff') format('woff'),
  url('//at.alicdn.com/t/font_2223549_ytxyyjsmhva.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_2223549_ytxyyjsmhva.svg#iconfont') format('svg');
}
	.iconfont{
    font-family:"iconfont" !important;
    font-size:20px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
	.my{
		background-color:#f5f5f5;
		padding:90rpx 30rpx 30rpx 30rpx;
		width:100%;
		height: 100vh;
		box-sizing: border-box;
	}
	.iconlogin{
		display: flex;
		margin-top: 20rpx;
	}
	.iconlogin img{
		width:90rpx;height:90rpx;
		margin: 0 40rpx;
		border-radius: 50%;
	}
	.username{
		display: flex;
		place-items: center;
		justify-content: space-between;
		flex-grow: 0.9;

	}
	.loginname{
		font-size: 30rpx;
	}

	.logintab{
		width:100%;
		display: flex;
		flex-wrap: wrap;
		background:#fff;
		height:300rpx;
		margin-top: 30rpx;
		border-radius: 30rpx;
		box-shadow: 2px 2px 10px #f5f5f5;
		
	}
	.tabitem{
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 26rpx;
		width:130rpx;
		margin: 20rpx;
	}
	.tabitem img{
		width: 60rpx;
		height:60rpx;
		margin-bottom: 14rpx;
	}
	.likemusic{
		width: 100%;
		background:#fff;
		border-radius: 30rpx;
		margin-top: 30rpx;
		box-shadow: 2px 2px 10px #f5f5f5;
		display: flex;
		padding: 20rpx;
		box-sizing: border-box;
	}
	.likeicon{
		width: 100rpx;
		height:100rpx;
		position: relative;
		background:cornsilk;
		border-radius: 20rpx;
		margin-right: 30rpx;

	}
	.likeicon img{
		width: 60rpx;
		height:60rpx;
		position:absolute;
		top:50%;left:50%;transform:translate(-50%,-50%)
	}
	.likebutton img{
		width: 40rpx;
		height:40rpx;
	}
	.liketitle{
		font-size: 30rpx;
		place-self: center;
	}
	.liketitle view:nth-child(2){
		font-size: 28rpx;
		color: #666;
	}
	.likebutton{
		place-self: center;
		font-size: 26rpx;
		margin-left:auto;
		margin-right: 60rpx;
		display: flex;
		border: 1px solid #ccc;
		padding: 0 15rpx;
		border-radius: 20rpx;
	}
	.likebutton text{
		vertical-align: middle;
		margin-left: 6rpx;
	}
	.albumtab{
		display: flex;
		width: 100%;
		justify-content: space-between;
		margin: 0 auto;
		margin-top: 30rpx;
		font-size: 28rpx;
	}
	.albumtabitem{
		flex: 1;
		text-align: center;
	}
	.active{
		font-family:Arial, Helvetica, sans-serif;
		position: relative;
		font-weight: 600;
		font-size: 30rpx;
	}
	.active::after{
		content: "";
		display: flex;
		width:100%;
		height:15rpx;
		position:absolute;
		bottom: 0;
		left: 0;
		background:rgb(233, 76, 4);
		opacity: 0.5;
		border-radius: 50rclipx;
		
	}
	.createalbum{
		padding:20rpx;
		box-sizing: border-box;
		background:#fff;
		margin-top: 30rpx;
		border-radius: 20rpx;
	}
	.albumtop{
		display: flex;
		place-self: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}
	.albumtoptitle{
		font-size: 28rpx;color: #ccc;
	}
	.albumtopicon{
		display: flex;
		
	}
	.albumtopicon view{
		font-size: 38rpx;
		margin-left: 18rpx;
		color: #ccc;
	}
	.albumbotton{
		display: flex;
	}
	.daoru{
		padding: 26rpx;
		margin: 20rpx 0;
		background:#ccc;
		border-radius: 20rpx;
	}
	.playitem{
		display: flex;
		padding-top: 10rpx ;
		box-sizing: border-box;
		font-size: 28rpx;
		line-height: 45rpx;
		place-items: center;
	}
	.playmove{
		width: 60rpx;
		margin-left:auto;
		text-align: right;
	}
	.playimg img{
		width: 92rpx;
		height: 92rpx;
		border-radius: 20rpx;
		margin-right: 25rpx;
	}
	.playname{
		width:400rpx;
		white-space:nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.playcount {
		font-size: 24rpx;
		color: #ccc;
	}
	.albumbotton view:nth-child(2){
		font-size: 30rpx;
		place-self: center;
		margin-left: 40rpx;
	}
	.albumnull{
		width: 100%;
		text-align: center;
		font-size: 28rpx;
		color: #ccc;
		padding: 30rpx 0;
	}
	.level{
		font-size: 20rpx;
		background: #fff;
		text-align:center;
		border-radius: 30rpx;
		width:70rpx;
		box-shadow: 2px 2px 10px #f3f3f3;
		font-style:italic;
		margin-top: 5rpx;
	}
	.sticky-fixed{
		position: sticky;
		top: 40px;
		left:0;
		background:#fff;
		margin-left: -40rpx;
		box-shadow: 2px 2px 10px #f3f3f3;
		width: 100%;
		height: 60rpx;
		align-items: center;
		padding: 0 40rpx;
	}
	.sticky{
		position: relative;
		background:#f5f5f5;
	}
</style>
<template>
  <view class="tab">
    <!-- 更多设置 -->
    <view class="tablef">
        <span class="iconfont" @click="showmengban">&#xe60b;</span>
    </view>
    <!-- 蒙版 -->
    <view class="mengban" v-if="this.menban" @click="close">
          <scroll-view  scroll-y="true" style="background:#fff;width:640rpx" :style="{ transform: 'translateX('+moveX+'px)'}" >
            <view class="hideuser" v-if="this.menban" @click.stop="al" @touchstart="touchstart"  @touchend="touchend"   @touchmove="touchmove">
              	<view class="iconlogin">
                  <img v-if="!this.login.avatarUrl" src="../../../static/icon.png" alt="">
                  <img v-else  :src="this.login.avatarUrl" alt="">
                  <view class="username">
                    <view class="loginchange">
                      <text v-if="!this.login.nickname" @click="tologin">未登录</text>
                      <navigator url="../../index/index" class="loginbox" v-else>
                        <view class="loginname">{{this.login.nickname}}</view>
                      </navigator>
                    </view>
                    <view class="iconfont">&#xe65f;</view>
                  </view>
                </view>
                <!-- 云贝中心 -->
              <view class="qiandao">
                  <view class="qiandaoleft">
                      <view class="iconfont yun">&#xe7c4;</view>
                      <view class="yunbei">
                          <view class="yunxin">云贝中心</view>
                          <view class="qiandaobutton">签到</view>
                      </view>
                  </view>
                  <view class="qiandaoright">
                    <view class="iconfont yun">&#xe7c4;</view>
                      <view class="yunbei">
                          <view class="yunxin">消息中心</view>
                          <view class="yunxiaoxi">点击查看新信息</view>
                      </view>
                  </view>
              </view>
              <!-- 创造中心 -->
              <view class="CreationCenter" @click.stop="Create">
                <view class="iconfont yun">&#xe614;</view>
                <view class="CreationCenterText">创造者中心</view>
              </view>
              <view class="MusicServe">
                  <view class="MusicTitle">
                    音乐服务
                  </view>
                  <view class="MusicServeitem">
                    <view class="iconfont">&#xe811;</view>
                    <text class="itemtext">听歌识曲</text>
                    <text class="iconfont you">&#xe65f;</text>
                  </view>
                  <view class="MusicServeitem">
                    <view class="iconfont">&#xe612;</view>
                    <text class="itemtext">云村有票</text>
                    <text class="iconfont you">&#xe65f;</text>

                  </view>
                  <view class="MusicServeitem">
                    <view class="iconfont">&#xe615;</view>
                    <text class="itemtext">商城</text>
                    <text class="iconfont you">&#xe65f;</text>

                  </view>
                  <view class="MusicServeitem">
                    <view class="iconfont">&#xe645;</view>
                    <text class="itemtext">游戏中心</text>
                    <text class="iconfont you">&#xe65f;</text>

                  </view>
                    <view class="MusicServeitem">
                    <view class="iconfont">&#xe69e;</view>
                    <text class="itemtext">口袋彩铃</text>
                    <text class="iconfont you">&#xe65f;</text>

                  </view>
              </view>
              <view class="MusicServe">
                  <view class="MusicTitle">
                    其他
                  </view>
                  <view class="MusicServeitem">
                    <view class="iconfont">&#xe63c;</view>
                    <text class="itemtext">个性装扮</text>
                    <text class="iconfont you">&#xe65f;</text>
                  </view>
                  <view class="MusicServeitem">
                    <view class="iconfont">&#xe617;</view>
                    <text class="itemtext">定时关闭</text>
                    <text class="iconfont you">&#xe65f;</text>

                  </view>
                  <view class="MusicServeitem">
                    <view class="iconfont">&#xe658;</view>
                    <text class="itemtext">扫一扫</text>
                    <text class="iconfont you">&#xe65f;</text>

                  </view>
                  <view class="MusicServeitem">
                    <view class="iconfont">&#xe608;</view>
                    <text class="itemtext">边听边存</text>
                    <text class="iconfont you">&#xe65f;</text>
                  </view>
              </view>
            </view>
          </scroll-view>
         
        

    </view>
    <view class="content">
      <slot name="centent">
        
      </slot>
    </view>
    <view class="tabright">
      <slot name="right">
    
      </slot>
    </view>

  </view>
</template>

<script>
export default {
  data(){
    return{
      menban:false,
      staticX:0,
      moveX:0,
    }
  },

  props:{
    login:Object
  },
  methods:{
    showmengban(){
      this.menban=!this.menban
      this.moveX=0
    },
    close(){
      console.log("触发关闭魔板事件" )
      this.menban=false
    },
    al(){
      console.log(" ")
    },
    // 创造者中心
    Create(){
      console.log("没有创造者中心" )
    },
    // 手指点击事件
    touchstart(event){
      this.staticX =event.touches[0].clientX
    },
    // 手指松开：事件
    touchend(event){
      if(this.moveX<-80){
        this.menban=false
      }
      this.moveX =0
    },
    // 手指移动：事件 
    touchmove(event){
      if(event.touches[0].clientX-this.staticX <0){
        this.moveX =event.touches[0].clientX-this.staticX 
      }
    },
    tologin(){
			uni.navigateTo({
				url:'/pages/Login/Login'
			})
		}

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
.tab{
  position: fixed;
  width: 100%;
  height:40px;
  background: #ffffff;
  top: 0;
  transform: translateX();
  left: 0;
  z-index: 1;
  display: flex;
  border-bottom: 1px solid #f5f5f5;
}
.mengban{
  position:fixed;
  z-index: 1;
  background:rgba(0,0,0,0.3);
  top:0;
  left:0;
  width:100vh;
  height:100vh;
}
.tablef{
  width: 50px;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.tabright{
  width:50px;
  line-height: 40px;
  text-align: center;
}
.content{
  flex: 1;  
  display: flex;
  align-items:center
}
.hideuser{
  width:580rpx;
  background:#f5f5f5;
  height:100vh;
  padding:40rpx 30rpx;
  position: relative;
  transition: all 0.3;
}
.qiandao{
  width:100%;
  height: 160rpx;
  background:#fff;
  border-radius: 30rpx;
  display: flex;
  padding: 0 20rpx;
  box-sizing: border-box;
}
.qiandaoleft{
  display: flex;
  place-items: center;
  border-right: 1px solid #f5f5f5;
  flex: 1;
}
.qiandaoright{
  display: flex;
  flex: 1;
  place-items: center;
  padding: 0 20rpx;
}
.yunbei{
  display: flex;
  flex-direction: column;
  margin-left: 20rpx;
}
.yunxin{
  font-size: 32rpx;
  font-weight: 600;
}
.qiandaobutton{
  font-size: 26rpx;
  border: 1px solid coral;
  width: 80rpx;
  text-align: center;
  border-radius: 30rpx;
  color: coral;
  margin-top: 10rpx;
}
.yun{
  width: 60rpx;
  height:60rpx;
  border-radius: 50%;
  text-align: center;
  line-height: 60rpx;
  background:coral;
  color: #fff;
  font-size: 40rpx;
}
.yunxiaoxi{
  font-size: 24rpx;color: #ccc;
  margin-top: 10rpx;
}
.CreationCenter{
  width: 100%;
  display: flex;
  padding:35rpx 20rpx;
  background:#fff;
  border-radius: 30rpx;
  box-sizing: border-box;
  margin-top: 25rpx;
  place-items: center;
}
.CreationCenterText{
  font-size: 36rpx;
  font-weight: 600;
  margin-left: 30rpx;
}
.MusicServe{
  width: 100%;
  background:#fff;
  border-radius: 30rpx;
  margin-top: 30rpx;
  padding:15rpx 25rpx;
  box-sizing: border-box;
}
.MusicTitle{
  font-size: 28rpx;
  color: #ccc;
  position: relative;
  padding-bottom: 10rpx;
}
.MusicTitle::after{
  content: "";
  display: block;
  width:107%;
  height:1rpx;
  background:#f5f5f5;
  position: absolute;
  bottom:0;
  left: -20rpx;
}
.MusicServeitem {
  display: flex;
  place-items: center;
}
.MusicServeitem view:nth-child(1){
  padding: 20rpx 0;
  padding-right: 30rpx;
  font-size: 36rpx;
  color: #ccc;
}
.you{
  margin-left: auto;
  font-size: 30rpx;
}
.itemtext{
  font-size: 30rpx;
}
.iconlogin{
		display: flex;
		margin: 20rpx 0;
	}
	.iconlogin img{
		width:70rpx;height:70rpx;
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
</style>
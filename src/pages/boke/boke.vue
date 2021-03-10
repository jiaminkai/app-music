<template>
  <tabnav>
      <view class="toptab" slot="centent">
        <view class="toptabitem" @click="changetab(0)" :class="this.index==0?'active':''">听听</view>
        <view class="toptabitem" @click="changetab(1)" :class="this.index==1?'active':''">推荐</view>
        <view class="toptabitem" @click="changetab(2)" :class="this.index==2?'active':''">分类</view>
      </view>
      <view class="iconfont" slot="right">&#xe618;</view>
  </tabnav>
</template>

<script>
import tabnav from "../components/toptab/toptab"
import { recommend } from "./boke";
export default {
  name:'boke',
  data(){
    return{ 
      index:1
    }
  },
  components:{tabnav},
  onLoad(){
    console.log("aaa")
    this.GetRecommend()
  },
  methods:{
    // 获取推荐电台
    async  GetRecommend(){
        const data =await recommend();
        console.log("recommend",data)
    },
    // 切换tab
    changetab(index){
      this.index=index
    }
  }
}
</script>

<style>
  @font-face {
    font-family: 'iconfont';  /* project id 2223549 */
    src: url('//at.alicdn.com/t/font_2223549_6flch1nx8zm.eot');
    src: url('//at.alicdn.com/t/font_2223549_6flch1nx8zm.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_2223549_6flch1nx8zm.woff2') format('woff2'),
    url('//at.alicdn.com/t/font_2223549_6flch1nx8zm.woff') format('woff'),
    url('//at.alicdn.com/t/font_2223549_6flch1nx8zm.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_2223549_6flch1nx8zm.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:23px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
  .toptab{
    display: flex;
    margin: 0 auto;
    width:360rpx;
    justify-content:space-around;
  }
  .toptabitem{
    font-size: 32rpx;
    color: #b1adad
  }
  .active{
    font-weight: 600;
    color: #000;
    border-bottom: 3px solid coral;
  }
  
</style>
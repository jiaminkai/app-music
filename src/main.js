import Vue from 'vue'
import App from './App'
import md5 from 'js-md5';
import store from './store'
import requestLoading from './pages/components/loading/loading.vue';
import playmusic from './pages/components/play/play.vue';
Vue.prototype.$store = store

//请求加载组件
//组件挂载到全局，方便每个页面使用
Vue.component('request-loading', requestLoading);
Vue.component('playmusic', playmusic);

//挂载全局显示/隐藏请求加载动画
function showLoading(){
	store.commit('request_show_loading');
}
function hideLoading(){
	store.commit('request_hide_loading');
}
Vue.prototype.$showLoading = showLoading; //全局显示动画可以 this.$showLoading();
Vue.prototype.$hideLoading = hideLoading; //全局隐藏动画可以 this.$hideLoading();
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false

Vue.prototype.$time=function(t){
    var tiem = new Date(t)
    var y = tiem.getFullYear();
    var M = tiem.getMonth() + 1;
    var d = tiem.getDate();
    return y + "-" + M + "-" + d;
}
Vue.prototype.$palytime=function(musictime){
  return (Math.floor(musictime/1000/60)<10?"0"+Math.floor(musictime/1000/60):Math.floor(musictime/1000/60))+":"+(Math.floor(musictime/1000%60)<10?"0"+Math.floor(musictime/1000%60):Math.floor(musictime/1000%60))
}
Vue.prototype.$palycount=function(playCount){
  return playCount= playCount>10000? (parseInt(playCount)/10000).toFixed(1)+'万' : (parseInt(playCount)/1000)>1 ? (parseInt(playCount)/1000).toFixed(1)+'千':playCount
}

// 初始化音乐

Vue.prototype.$music=uni.createInnerAudioContext();
Vue.prototype.$music.onEnded(xiaoyi);
Vue.prototype.$music.onError(xiaoyi)
function xiaoyi(){
  var index =Vue.prototype.$store.state.index;
  var playlist =Vue.prototype.$store.state.playlist.length-1
    Vue.prototype.$store.commit('change',true)
  if(index < playlist){
    Vue.prototype.$store.commit('changeindex',index+1)
  }else if(index =playlist){
    Vue.prototype.$store.commit('changeindex',0)
  }
  Vue.prototype.$play()
}
// 初始化音乐
Vue.prototype.$init= function(url){
  this.$music.src =url
}

Vue.prototype.$onCanplay= function(){
  var that =this
  var time =""
  this.$music.onCanplay(()=>{
    time = that.$music.duration
  })
  return time
}

// 播放音乐
Vue.prototype.$play=function(){
  this.$music.src = Vue.prototype.$store.state.playlist[Vue.prototype.$store.state.index].song.url
  this.$music.play();
  Vue.prototype.$store.commit('change',false)
}
//暂停音乐
Vue.prototype.$pause=function(){
  console.log("暂停音乐")
  this.$music.pause();
  this.$store.commit('change',true)
  
}
//停止音乐
Vue.prototype.$stop=function(){
  this.$music.stop();
}
// 跳转至多少秒
Vue.prototype.$seek=function(){
  this.$music.seek(position);
}


App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()

import Vue from 'vue'
import App from './App'
import md5 from 'js-md5';
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
  return playCount= playCount>1000000?Math.floor(playCount/1000000)+"百万": parseInt(playCount)/10000>0 ? (parseInt(playCount)/10000).toFixed(1)+'万' : parseInt(playCount)/1000>0 ? (parseInt(playCount)/1000).toFixed(1)+'千':parseInt(playCount)
}
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()

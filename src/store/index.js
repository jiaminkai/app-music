import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		requestLoading: false, //加载等待是否显示,
		playlist:[],
		index:0,
		playchange:true,
		currentTime:'00:00',
		EndTime:'00:00'

	},
	mutations: {
		//显示请求加载动画
		request_show_loading(state) {
			state.requestLoading = true;
		},
		//隐藏请求加载动画
		request_hide_loading(state) {
			state.requestLoading = false;
		},
		addplaylist(state, content) {
			state.playlist = content
		},
		changeindex(state, content){
			state.index = content
		},
		change(state, content){
			state.playchange = content
		},
		changetime(state, content){
			state.currentTime = content
		},
		endtime(state, content){
			console.log(content)
			state.EndTime = content
			
		}
	}
})

export default store
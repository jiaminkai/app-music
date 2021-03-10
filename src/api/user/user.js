import  request  from "../../requers";

export function login(){
	return request({
		url:`/login/refresh`,
		method: 'get'
	})
}
//获取用户信息
export function userdetails(){
	return request({
		url:`/user/subcount`,
		method: 'get'
	})
}
//获取用户用户等级信息
export function level(){
	return request({
		url:`/user/level`,
		method: 'get'
	})
}

//获取用户歌单
export function playlist(uid){
	console.log(uid )
	return request({
		url:`/user/playlist?uid=${uid}`,
		method: 'get'
	})
}
//获取用户播放记录
export function record(uid){
	return request({
		url:`/user/record?uid=${uid}&type=0`,
		method: 'get'
	})
}
//获取用户喜欢的
export function likelist(uid){
	return request({
		url:`/likelist?uid=${uid}`,
		method: 'get'
	})
}
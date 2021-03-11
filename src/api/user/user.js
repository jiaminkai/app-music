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
//获取视频分类列表
export function category(uid){
	return request({
		url:`/video/group/list`,
		method: 'get'
	})
}
//获取视频标签/分类下的视频
export function categroup(uid,offset=0){
	return request({
		url:`/video/group?id=${uid}&offset=${offset}`,
		method: 'get'
	})
}
//相关视频
export function related(uid){
	return request({
		url:`/related/allvideo?id=${uid}`,
		method: 'get'
	})
}
//视频详情
export function Videodetail(uid){
	return request({
		url:`/video/detail?id=${uid}`,
		method: 'get'
	})
}
//获取视频点赞转发评论数数据
export function VideodetailCount(uid){
	return request({
		url:`/video/detail/info?vid=${uid}`,
		method: 'get'
	})
}
//视频详情
export function Videourl(uid){
	return request({
		url:`/video/url?id=${uid}`,
		method: 'get'
	})
}
//热评
export function Hotcommet(){
	return request({
		url:`/hot/topic`,
		method: 'get'
	})
}
// //视频详情
// export function Videourl(uid){
// 	return request({
// 		url:`/video/url?id=${uid}`,
// 		method: 'get'
// 	})
// }
// //视频详情
// export function Videourl(uid){
// 	return request({
// 		url:`/video/url?id=${uid}`,
// 		method: 'get'
// 	})
// }
// //视频详情
// export function Videourl(uid){
// 	return request({
// 		url:`/video/url?id=${uid}`,
// 		method: 'get'
// 	})
// }

// //视频详情
// export function Videourl(uid){
// 	return request({
// 		url:`/video/url?id=${uid}`,
// 		method: 'get'
// 	})
// }
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
export function Hotcommet(limit=50,offset){
	return request({
		url:`/hot/topic?limit=${limit}&offset=${offset}`,
		method: 'get'
	})
}
//搜索
export function Searchkey(keywords){
	return request({
		url:`/search/suggest?keywords=${keywords}&type=mobile`,
		method: 'get'
	})
}
//热搜列表
export function HotSearch(){
	return request({
		url:`/search/hot/detail`,
		method: 'get'
	})
}
//搜索
export function Searchmatch(uid,type=1018,limit=30,offset=0){
	return request({
		url:`/cloudsearch?keywords=${uid}&type=${type}&limit=${limit}&offset=${offset*limit}`,
		method: 'get'
	})
}
//综合
export function Searchnum(uid){
	return request({
		url:`/search?keywords=${uid}&type=1018`,
		method: 'get'
	})
}
export function searcsub(uid){
	return request({
		url:`/search/multimatch?keywords=${uid}`,
		method: 'get'
	})
}
export function lishi(uid){
	return request({
		url :`/user/record?uid=${uid}&type=0`,
		method: 'get'
	})

}
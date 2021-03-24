import request from "../../requers";
export function getbanner(){
	return request({
		url:'/banner?type=2',
		method: 'get'
	})
}
// 原型图标

export function geticon(){
	return request({
		url:'/homepage/dragon/ball',
		method: 'get'
	})
}
// 推荐歌单

export function subablum(){
	return request({
		url:'/personalized?limit=6',
		method: 'get'
	})
}
// 每日推荐歌曲

export function daysongs(){
	return request({
		url:'/recommend/songs',
		method: 'get'
	})
}
// 获取新歌曲
export function newsongs(limit=0){
	return request({
		url:`/personalized/newsong?limit=${limit}`,
		method: 'get'
	})
}
// 获取推荐视频
export function getsongsurl(id){
	return request({
		url:`/song/url?id=${id}`,
		method: 'get'
	})
}
// 获取url
export function musicmv(){
	return request({
		url:`/personalized/mv`,
		method: 'get'
	})
}
// 热门歌手
export function hotartists(offset=0,limit=9){
	return request({
		url:`/top/artists?offset=${offset}&limit=${limit}`,
		method: 'get'
	})
}
// 推荐节目
export function getprogram(id){
	return request({
		url:`/program/recommend`,
		method: 'get'
	})
}
// 音乐日历
export function getcalendar(){
	return request({
		url:`/calendar?startTime=1606752000000&endTime=1609430399999`,
		method: 'get'
	})
}
// 获取url
export function comment(id){
	return request({
		url:`/comment/new?type=2&id=2819914042&sortType=3&cursor=&pageSize=20&pageNo=1`,

		method: 'get'
	})
}
// 获取url
// export function getsongsurl(id){
// 	return request({
// 		url:`/song/url?id=${id}`,
// 		method: 'get'
// 	})
// }


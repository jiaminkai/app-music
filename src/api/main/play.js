import request from "../../requers";
// 获取歌单详情
export function playdetail(id){
	return request({
		url:`/playlist/detail?id=${id}`
	})
}
// 获取歌曲歌词
export function lyric(id){
	return request({
		url:`/lyric?id=${id}`
	})
}
// 获取歌单详情
export function Hotplaylist(id){
	return request({
		url:`/playlist/hot`
	})
}
// 获取歌单详情
export function playlist(cat='全部',limit=30,offset=1){
	return request({
		url:`/top/playlist?limit=${limit}&order=hot&cat=${cat}&offset=${offset}`
	})
}


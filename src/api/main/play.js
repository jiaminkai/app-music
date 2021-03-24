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


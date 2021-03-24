import request from "../../requers";
// 获取每日推荐歌曲
export function recommsongs(){
	return request({
		url:'/recommend/songs',
		method: 'get'
	})
}

import request from "../../requers";
// 获取歌曲地址
export function songurl(id){
	return request({
		url:`/song/url?id=${id}`
		
	})
}
// 获取歌曲详情
export function songdetails(id){
	return request({
		url:`/song/detail?ids=${id}`
	})
}

export function songs(id){
    return	Promise.all([songdetails(id),songurl(id)])
}

export class Song{
	constructor(song,url){
		this.picUrl = song.al.picUrl
		this.albumname= song.al.name
		this.albumid =song.al.id
		this.username=song.ar[0].name
		this.userid=song.ar[0].id
		this.music=song.name
		this.mvid =song.mv
		this.musicid=song.id
		this.playtime = (Math.floor(song.dt/1000/60)<10?"0"+Math.floor(song.dt/1000/60):Math.floor(song.dt/1000/60))+":"+(Math.floor(song.dt/1000%60)<10?"0"+Math.floor(song.dt/1000%60):Math.floor(song.dt/1000%60))
		this.url = url.url
	}
}
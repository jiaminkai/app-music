
import  request  from "../../requers";
export function getcomment(type,id,cursor,pageSize,pageNo){
	console.log(type,id,cursor,pageSize,pageNo)
	return request({
		url:`/comment/new?type=${type}&id=${id}&sortType=3&cursor=${cursor}&pageSize=${pageSize}&pageNo=${pageNo}`
	})
}
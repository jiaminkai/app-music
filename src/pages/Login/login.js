import  request  from "../../requers";

//播客推荐
export function PhoneLogin(phone,password){
	return request({
		url:`/login/cellphone?phone=${phone}&md5_password=${password}`,
		method: 'post'
	})
}

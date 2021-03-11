import axios from "axios"

const request = axios.create({
	baseURL: "http://localhost:3000", // 正式环境
	withCredentials: true,
    timeout: 5000, // Timeout,
    headers: {
        "Content-Type": "application/json",
    },
	
})

request.interceptors.request.use(
	config => {
	  if (config.method == 'post') {
		config.data = {
		  ...config.data,
		  timestamp: Date.parse(new Date()) / 1000
		}
	  } else if (config.method == 'get') {
		config.params = {
		  timestamp: Date.parse(new Date()) / 1000,
		  ...config.params
		}
	  }
	  return config
	  
	}, error=> {
	  return Promise.reject(error)
	}
  )
request.interceptors.response.use(config=>{
	
	if(config.status==200){
		return config.data
	}else{
		return Promise.reject(res.data.msg)
	}
},err=>{
	// Request failed with status code 
	status = err.message.split('Request failed with status code ')[1]
	console.log(status)
	switch(status){
		case '401':
			console.log("页面进入了黑洞" )
			break;
		case '301':
			console.log("需要登录")
			// uni.navigateTo({
            //     url: '/pages/Login/Login',
            // });
			break;
		case '504':
			console.log("网络超时");
			break;
		case '505':
			console.log("http版本不支持该请求");
			break;
		default:
			console.log(err.message);
			break;
	}
}
)

axios.defaults.adapter = function(config) { //自己定义个适配器，用来适配uniapp的语法
	return new Promise((resolve, reject) => {
		var settle = require('axios/lib/core/settle');
		var buildURL = require('axios/lib/helpers/buildURL');
		uni.request({
			method: config.method.toUpperCase(),
			url: config.baseURL + buildURL(config.url, config.params, config.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};
				settle(resolve, reject, response);
			}
		})
	})
}
export default request

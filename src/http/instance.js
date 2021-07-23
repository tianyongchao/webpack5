import axios from 'axios'
import api from './api.js'
console.log(api);
//请求
// axios.defaults.baseURL = "/exchange-app-api/common"
function http(url, method, params = {}) {
	//params.Token = getCookie("token");
	if (method === 'EXPORT') {
		let _arr = [];
		for (var k in params) {
			_arr.push(k+"="+params[k]);
		}
		return "/api"+url+"?"+_arr.join("&");
	}
	if (method === "GET") {
		return axios({
			method,
			url,
			params
		});
	}
	return axios({
		method,
		url,
		data: params
	});
}
const _http = {
  configGet() {
		return http(api.symbolList, 'GET')
	}
}
export default _http;
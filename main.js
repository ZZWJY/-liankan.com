import Vue from 'vue'
import App from './App'
import uniRequest from 'uni-request'; 
import MD from './static/js/utils.js'
// let baseUrl = 'http://13.14.19.89:9501'  // 开发环境
let baseUrl = 'http://13.14.19.89:222' 
// let baseUrl = 'https://api.chainkd.com' 
Vue.config.productionTip = false
function uuid() {
    let s = [];
    let hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    let uuid = s.join("").toUpperCase();
	// console.log(uuid)
    return uuid;
}
Vue.prototype.now_time = function(){
	let data = new Date() //Number(this.random_code.slice(1))
	// console.log(data.getTime())
	let y = data.getFullYear().toString()
	let m = (data.getMonth()+1)<10?('0'+(data.getMonth()+1)):(data.getMonth()+1)
	let D = data.getDate()<10?'0'+data.getDate():data.getDate()
	let H = data.getHours()<10?'0'+data.getHours():data.getHours()
	let time = y+m+D+H
	 return time
}
function objKeySort(obj){
	let newkey = Object.keys(obj).sort();
　　//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
	let newObj = {};//创建一个新的对象，用于存放排好序的键值对
	for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
		newObj[newkey[i]] = encodeURIComponent(obj[newkey[i]]);//向新创建的对象中按照排好的顺序依次增加键值对
		let regex = new RegExp('%20', 'gi');
		newObj[newkey[i]]=newObj[newkey[i]].replace(regex, `+`)
	}
	return newObj;//返回排好序的新对象
}
function stringify(obj) {
   //定义一个空数组
   let ary = [];
   let str;
   //对象的遍历操作
   for (var i in obj) {
	   //将对象名push到数组里
	   ary.push(i);
	   //对象的值
	   ary.push(`=${obj[i]}&`);
   }
   //将数组转变成字符串
   str = ary.join('');
   //将字符串最后一个&符剪切走  
   str=str.slice (0,str.length-1);
	   return str; 
}
Vue.prototype.compileStr=(code)=>{ //对字符串进行加密       
	  let c=String.fromCharCode(code.charCodeAt(0)+code.length);
		for(var i=1;i<code.length;i++)
		{      
			c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));
		}   
		return escape(c);   
 }
 // let keyStr = 'H5671827346HHHIU'
 // console.log(MD)
 Vue.prototype.key = MD.encrypt(MD.uuid)
 Vue.prototype.decrypt = MD.decrypt
 Vue.prototype.objKeySort = objKeySort
 Vue.prototype.stringify = stringify
 uniRequest.defaults.baseURL = baseUrl
 uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
 Vue.config.productionTip = false
 // console.log(uniRequest.defaults)
 uniRequest.defaults.headers.common['uuid'] = uuid()
 Vue.prototype.uniRequest = uniRequest
 Vue.prototype.uuid = 
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

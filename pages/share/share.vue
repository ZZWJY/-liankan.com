<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: 1,
				iosTimer: undefined,
				adTimer: undefined
			}
		},
		created(){
			// fetch('liankd://').then(res=>{
			// 	console.log(res)
			// }).catch(err=>{
			// 	console.log(err)
			// })
			 var browser = this.BrowserInfo();
			 if(browser.isIphone){
				 this.openApp('liankd://',(res)=>{
				 	if(res==0){
				 		window.location = "https://apps.apple.com/cn/app/%E5%BF%85%E6%9C%AC%E6%90%9C%E7%B4%A2/id1472462782"
				 	}
				 })
			 }else{
				 this.openApp('com.juxin.chainkd',(res)=>{
				 	if(res==0){
				 		window.location = "https://apps.apple.com/cn/app/%E5%BF%85%E6%9C%AC%E6%90%9C%E7%B4%A2/id1472462782"
				 	}
				 })
			 }
				
			// if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
			// 	var loadDateTime = new Date();
			// 	window.location = "liankd://";//schema链接或者universal link
			// 	this.iosTimer = setTimeout(()=>{
			// 		if(this.data == 1){
			// 			// console.log(1)
			// 			// console.log(this.Timer)
			// 			var timeOutDateTime = new Date();
			// 			if (timeOutDateTime - loadDateTime > 2000) {
			// 				window.location = "https://apps.apple.com/cn/app/%E5%BF%85%E6%9C%AC%E6%90%9C%E7%B4%A2/id1472462782"; //ios下载地址  
			// 			} else {
			// 				window.close();
			// 			}
			// 		}
			// 	},4000);
			// 	// var t1=window.setInterval(()=>{}, 1000);
			// 	// console.log(t1)
			// } else if (navigator.userAgent.match(/android/i)) {
			// 	var state = null;
			// 	try {
			// 		window.location = 'com.juxin.chainkd'; //schema链接或者universal link
			// 		this.adTimer = Window.setTimeout(()=>{
			// 			window.location = "https://apps.apple.com/cn/app/%E5%BF%85%E6%9C%AC%E6%90%9C%E7%B4%A2/id1472462782"; //android下载地址  
			// 		}, 4000);
			// 		console.log(this.adTimer)
			// 	} catch (e) {}
			// }
		},
		onHide(){
			clearTimeout(this.iosTimer)
			// console.log(this.iosTimer)
			
			clearTimeout(this.adTimer)
		},
		methods: {
			 BrowserInfo() {
				  var json = {
					userAgent: navigator.userAgent.toLowerCase(),
					isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
					isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
					isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
					isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
				  }
			  return json;
			},
			openApp (openUrl, callback){
			    //检查app是否打开
			    function checkOpen(cb){
			        var _clickTime = +(new Date());
			        function check(elsTime) {
			            if ( elsTime > 3000 || document.hidden || document.webkitHidden) {
			                cb(1);
			            } else {
			                cb(0);
			            }
			        }
			        //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
			        var _count = 0, intHandle;
			        intHandle = setInterval(function(){
			            _count++;        
			            var elsTime = +(new Date()) - _clickTime;
			            if (_count>=100 || elsTime > 3000 ) {
			                clearInterval(intHandle);
			                check(elsTime);
			            }
			        }, 20);
			    }
			   
			    //在iframe 中打开APP
			 //    var ifr = document.createElement('iframe');
				// ifr.setAttribute('src', openUrl);  
				// ifr.setAttribute('style', 'display:none');
				window.location = openUrl;
			    if (callback) {
			      //客户端检测微信直接跳应用宝链接
			     
			      //使用微链接
			      checkOpen(function(opened){
						callback && callback(opened);
			      });
			    }
			    
			    // document.body.appendChild(ifr);   
			    // setTimeout(function() {
			    //     document.body.removeChild(ifr);
			    // }, 2000);  
			
			}
		}
	}
</script>

<style>

</style>

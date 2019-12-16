<template>
	<scroll-view :class="['container1',is_updown==true?'is_down':'']" :style="[is_H5?'height:calc(100vh - 170rpx - 50px)':'min-height:100vh']" :show-scrollbar="false" >
		<!-- <button open-type="getUserInfo"/> -->
		<!-- <uni-tab :tabData="tabData" :tabCur="tabCur" @change='toggle' class="uni-tab" :style="is_H5?'top: 80rpx':'top: 0rpx;'" :trundleX="tabCur" :size="80"></uni-tab> -->
		<view>
			<view style="width: 95%;">
				<QSTabs :current="tabCur" autoCenterMode="window" :tabs="tabData" minWidth="60" @change="toggle" space="20" activeColor="#2A2A2A" />
			</view>
			<!-- <view style="10%">
				<view class="add" :style="is_H5?'top: 22rpx':'top: 18rpx'" v-if="is_H5">
					<image src="../../static/img/home_increase@3x.png"  style="width: 30rpx;height:30rpx;" @tap="channel"></image>
				</view>
			</view> -->
		</view>
		<view  class="container1Bottom" >
			<swiper  :style="is_H5?'min-height:calc(100vh - 160rpx - 90rpx)':'min-height:100vh'" :duration="400" :current="currentTab" @change="swiperTab" @touchstart="touchStart"
			 @touchend="toucheEnd" class="swiper-no-swiping">
			<!-- //:style="is_H5?'min-height: 1050rpx;':'min-height:85vh'" -->
				<swiper-item  v-for="(item,i) in tabData" :key="i" >
					<!-- <view class="seleCity" v-if="is_city" @click="showCity">
						 <image src="../../static/img/home_local@3x.png"></image>
						 <text> 点击选择其他城市</text>	
					</view> -->
					<Tab
					:tabData="tabData[tabCur].child_list" 
					:tabCur="Atlas" @change='toggleAtlas' 
					class="tab" :trundleX="Atlas" :type="3" 
					:size="76" 
					v-if="item.child_list.length>0"
					 :style=""></Tab>
					<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="loadMore(0)" @scroll="scroll" @touchstart="startX" @touchend="endY" v-if="item.child_list.length==0">
						<!-- <view style="width: 100%;height: 80upx;"></view> -->
						<view class='content' >
							<view class='card'>
								<image class="loadingTop" v-if="showTopLoadding['showTopLoadding'+i]" src="../../static/img/loading4.gif"></image>
								<view :class="['refer',dataflag['dataflag'+i]?'referheght':'']" v-if="dataflag['dataflag'+i]" >为您推荐{{total}}条信息</view>
								<home-recom  :content="top_list['top_list'+i]" @change="indexChange" ></home-recom>
								<home-recom  :content="content['content'+i]" @change="indexChange" ></home-recom>
							</view>
						</view>
						<!-- {{content['content'+i].length}} -->
						<uLi-load-more :status="status['status'+i]" v-if="show['show'+i]"></uLi-load-more>
					</scroll-view>
				</swiper-item>
			</swiper>
			<login-Pop  :is_token="token" @login='islogin'></login-Pop>
			<pop-like class="poplike" v-if="recom" @change="showPop"></pop-like>
		</view>
	</scroll-view>
</template>
<script>
	import QSTabs from '@/components/QS-tabs/QS-tabs.vue';
	// import amap from '../../common/amap-wx.js'
	import uniTab from "@/components/hanneil-tab/tab.vue"
	import Tab  from "@/components/tab/tab.vue"
	import loginPop from "@/components/loginpop/loginpop.vue"
	import popLike from "@/components/model/popLike.vue"
	import sha1 from "sha1"
	import homeRecom from "@/components/homeRecom/homeRecom.vue"
	import uLiLoadMore from "@/components/uLi-load-more/uLi-load-more.vue"
	var startX = 0
	export default {
		data() {
			return {
				tabCur: 0,
				tabData: [],
				//["推荐", "区块链", "股票", "理财", "时政"]
				recom: false,
				cur: 0,
				limit: 12,
				page: 1,
				content:[],
				timestamp: new Date().getTime().toString().slice(0,-3),
				// api_key: "E985CF8AB82A92A76540587C2556ABE0",
				content: {
					content0: [],
					content1:[],
					content2:[],
					content3:[],
					content4:[],
					content5:[]
				},
				
				// content6:[1],
				is_H5: true,
				is_top: false,
				dataflag: {
					dataflag0: false, //控制是否为你推荐的信息，
					dataflag1: false,
					dataflag2: false,
					dataflag3: false,
					dataflag4: false,
					dataflag5: false,
				},
				is_updown: false ,//是否处于下拉当中
				currentTab: 0, //sweiper所在页
				pages: [], //第几页存储 
				maxshow: 0 ,// 最高滑到的数
				status: {
					status0: 'more' ,//显示加载更多
					status1: 'more',
					status2: 'more',
					status3: 'more',
					status4: 'more',
					status5: 'more',
				},
				show: {
					show0: false,
					show1: false,
					show2: false,
					show3: false,
					show4: false,
					show5: false,
				},
				showTopLoadding:{
					showTopLoadding0: false, //是否显示下拉刷新的loadding
					showTopLoadding1: false,
					showTopLoadding2: false,
					showTopLoadding3: false,
					showTopLoadding4: false,
					showTopLoadding5: false,
				},
				total: 0,
				token:false,
				scrollTop: undefined,
				start: '',
				showTop: false,
				top_list:{
					top_list0:[]
				},
				child_list: {
					// child_list: []
					//标题二级分类列表
				},
				Atlas:0 ,//图集2级列表的索引值tab
				curT:0,//图集2级列表的索引值
				// amapPlugin: null,  //高德地图的配置
				city: '',
				is_city: false,
			}
		},
		onLoad(option){
			if(!this.is_H5){
				uni.getLocation({
					altitude: true,
					success(res) {
						console.log(res)
					}
				})
			}else{
				// console.log(1)
				this.getLocation()
				
				// console.log(this.tabData)
			}
			this.city = '北京'
			this.initType()
		},
		
		 bindGetUserInfo (e) {
		    console.log(e.detail.userInfo)
		 },
		onPullDownRefresh() {
			// console.log(11)
			
		},
		onShow(){
			// console.log(1)
			// if(this.getStorage('is_reg') == 1){
			// 	this.recom = true
			// }
			// if(this.getStorage('token')!=''){
			// 	this.token = true
			// }else{
			// 	this.token = false
			// }
		},
		watch:{
			tabCur(){
				console.log(this.tabData)
				this.cur = this.tabCur
				if(this.tabData[this.cur].child_list.length>0){
					this.is_top = true
				}else{
					this.is_top = false
				}
				this.dataflag['dataflag'+this.cur] = false
				this.showTopLoadding['showTopLoadding'+this.cur] = false
				if(this.cur==1){
					this.is_city = true
				}else{
					this.is_city = false
				}
				
				if(this.content['content'+this.cur]==undefined||this.content['content'+this.cur].length==0){
						this.init()
				}
			},
			// token(){
			curT(){
				
			},
			// }
		},
		methods: {
			showPop(data){
				this.recom = data
			},
			showCity(){
				uni.navigateTo({
					url: "/pages/city/city"
				})
			},
			channel(){
				// console.log(11)
				uni.navigateTo({
					url: '/pages/channel/channel'
				});
			},
			toggle(data){
				console.log(data)
				this.tabCur = data
				// this.cur = data.index
				this.currentTab = data
			},
			touchStart(e) {
				// console.log(e)
				if (this.currentTab == 0) {
					 startX = e.changedTouches[0].pageX
				}
			},
			toggleAtlas(index){
				// console.log(index
				this.Atlas = index.index
			},
			startX(e){
				this.start = e.changedTouches[0].clientY
			},
			islogin(data){
				console.log(data)
				this.token = data
			},
			endY(e){
				// console.log(this.scrollTop)
				if((e.changedTouches[0].clientY-this.start>40)&&(this.scrollTop<20||this.scrollTop==undefined)){
					this.limit = 8
					if(this.is_updown == false){
						this.is_updown = true
						this.showTopLoadding['showTopLoadding'+this.cur] = true
						// if(this.cur==1){
						// 	this.initcity()
						// }else{
							this.init()
						// }
						
					}
				}else{
					
				}
			},
			swiperTab: function(e) {
				var index = e.detail.current //获取索引
				if (this.tabData.length <= 5) {
					// this.$refs.navTab.navClick(index)
					this.tabCur = index
				} else {
					// this.$refs.navTab.longClick(index)
					this.tabCur = index
				}
			},
			swiperTabCur(e){
				this.curT = e.detail.current
			},
			scroll(e){
				this.scrollTop = e.detail.scrollTop
				// console.log(this.scrollTop)
			},
			initType(){
				this.uniRequest.get("/v1/get-cate.html",{
					data:{
						is_rec: 1,
						type: "1"
					}
				}).then(res=>{
					// for(var w=0;w<res.data.data.length;w++){
					// 	if(res.data.data[w].cate_id!=4){
					// 		this.tabData.push(res.data.data[w])
					// 	}
					// }
					// this.tabData.splice(1,0,{name: this.city,child_list:[]})
					for(var m=0;m<res.data.data.length;m++){
						if(res.data.data[m].cate_id!=4&&res.data.data[m].child_list==0){
							this.tabData.push(res.data.data[m])
						}
					}
					for(var z=0;z<this.tabData.length;z++){
						if(this.child_list['child_list'+z]==undefined){
							this.$set(this.child_list,'child_list'+z,this.tabData[z].child_list)
						}
					}
					console.log(this.tabData)
					uni.setStorageSync('citySort',this.tabData)
					this.init()
				})
			},
			toucheEnd(e) {
				
				if (e.changedTouches[0].pageX - startX > 120 && this.currentTab < 0) {
					uni.switchTab({
						url: '../home/home'
					})
				}
			},
			loadMore(i){
			
				this.show['show'+i] = true
				this.limit = 8
				this.status['status'+i] = "loading"
				this.init(i)
			},
			getLocation(){ 
			  if (navigator.geolocation){ 
			    navigator.geolocation.getCurrentPosition(this.showPosition,this.showError); 
			  }else{ 
			     console.log(您的llq不支持地理定位)
			  } 
			} ,
			showPosition(position){
			   // console.log(position); 
			   var lat = position.coords.latitude; //纬度 
			   var lag = position.coords.longitude; //经度 
			   console.log('纬度:'+lat+',经度:'+lag); 
			} ,
			// showError(error){ 
			//   switch(error.code) { 
			//     case error.PERMISSION_DENIED: 
			//       console.log("定位失败,用户拒绝请求地理定位"); 
			//       break; 
			//     case error.POSITION_UNAVAILABLE: 
			//       console.log("定位失败,位置信息是不可用"); 
			//       break; 
			//     case error.TIMEOUT: 
			//       console.log("定位失败,请求获取用户位置超时"); 
			//       break; 
			//     case error.UNKNOWN_ERROR: 
			//       console.log("定位失败,定位系统失效"); 
			//       break; 
			//   } 
			//   this.city = "北京"
			// } ,
			// initcity(){
			// 	let data = new Date() //Number(this.random_code.slice(1))
			// 	// console.log(data.getTime())
			// 	let y = data.getFullYear().toString()
			// 	let m = (data.getMonth()+1)<10?('0'+(data.getMonth()+1)):(data.getMonth()+1)
			// 	let D = data.getDate()<10?'0'+data.getDate():data.getDate()
			// 	let H = data.getHours()<10?'0'+data.getHours():data.getHours()
			// 	let time = y+m+D+H
				
			// 	let params = {
			// 		city: this.city,
			// 		now_time: this.now_time(),
			// 		page: this.page
			// 	}
			// 	let twoparams = this.objKeySort(params)
			// 	let threeparams = this.stringify(twoparams)
			// 	let sign = sha1(this.api_key+threeparams).toUpperCase()
			// 	params.sign = sign
			// 	this.uniRequest.post("/v1/city-data.html",params).then(res=>{
			// 		// console.log(res)
			// 		let datas = res.data.data.news_list
			// 			// console.log(datas)
						
			// 				if(this.content['content'+this.cur]!=undefined&&this.content['content'+this.cur].length>0){
			// 					for (var z=0;z<this.content['content'+this.cur].length;z++){
			// 						for(var h=0;h<datas.length;h++){
			// 							if(this.content['content'+this.cur].id == datas[h].id){
			// 								datas.splice(h,1)
			// 								// console.log(h)
			// 								h = h-1
			// 							}
			// 						}
			// 					}
			// 				}
			// 				// console.log(datas)
			// 				// console.log(this.content,datas)
			// 				//置顶数据
			// 				this.top_list['top_list'+this.cur] = res.data.data.top_list
			// 				if(res.data.data.top_list!=undefined&&res.data.data.top_list.length>0){
			// 					this.showTop = true
			// 				}else{
			// 					this.showTop = false
			// 				}
			// 				if(this.is_updown == false){
			// 					if(this.content['content'+this.cur]==undefined){
			// 						// this.content['content'+this.cur] = []
			// 						setTimeout(()=>{
			// 							this.$set(this.content,'content'+this.cur,datas)
			// 						},200)
									
			// 						// console.log(this.content)
			// 					}else{
			// 						setTimeout(()=>{
			// 							this.content['content'+this.cur] = this.content['content'+this.cur].concat(datas)
			// 						},200)
									
			// 					}
								
			// 					// console.log(this.content['content'+this.cur])
								
			// 				}else{
			// 					this.content['content'+this.cur].unshift( ...datas )
			// 				}
			// 			console.log(datas)
						
			// 			this.total = datas.length
			// 			if(this.limit == 8&&res.data.data.length==8){
			// 				this.status['status'+i] = "more"
			// 			}
			// 			if(this.limit == 8&&res.data.data.length<8){
			// 				this.status['status'+i] = 'noMore'
			// 			}
			// 			// cosnole.log(this.content)
			// 			this.showTopLoadding['showTopLoadding'+this.cur] = false
			// 		if(this.is_updown){
						
			// 			this.dataflag['dataflag'+this.cur] = true
			// 			setTimeout(()=>{
			// 				this.dataflag['dataflag'+this.cur] = false
			// 				this.is_updown = false
			// 			},1500)
			// 		}
			// 	})
			// },
			init(i){
				// console.log(1)
				// console.log(this.limit)
				let data = new Date() //Number(this.random_code.slice(1))
				// console.log(data.getTime())
				let y = data.getFullYear().toString()
				let m = (data.getMonth()+1)<10?('0'+(data.getMonth()+1)):(data.getMonth()+1)
				let D = data.getDate()<10?'0'+data.getDate():data.getDate()
				let H = data.getHours()<10?'0'+data.getHours():data.getHours()
				let time = y+m+D+H
				// console.log(this.tabData)
				// console.log(this.cur)
				let params = {
					// cate_id	是	string	对应的分类ID
					// limit	是	string	显示数量
					// timestamp	是	string	时间戳 （精确到秒）
					// page	是	string	页数
					// now_time	是	string	签名时间
					// sign	是	string	签名
					
					cate_id: (this.tabData[this.cur].child_list.length>0)?this.tabData[this.cur].child_list[this.curT].cate_id:this.tabData[this.cur].cate_id,
					es_type: (this.tabData[this.cur].child_list.length>0)?this.tabData[this.cur].child_list[this.curT].es_type:this.tabData[this.cur].es_type,
					limit: this.limit,
					// timestamp: this.timestamp,
					page: this.page,
					now_time: time
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				console.log(this.decrypt(this.key),this.key)
				let sign = sha1(this.decrypt(this.key)+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post("/v1/home-news.html",params,{
					// headers:{
					// 	'Authorization': this.getStorage('token'),
					// 	// 'content-type': 'application/x-www-form-urlencoded'
					// }
					
				}).then(res=>{
						let datas = res.data.data.news_list
						// console.log(datas)
						let min_video = res.data.data.min_video_list
						if(this.content['content'+this.cur]!=undefined&&this.content['content'+this.cur].length>0){
							for (var z=0;z<this.content['content'+this.cur].length;z++){
								for(var h=0;h<datas.length;h++){
									if(this.content['content'+this.cur].id == datas[h].id){
										datas.splice(h,1)
										// console.log(h)
										h = h-1
									}
								}
							}
						}
						let num = Math.ceil(Math.random()*3+5)
						// console.log(num)
						if(this.tabData[this.cur].child_list.length==0){
							datas.splice(num,0,min_video)
						}
						this.top_list['top_list'+this.cur] = res.data.data.top_list
						if(res.data.data.top_list!=undefined&&res.data.data.top_list.length>0){
							this.showTop = true
						}else{
							this.showTop = false
						}
						if(this.is_updown == false){
							if(this.tabData[this.cur].child_list.length==0){
								if(this.content['content'+this.cur]==undefined){
									// this.content['content'+this.cur] = []
									setTimeout(()=>{
										this.$set(this.content,'content'+this.cur,datas)
									},100)
									
									// console.log(this.content)
								}else{
									setTimeout(()=>{
										this.content['content'+this.cur] = this.content['content'+this.cur].concat(datas)
									},100)
									
								}
							}else{
								if(this.content['content'+this.cur]==undefined){
									this.content['content'+this.cur] = {}
									if(this.content['content'+this.cur]['list'+this.curT]==undefined ){
										setTimeout(()=>{
											this.$set(this.content['content'+this.cur],'list'+this.curT,datas)
										},100)
									}
								}else{
									setTimeout(()=>{
										this.content['content'+this.cur]['list'+this.curT] = this.content['content'+this.cur]['list'+this.curT].concat(datas)
									},100)
								}
								
							}
							// console.log(this.content['content'+this.cur])
							console.log(this.content)
							
						}else{
							if(this.tabData[this.cur].child_list.length==0){
								this.content['content'+this.cur].unshift( ...datas )
							}else{
								this.content['content'+this.cur]['list'+this.curT].unshift(...datas)
							}
							
						}
						// console.log(datas)
						
						this.total = datas.length
						if(this.limit == 8&&res.data.data.length==8){
							this.status['status'+i] = "more"
						}
						if(this.limit == 8&&res.data.data.length<8){
							this.status['status'+i] = 'noMore'
						}
						// cosnole.log(this.content)
						this.showTopLoadding['showTopLoadding'+this.cur] = false
					if(this.is_updown){
						
						this.dataflag['dataflag'+this.cur] = true
						setTimeout(()=>{
							this.dataflag['dataflag'+this.cur] = false
							this.is_updown = false
						},1500)
					}
					// console.log(datas)
				})
			},
			objKeySort(obj) {//排序的函数
			    var newkey = Object.keys(obj).sort();
			　　//先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
			    var newObj = {};//创建一个新的对象，用于存放排好序的键值对
			    for (var i = 0; i < newkey.length; i++) {//遍历newkey数组
			        newObj[newkey[i]] = encodeURIComponent(obj[newkey[i]]);//向新创建的对象中按照排好的顺序依次增加键值对
			    }
			    return newObj;//返回排好序的新对象
			},
			stringify(obj) {
			   //定义一个空数组
			   var ary = [];
			   var str;
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
		},
		components:{
			uniTab,
			loginPop,
			popLike,
			homeRecom,
			uLiLoadMore,
			Tab,
			QSTabs
		}
	}
</script>

<style scoped lang="scss">
.add{
	position: absolute;
	right: 0rpx;
	// flex: 1;
	background: #fff;
	width: 80rpx;
	height: 38rpx;
	text-align: center;
	image{
		width: 30rpx;
		height: 30rpx;
	}
}
.container1{
	// margin-top: 90rpx;
	border: 1px solid transparent;
	transition: .5s;
	box-sizing: border-box;
	// display: relative;
	// height: 1074rpx;
	// overflow-y: hidden;
	// overflow-x: hidden;
	// position: relative;
	.refer{
		height:76rpx;
		background:rgba(255,237,239,1);
		text-align: center;
		line-height: 76rpx;
		color: #F03644;
		font-size: 30rpx;
		opacity: 1;
		
	}
	.poplike{
		position: fixed;
		top: 0rpx;
		z-index: 999
	}
	.uni-tab{
		position: fixed;
		z-index: 999;
	}
	.seleCity{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 702rpx;
		height: 80rpx;
		background: #f6f6f6;
		border-radius:37rpx;
		margin-left: 24rpx;
		// opacity:0.04;
		image{
			width: 32rpx;
			height: 36rpx;
		}
		text{
			color: #2A2A2A;
			font-size: 30rpx;
			margin-left: 12rpx;
		}
	}
}
.is_down{
	// top: 0rpx;
}
.container1:before{
	display: table;
	content: '';
}
page {
		background-color: #fff;
	}

	.pagecontent {
		background-color: #ec706b;
		height: 100%;
		overflow: hidden;
	}

	.content {
		width: 100%;
		background: white;
		flex: 1;
	}

	.noCard {
		width: 90%;
		height: 200upx;
		margin: auto;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999999;
		// box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.10);
		border-radius: 10upx;
		font-size: 30rpx;
	}

	/* 顶部标题栏 */
	.page-header {
		background-color: #ec706b;
	}

	.page-header-wrapper {
		flex-direction: row;
		justify-content: center;
		align-items: center;
		height: 100px;
		padding: 0px 20px;
		width: 100%;
		background-color: #ec706b;
	}

	.page-header-left {
		opacity: 0.9;
		float: left;
		padding-top: 20px;
	}

	.logo {
		font-size: 40upx;
		color: #fff;
	}

	.page-header-center {
		flex: 1;
		padding: 0px 30px 0 20px;
		text-align: center;
	}

	.search-input {
		height: 70px;
		font-size: 14px;
		color: #999999;
		text-align: center;
		line-height: 60px;
		border-radius: 100px;
		padding-left: 50px;
		padding-right: 50px;
		background: white;
		padding-top: 10upx;
		padding-bottom: 10upx;
	}

	.page-header-right {
		width: 40px;
		align-items: center;
		float: right;
		margin-top: -50px;
	}

	.uni-icon-camera {
		line-height: 10upx !important;
		display: block !important;
		padding-top: 30upx !important;
	}

	.contribute-icon {
		width: 50px;
		height: 44px;
	}

	.contribute-text {
		font-size: 14px;
		color: #fff;
	}


	.slider {
		flex: 1;
		background-color: #f8f8f8;
	}

	.header {
		background-color: #ec706b;
		width: 100%;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 100;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
	}

	.place {
		background-color: #ec706b;
		height: 120upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.container1Bottom{
		 .loadingTop {
			 width: 75rpx;;
			 height: 50rpx;
			 margin-left: 320rpx;
		 }
	},
	.is_top{
		margin-top: 145rpx;
	}
</style>

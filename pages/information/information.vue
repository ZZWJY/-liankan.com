<template>
	<view :style="showemReply?'height:100vh;overflow: hidden':''">
		<view class="header" v-if="is_H5&&!is_share" >
			<image class="" src="../../static/img/return@3x.png" @click="back"></image>
			<text>文章详情</text>
			<!-- <image src="../../static/img/home_details_more@.png"></image> -->
		</view>
		<view class='details' v-if="data==true" >
			<view >{{info.title||''}}</view>
			<view class="infos">
				<view @tap="goperson(info.media_id)">
					<image :src="info.avatar" alt="">
					<view>
						<text>{{info.author}}</text>
						<text>
							<text>
								<text>{{info.format_time}}</text>
								<text>{{info.read_count|clickCount}} 阅读</text>
							</text>
						</text>
					</view>
				</view>
				<view v-if="info.is_follow==0&&!is_share" @click="togglefollow">关注</view>
				<view class='noFollow' v-if="info.is_follow==1&&!is_share" @click="togglefollow">已关注</view>
			</view>
			<view class="infoBg">
				<image src="../../static/img/home_details_fenge@3x.png"></image>
			</view>
			<view :class="['infoContent',is_share?'is_share':'']">
				<rich-text :nodes="info.content"></rich-text>
				<view class="source">
					<text>来源： </text>
					<text>{{info.author}} 未对原文删改</text>
				</view>
				<!-- <view v-html='info.content'></view> -->
				<view class="sharePop1" v-if="is_share">
					
				</view>
				
			</view>
			<view class="sharePop" v-if="is_share">
				<image class="" src="../../static/img/arrows.png" @tap="toggleshare"></image>
				<view>打开APP阅读全文</view>
			</view>
			<!-- <view class="sharePop1">
				<view class="sharePop2"></view>
			</view> -->
			<view class="jingcai" v-if="rec_list.length>0">
				精彩推荐
			</view>
			<view class="recomed">
				<view class="itemContent" v-for="(item,i) in rec_list" :key="i" @click="goDetails(item.id)" >
					<view>
						<text >{{item.title}}</text>
						<view class="contentread">
							<text>{{item.author}}</text>
							<text class="readtitle">{{item.read_count|clickCount}}阅读</text>
							<!-- <text class='recom'>{{item.format_time}}</text> -->
							<text class='recom' style="color: #F03644;font-weight: bold">APP中打开</text>
						</view>
					</view>
					<view>
						<image :src="item.thumb[0]||'../../static/img/Loading_wenzhang@2x.png'"></image>
						<!-- <image src=""></image> -->
					</view>
				</view>
				<view class="partition"></view>
			</view>
			<login-pop></login-pop>
			<!-- <commot v-if="is_commot&&!is_share" :content="content" @reply="replayDetail" @toggleComlaud = 'toggleComlaud'></commot>
			<view class="noPinlun" v-if="!is_commot&&!is_share">
				<image src="../../static/img/home_details_not_comment@3x.png"></image>
				<text>暂无相关评论，点击抢发首条评论</text>
			</view>
			<uLi-load-more :status="status" v-if="showmore&&!is_share"></uLi-load-more>
			<view :class="['inp',showemReply?'replayFixed':'']" :style="focus==true?('bottom:'+height+'px'):'0'" v-if="!is_share">
				<view >
					<image src="../../static/img/home_details_discuss@3x.png"  v-if="!focus" ></image>
					<input type="text" v-if="!focus" :placeholder="text" @click="PopTop()" :class="(!focus&&showemReply)?'textReply':''" :disabled="true">
					<textarea  :placeholder="text"  v-if="focus" :focus="focus" @blur="outFocus()" :class="[(!focus&&showemReply)?'textReply':'']" 
					:show-confirm-bar="false" :cursor-spacing="cursorSpacing" 
					v-model='value' maxlength="100"  :adjust-position="false"/>
				</view>
				<image src="../../static/img/home_details_collect_not@3x.png"  v-if="!focus&&(info.is_favorite==0)&&!showemReply" @click="toggleCollect"></image>
				<image src="../../static/img/home_details_collect_yes@3x.png"  v-if="!focus&&(info.is_favorite==1)&&!showemReply" @click="toggleCollect"></image>
				<image src="../../static/img/home_details_share@3x.png"  v-if="!focus&&!showemReply" @click="share"></image>
				<text class="" @click.stop="publish" v-if="focus" id="fabiao" :class="value==''?'':'red'" >发表</text>
				
			</view>
			<view class="bg00" v-if="showemReply||showshare&&!is_share"></view>
			<view class="bg01" v-if="focus&&!is_share"></view>
			<view class="share" v-if="showshare&&!is_share">
				<view class="shareType">
					<view>
						<image src="../../static/img/more_friends@3x.png"></image>
						<text>朋友圈</text>
					</view>
					<view>
						<image src="../../static/img/more_wechat@3x.png"></image>
						<text>微信</text>
					</view>
					<view>
						<image src="../../static/img/more_qq@3x.png"></image>
						<text>QQ</text>
					</view>
				</view>
				<view class="shareLine"></view>
				<view @click="closeShare">
					取消
				</view>
			</view>
			<view class="packet" v-if="!is_share">
				<image src="../../static/img/home_details_red_money@3x.png"></image>
			</view>
			<view class="emReplay" v-if="showemReply&&!is_share" @touchmove.stop="true">
				<view>
					<image src="../../static/img/home_details_cancel@3x.png" @click="close"></image>
					<text>回复详情</text>
				</view>
				<scroll-view  scroll-y scroll-left="120" @scrolltolower="replyMore" style="height:calc( 1184rpx - 100rpx - 40rpx - 30px ) ">
					<view  class="emReplayScroll" >
						<view>
							<view>
								{{emReply.member_name}}
							</view>
							<view>{{emReply.content}}</view>
							<view>
								<text>{{emReply.created}}</text>
								<text ></text>
								<view class="right" @click="togglelaud(emReply.id,emReply.member_id)">
									<image :src="emReply.is_laud==1?'../../static/img/home_details_praise_yes@3x.png':'../../static/img/home_details_praise_not@3x.png'"></image>
									<text :class="emReply.is_laud==1?'red':''">{{emReply.laud_num}}</text>
								</view>
							</view>
						</view>
						<view class="cut"></view>
						<view class="allEmReplay">全部回复{{emReply.reply_num}}</view>
						<view class="replayContent" >
							<view class="ReplayItem" v-for="(item,i) in reply_list" :key="i">
								<view>
									{{item.member_name}}
								</view>
								<view><text v-if="item.to_member.member_id!=emReply.member_id"><text style="color:#DA959B">回复</text><text style="font-weight: bold">{{item.to_member.nickname+' '}}</text></text>{{item.content}}</view>
								<view>
									<text>{{item.created}}</text>
									<text @click="replaypop(item.member_name,item.member_id,item.id,item.root_id)">回复TA</text>
									<view class="right" @click="togglelaud(item.id,item.member_id,i)">
										<image :src="item.is_laud==1?'../../static/img/home_details_praise_yes@3x.png':'../../static/img/home_details_praise_not@3x.png'"></image>
										<text :class="item.is_laud==1?'red':''">{{item.laud_num}}</text>
									</view>
								</view>
							</view>
							<uLi-load-more :status="repalyStatus" v-if="showReplayMore"></uLi-load-more>
						</view>
					</view>
				</scroll-view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import loginPop from "@/components/loginpop/loginpop.vue"
	import sha1 from "sha1"
	// import commot from "@/components/commot/commot.vue"
	// import uLiLoadMore from "@/components/uLi-load-more/uLi-load-more.vue"
	export default {
		data() {
			return {
				id: '',
				api_key: 'E985CF8AB82A92A76540587C2556ABE0',
				after: [],
				before: [],
				info:[],
				rec_list: [],
				data: false,
				focus: false,
				fixedTop: 0,
				text: "写评论",
				is_H5: true,
				// message: "",
				reply_type: 1,
				Ready: false,
				dataReady: false,
				cursorSpacing: '15px',
				content: [],
				// useContent:'',
				is_commot: '', //是否显示评论
				emReply: {}, //二级评论信息
				showemReply: false ,//二级弹窗展示
				reply_page:1,
				value:'',
				is_Reply: false  ,//是否为二级评论，
				is_Reply_m: false,  //是否三级评论
				// detailScroll: true,
				coment_page: 1,
				status: "more", //加载更多的数据
				limit: 10,
				showmore: false,
				questComment: true ,//判断是否还有comment数据,
				member_id: "",  //三级评论的数据
				parent_id:'',  //三级评论的数据
				root_id:'',//三级评论的数据
				repalyStatus: "loading",
				showReplayMore: false,
				reply_list: [],
				conment_id: '', //二级回复的root—id
				showshare: false,
				height: '',
				is_share: false,
				scrollTop: 0,
				replayScroll: 0, //点击回复时候的scroll
			}
		},
		onPageScroll(e){
			this.scrollTop = e.scrollTop
		},
		components:{
			// commot,
			// uLiLoadMore,
			loginPop
		},
		onLoad(option) {
			this.id = option.id
			if(option.share!=undefined){
				console.log(11)
				this.is_share = true
			}else{
				this.is_share = false
			}
			this.init()
			uni.onKeyboardHeightChange(res=>{
				console.log(res)
				if(res.height == 0){
					this.height = 0
				}
				if(this.height < res.height){
					this.height = res.height
				}
				// if(this.height>res.height){
				// 	this.height = 0
				// }
			})
			// uni.onWindowResize(res=>{
			// 	// console.log(res)
			// })
		// 	 uni.getSystemInfo({
		//         success: (res)=> {
		// 	console.log(res)
		//             this.windowHeight = res.windowHeight;
		//         }
		//     });    
		},
		onReady(){
			this.Ready = true
		},
		onReachBottom(){
			// console.log(this.content.length,this.limit)
			if(this.content.length>(this.limit-1)){
				this.showmore = true
				++this.coment_page
				this.status = "loading"
				this.initCommot()
			}
			
		},
		filters:{
			clickCount(value){
				if(value>10000){
					value = Math.round(value/1000)/10+"万"
				}
				return value
			},
			timer(value){
				if(value<60){
					if(value<10){
						return "00:0"+value
					}else{
						return "00:"+value
					}
				}else{
					let F = Math.floor(value/60)
					let M = value%60
					if(F<10){
						if(M<10){
							return "0"+F+":"+"0"+M
						}else{
							return "0"+F+":"+M
						}
					}else{
						if(M<10){
							return F+":"+"0"+M
						}else{
							return F+":"+M
						}
					}
				}
			}
		},
		watch:{
			Ready(){
				if(this.Ready&&this.dataReady){
					this.initEvent()
				}
			},
			// showemReply(){
			// 	if(this.showemReply == false){
			// 		uni.pageScrollTo({
			// 			scrollTop: this.replayScroll
			// 		})
			// 	}
			// },
			// dataReady(){
			// 	if(this.Ready&&this.dataReady){
			// 		this.inithistoryAdd()
			// 		this.initEvent()
			// 	}
			// },
			value(){
				console.log(this.value.length)
				if(this.value.length==100){
					
					uni.showToast({
						title: '最多只能输入100个汉字',
						icon: 'none'
					})
				}
			}
			// test(){
			// 	this.message = this.test
			// 	this.useContent = this.test
			// }
		},
		methods: {
			detail(event){
				event.detail={}
			},
			toggleshare(){
				this.is_share = false
			},
			goperson(id){
				uni.navigateTo({
					url:'../personage/personage?media_id='+id
				})
			},
			back(){
				// console.log(this.is_share)
				if(this.is_share == true){
					uni.switchTab({
						url: '../home/home'
					})
				}else{
					uni.navigateBack({
						delta: 1
					})
				}
			},
			replaypop(name,member_id,parent_id,root_id){
				this.value = ''
				this.text = '回复'+name+"："
				this.member_id = member_id
				this.parent_id = parent_id
				this.root_id = root_id
				this.is_Reply_m = true
			},
			PopTop(){
				this.focus = true
				this.text = "输入回复内容"
			},
			goDetails(id){
				// if(!this.is_share){
				// 	uni.navigateTo({
				// 		url:'../../pages/information/information?id='+id
				// 	})
				// }else{
				// 	uni.navigateTo({
				// 		url:'../../pages/information/information?id='+id+'&share=true'
				// 	})
				// }
				uni.showToast({
					title:'app下载地址',
					icon: 'none'
				})
			},
			replyMore(){
				this.showReplayMore = true
				++this.reply_page
				this.initreplay()
			},
			toggleComlaud(i){
				if(this.content[i].is_laud==0){
					
					this.$set(this.content[i],'is_laud',1)//this.content[i].is_laud = 1
					let laud_num = this.content[i].laud_num+1
					this.$set(this.content[i],'laud_num',laud_num)//this.content[i].laud_num = this.content[i].laud_num+1
				}else{
					this.$set(this.content[i],'is_laud',0)//this.content[i].is_laud = 0
					let laud_num = this.content[i].laud_num-1
					this.$set(this.content[i],'laud_num',laud_num)//this.content[i].laud_num = this.content[i].laud_num-1
				}
			},
			closeShare(){
				this.showshare = false
			},
			close(){
				
				this.is_Reply = false
				this.is_Reply_m = false
				this.showemReply=false
				this.text = '写评论'
				
				console.log(this.replayScroll)
			},
			share(){
				this.showshare = true
			},
			replayDetail(data){
				this.is_Reply = true
				this.emReply = data
				this.showemReply = true
				this.text = "回复评论"
				this.reply_list = []
				this.showReplayMore = false
				this.reply_page = 1
				// comment_id	是	string	评论ID
				// page	是	string	页码
				// now_time	是	string	签名时间
				// sign	是	string	签名
				
				// this.focus = true
				this.replayScroll = this.scrollTop
				this.conment_id = data
				this.initreplay(data)
			},
			initEvent(){
				let params = {
					// code	是	string	事件类型 参考下表
					// type	是	string	1=h5 2=APP
					// es_id	是	string	对象ID
					// now_time	是	string	签名时间
					// sign	是	string	签名
					code: 'news_read',
					type: 1,
					es_id: this.info.id,
					now_time: this.now_time()
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.api_key+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post("/v1/event.html",params).then(res=>{
					// console.log(res)
				})
			},
			initreplay(id){
				let params = {
					comment_id: this.conment_id,
					page: this.reply_page,
					now_time: this.now_time()
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.api_key+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post('/v1/comment-detail.html',params).then(res=>{
					
					if(res.data.status == 1){
						if(res.data.data.reply_list.length == 0){
							this.repalyStatus = "noMore"
						}
						this.emReply = res.data.data
						this.reply_list = this.reply_list.concat(res.data.data.reply_list)
						// consoie.log(this.reply_list)
					}
				})
			},
			// input(e){
			// 	// console.log(e)
			// 	this.message = e.detail.value
			// 	this.useContent = e.detail.value
			// 	this.value = e.detail.value
			// 	// console.log(this.message)
			// },
			initCommot(flag){
				// es_id	是	string	数据ID
				// comment_type	是	string	1=资讯，2=视频
				// page	是	string	页码
				// now_time	是	string	签名时间
				// sign	是	string	签名
				let params = {
					es_id: this.info.id,
					comment_type: 1,
					page: this.coment_page,
					now_time: this.now_time()
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				// console.log(this.api_key)
				let sign = sha1(this.api_key+threeparams).toUpperCase()
				params.sign = sign
					this.uniRequest.post("/v1/comment-list.html",params).then(res=>{
						// console.log(res)
						if(res.data.status == 1){
							// this.content = []
							// if(flag){
							// 	this.content = res.data.data
							// 	return false
							// }
							this.content = this.content.concat(res.data.data)
							// console.log(this.content)
							if(this.content.length==0){
								this.is_commot = false
							}else{
								this.is_commot = true
							}
							if(res.data.data.length == this.limit){
								this.status = "more"
							}else{
								this.status = 'noMore'
							}
						}
					})
			},
			gologin(){
				uni.navigateTo({
					url:"../login/login"
				})
			},
			togglelaud(id,member_id,i){
				if(i==undefined){
					member_id = this.emReply.id
				}
				// console.log(this.getStorage('token'))
				// id	是	string	对象ID
				// scene	是	string	1=资讯 2=视频 3=微头条 4=评论
				// to_member_id	是	string	资讯视频的media_id 或者 评论的 member_id
				// now_time	是	string	签名时间
				// sign	是	string	签名
				let params = {
					id,
					to_member_id: member_id,
					scene: 0,
					now_time: this.now_time()
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.api_key+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post("/v1/laud.html",params).then(res=>{
					if(res.data.status == 1){
						if(i==undefined){
							if(this.emReply.is_laud==0){
								this.emReply.is_laud = 1
								this.emReply.laud_num = this.emReply.laud_num+1
							}else{
								this.emReply.is_laud = 0
								this.emReply.laud_num = this.emReply.laud_num-1
							}
						}else{
							if(this.reply_list[i].is_laud==0){
								this.reply_list[i].is_laud = 1
								this.reply_list[i].laud_num = this.reply_list[i].laud_num+1
							}else{
								this.reply_list[i].is_laud = 0
								this.reply_list[i].laud_num = this.reply_list[i].laud_num-1
							}
						}
					}
				})
			},
			outFocus(){
				console.log(1)
				setTimeout(()=>{
					this.focus = false
				},0)
				
				this.message = ""
			},
			togglefollow(){
				uni.showToast({
					title: 'APP中打开',
					icon: 'none'
				})
				// if(this.getStorage("token")==''){
				// 	this.gologin()
				// 	return false
				// }
				// // media_id	是	int	媒体号id, 批量订阅时id是字符串，用逗号隔开
				// // now_time	否	string	签名时间
				// // sign	否	string	签名
				// let params = {
				// 	media_id: this.info.media_id,
				// 	now_time: this.now_time()
				// }
				// let twoparams = this.objKeySort(params)
				// let threeparams = this.stringify(twoparams)
				// let sign = sha1(this.api_key+threeparams).toUpperCase()
				// params.sign = sign
				// this.uniRequest.post('/v1/follow-media.html',params).then(res=>{
				// 	// console.log(res)
				// 	if(res.data.status == 1){
				// 		if(this.info.is_follow==0){
				// 			this.info.is_follow = 1
				// 			uni.showToast({
				// 				title:'关注成功',
				// 				icon: "none"
				// 			})
				// 		}else{
				// 			this.info.is_follow = 0
				// 			uni.showToast({
				// 				title:'取消关注成功',
				// 				icon: "none"
				// 			})
				// 		}
				// 	}
				// })
			},
			toggleCollect(){
				let params = {
					// es_id	是	string	对象ID
					// scene_type	是	string	类型 1=资讯 2=视频
					// now_time	是	string	签名时间
					// sign	是	string	签名
					es_id: this.info.id,
					scene_type: 1,
					now_time: this.now_time()
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.decrypt(this.key)+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post("/v1/favorite.html",params).then(res=>{
					if(res.data.status == 1){
						if(this.info.is_favorite==0){
							this.info.is_favorite = 1
							uni.showToast({
								title: "收藏成功",
								icon: "none"
							})
						}else{
							this.info.is_favorite = 0
							uni.showToast({
								title: "取消收藏成功",
								icon: "none"
							})
						}
					}
				})
			},
			//历史新增
			inithistoryAdd(){
				let params = {
					es_id: this.info.id,
					scene_type: 1,
					now_time: this.now_time()
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.decrypt(this.key)+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post('/v1/history-create.html',params).then(res=>{
					// console.log(res)
				})
			},
			publish(){
				
				// if(this.getStorage("token")==''){
				// 	this.gologin()
				// 	return false
				// }
				let params = {
					id: this.info.id,
					content: this.trim(this.value),
					reply_type: this.reply_type,
					comment_type: 1,
					now_time: this.now_time()
				}
				if(this.is_Reply == true && !this.is_Reply_m){
					params.to_member_id = this.emReply.member_id,
					params.parent_id = this.emReply.id,
					params.root_id = this.emReply.id
					params.reply_type = 2
				}
				if(this.is_Reply == true && this.is_Reply_m){
					params.to_member_id = this.member_id,
					params.parent_id = this.parent_id,
					params.root_id = this.root_id
					params.reply_type = 2
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.decrypt(this.key)+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post("/v1/release-news-comment.html",params).then(res=>{
					// console.log(res)
					if(res.data.status == 1){
						uni.showToast({
							title:"评论成功",
							icon: "none"
						})
						this.value = ''
						if(this.is_Reply == true){
							this.reply_page = 1
							this.reply_list = []
							this.initreplay(this.emReply.comment_id)
							return false
						}
						this.coment_page = 1
						this.content = []
						this.initCommot()
						if(res.data.data.length==0){
							this.repalyStatus = 'noMore'
						}
					}else{
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
					// this.message = ""
				})
			},
			//初始化详情
			init(){
				let params = {
					id: this.id,
					now_time: this.now_time()
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.decrypt(this.key)+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post('/v1/news-detail.html',params).then(res=>{
					console.log(res)
					this.data = true
					
					if(res.data.status == 1){
						// console.log(res)
						this.dataReady = true //数据请求成功
						this.info = res.data.data.info
						this.initCommot()
						// uni.setNavigationBarTitle({
						// 	title: this.info.title
						// })
						this.after = res.data.data.after
						this.before = res.data.data.before
						this.rec_list = res.data.data.rec_list
						let richtext=  res.data.data.info.content;
						let regex = new RegExp('<img', 'gi');
						richtext= richtext.replace(regex, `<img style="width: 100%;margin-top:5px;border-radius:10px"`)
						let Pregex = new RegExp("<p",'gi');
						richtext = richtext.replace(Pregex,'<p style="font-size: 16px;color: #2A2A2A"')
						let Pregez = new RegExp("<iframe",'gi')
						richtext = richtext.replace(Pregez,'<iframe style="width:100%;" allowfullscreen="false" ebkitallowfullscreen="false" mozallowfullscreen="false"')
						// let Pregex = new RegExp("<p class='pgc-img'",'gi');
						// richtext = richtext.replace(Pregex,'<p class="pgc-img" style="margin-top:10rpx"')
						let HBregex = new RegExp("<html><body>",'gi')
						richtext = richtext.replace(HBregex,'')
						let hBegex = new RegExp("</body></html>",'gi')
						richtext = richtext.replace(hBegex,'')
						this.info.content = richtext;
						this.inithistoryAdd()
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.header{
		padding: 0 24rpx;
		display: flex;
		align-items: center;
		height: 80rpx;
		border-bottom: 1rpx solid #E7E7E7;
		image:nth-child(1){
			width: 22rpx;
			height: 34rpx;
		}
		text{
			margin-left: 258upx;
			font-size: 36rpx;
			color: #2A2A2A;
			font-weight: bold;
		}
		
	}
	.details{
		width: 100vw;
		padding: 18rpx 24rpx 0rpx 24rpx;
		margin-bottom: 100rpx;
		box-sizing: border-box;
		// min-height: 100vh;
		view:nth-child(1){
			color: #2A2A2A;
			font-size: 46rpx;
			font-weight: bold ;
		}
		.infos{
			margin-top: 44rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;;
			view:nth-child(1){
				display: flex;
				image{
					width: 70rpx;
					height:70rpx;
					border-radius: 50%;;
				}
				>view{
					margin-left: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					>text:nth-child(1){
						color: #2A2A2A;
						font-size: 28rpx;
					}
					>text:nth-child(2){
						color: #B8B8B8;
						font-size: 24rpx;
						text:nth-child(2){
							margin-left: 15rpx;
						}
					}
				}
			}
			>view:nth-child(2){
				width: 112rpx;
				height: 56rpx;
				background: #F03644;
				border-radius: 10rpx;
				text-align: center;
				color: #fff;
				line-height: 56rpx;
				font-size: 26rpx;
			}
			.noFollow{
				background:rgba(245,246,247,1) !important;
				border-radius:10px;
				color: #CACACA !important;
				font-size: 26rpx;
			}
		}
		.infoBg{
			margin-top: 40rpx;
			image{
				width: 280rpx;
				height: 30rpx;
			}
		}
		.infoContent{
			margin-top: 36rpx;
			rich-text img{
				max-width: 700rpx !important;
			}
		}
		.sharePop1{
			width:100%;
			height:316rpx;
			position: absolute;
			bottom:0;
			// filter:blur(8rpx);
			background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1));
		
		}
		.sharePop{
			width:100%;
			height:140rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			// align-items: center;
			
			box-sizing: border-box;
			
			// filter:blur(8rpx);
			// filter:blur(18px);
			image:nth-child(1){
				width: 32rpx;
				height: 32rpx;
			}
			view:nth-child(2){
				width:640rpx;
				height:80rpx;
				background:rgba(240,54,68,1);
				box-shadow:4rpx 6rpx 8rpx 0rpx rgba(240,54,68,0.21);
				border-radius:50rpx;
				text-align: center;
				line-height: 80rpx;
				color: #FFF;
				font-size: 30rpx;
				margin-top: 30rpx;
			}
		}
		.is_share{
			height: 1100rpx;
			overflow: hidden;
			position: relative;
		}
		.source{
			margin-top: 38rpx;
			color: #B8B8B8;
			font-size: 30rpx;
		}
		.jingcai{
			color: #2A2A2A;
			font-size: 36rpx;
			font-weight: bold;
			margin-top: 82rpx;
		}
		.recomed{
			.itemContent{
				padding-top: 20rpx; 
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #E7E7E7;
				padding-bottom: 30rpx;
				>view:nth-child(1){
					width: 442rpx;
					color: #2A2A2A;
					font-size: 34rpx;
					font-weight: 400;
					.contentread{
						display:flex;
						font-weight: 400;
						font-size: 24rpx;
						margin-top: 28rpx;
						color:#B8B8B8;
						.readtitle{
							margin-left: 10rpx;
						}
						.recom{
							margin-left: 10rpx;
						}
					}
				}
				>view:nth-child(2){
					width: 228rpx;
					height: 156rpx;
					background: #3F536E;
					border-radius: 10rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
				}
			}
			.itemContent:nth-last-child(1){
				border-bottom: none;
			}
			.partition{
				width: 750rpx;
				height: 20rpx;
				background: rgba(250,250,250,1);
				position: relative;
				top: -6rpx;
				left: -24rpx;
			}
		}
		.noPinlun{
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 74rpx;
			margin-bottom: 25rpx;
			padding-bottom: 90rpx;
			
			text{
				color: #2A2A2A;
				font-size: 30rpx;
				margin-top: 28rpx;
			}
			image{
				width: 114rpx;
				height: 138rpx;
			}
		}
		.inp{
			// margin-top: 100rpx;
			width: 750rpx;
			background: rgba(255,255,255,1);
			display: flex;
			align-items: center;
			// padding-bottom: 10rpx;
			// margin-top: 10rpx;
			padding: 10rpx 24rpx;
			box-sizing: border-box;
			// margin-bottom: 10rpx;
			position: fixed;
			bottom: 0;
			// margin-left: 10rpx;
			left: 0;
			// padding-left: 24rpx;
			// padding-top: 23rpx;
			z-index: 380 !important;
			// transition: bottom .5s;
			background: #fff;
			view:nth-child(1){
				position: relative;
				image{
					width: 28rpx;
					height: 30rpx;
					position: absolute;
					top: 30rpx;
					left: 30rpx;
					z-index: 99;
				}
				input{
					width: 504rpx;
					height: 80rpx;
					padding-left: 80rpx;
					box-sizing: border-box;
					font-size: 28rpx;
					color: #B8B8B8;
					// padding-top: 10rpx;
					background:rgba(245,246,247,1);
					border-radius:10rpx;
				}
				textarea{
					box-sizing: border-box;
					// padding-left: 80rpx;
					margin-top: 10rpx;
					width: 600rpx;
					height: 160rpx;
					padding: 24rpx;
					background:rgba(245,246,247,1);
					border-radius:10rpx;
					font-size: 28rpx;
					color: #2A2A2A;
					padding-top: 25rpx;
				}
				.focus{
					width: 600rpx;
					height: 160rpx;
					padding: 24rpx;
				}
				.textReply{
					width: 702rpx;
				}
			}
			image:nth-child(2){
				width: 42rpx;
				height: 42rpx;
				margin-left: 58rpx
			}
			image:nth-child(3){
				width: 42rpx;
				height: 42rpx;
				margin-left: 50rpx;
			}
		}
		// .fixed{
		// 	position: fixed;
		// 	bottom: 0rpx;
		// 	left: 0;
		// 	padding-left: 24rpx;
		// 	padding-top: 23rpx;
		// 	z-index: 380 !important;
		// }
		#fabiao{
			display: inline-block;
			font-size: 32rpx;
			color: #B8B8B8;
			line-height: 160rpx;
			margin-left: 34rpx;
		}
		.red{
			color: #F03644 !important;
			font-weight: bold;
		}
	}
	.bg00{
		background: rgba(0,0,0,.5);
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 320;
	}
	.bg01{
		background: rgba(0,0,0,.5);
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 360
	}
	.replayFixed{
		margin-top: 0rpx;
		position: fixed;
		bottom: 0;
		// margin-left: 10rpx;
		left: 0;
		z-index: 340 !important;
	}
	.share{
		width: 100vw;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 400;
		background: #fff;
		height: 370rpx;
		border-radius:20px 20px 0px 0px;
		.shareType{
			display: flex;
			justify-content: space-between;
			padding: 42rpx 62rpx 24rpx;
			view{
				display:flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				image{
					width: 110rpx;
					height: 110rpx;
				}
				text{
					font-size: 26rpx;
					color: #2a2a2a;
					font-weight: 400;
					margin-top: 20rpx;
				}
			}
		}
		.shareLine{
			margin-top: 40rpx;
			width: 100%;
			height: 1px;
			background: #E7E7E7;
			// margin-top: 64rpx;
		}
		>view:nth-child(3){
			margin-top: 22rpx;
			color: #F03644;
			font-size: 32rpx;
			text-align: center;
		}
	}
	.packet{
		width: 320rpx;
		height: 118rpx;
		position: fixed;
		bottom: 100rpx;
		right: 0;
		image{
			width: 320rpx;
			height: 118rpx;
		}
	}
	.emReplay{
		height: 1184rpx;
		width: 750rpx;
		border-radius:20px 20px 0px 0px;
		background: #fff;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		// z-index: 1000;
		z-index: 330;
		padding: 40rpx;
		box-sizing: border-box;
		view:nth-child(1){
			image{
				width: 30rpx;
				height: 28rpx;
			}
			>text{
				font-size: 36rpx;
				color: #2A2A2A;
				margin-left: 234rpx;
			}
		}
		.emReplayScroll{
			>view:nth-child(1){
				flex: 1;
				color: #2A2A2A;
				margin-top: 40rpx;
				>view:nth-child(1){
					font-size: 30rpx;
					margin-bottom: 20rpx;
					font-weight: bold;
				}
				view:nth-child(2){
					font-size: 32rpx;
				}
				>view:nth-child(3){
					width: 100%;
					margin-top: 20rpx;
					>text:nth-child(1){
						font-size: 24rpx;
						color: #B8B8B8;
					}
					>text:nth-child(2){
						font-size: 24rpx;
						display: inline-block;
						padding: 6rpx 30rpx;
						margin-left: 15rpx;
						// background: #F0F0F0;
						border-radius: 22rpx;
					}
					>view:nth-child(3){
						image{
							width: 32rpx;
							height: 34rpx;
							position: relative;
							top: 4rpx;
						}
						text{
							font-size: 26rpx;
							color: #b8b8b8;
							margin-left: 15rpx;
						}
						.red{
							color: #F03644;
						}
					}
				}
			}
		}
		.cut{
			margin-top: 22rpx;
			width:750rpx;
			height:20rpx;
			background:rgba(250,250,250,1);
			position: relative;
			left: -40rpx;
		}
		.allEmReplay{
			font-size: 30rpx;
			font-weight: bold;
			color: #2A2A2A;
			margin-top: 24rpx;
		}
		.replayContent{
			margin-top: 25rpx;
			.ReplayItem{
				flex: 1;
				color: #2A2A2A;
				margin-top: 40rpx;
				>view:nth-child(1){
					font-size: 30rpx;
					margin-bottom: 20rpx;
					font-weight: bold;
				}
				view:nth-child(2){
					font-size: 32rpx;
					font-weight: 400;
				}
				>view:nth-child(3){
					width: 100%;
					margin-top: 20rpx;
					>text:nth-child(1){
						font-size: 24rpx;
						color: #B8B8B8;
					}
					>text:nth-child(2){
						font-size: 24rpx;
						display: inline-block;
						padding: 6rpx 30rpx;
						margin-left: 15rpx;
						background: #F0F0F0;
						border-radius: 22rpx;
					}
					>view:nth-child(3){
						image{
							width: 32rpx;
							height: 34rpx;
							position: relative;
							top: 4rpx;
						}
						text{
							font-size: 26rpx;
							color: #b8b8b8;
							margin-left: 15rpx;
						}
						.red{
							color: #F03644;
						}
					}
				}
			}
		}
	}
</style>

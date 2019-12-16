<template>
	<view class='meInfo' :style="es_type==3?'':'padding-bottom:50px' ">
		<scroll-view class="comment" v-if="is_commot&&es_type!=3">
			<commot  :content="commentList" @reply="replayDetail" @toggleComlaud="toggleComlaud"></commot>
			<!-- <u-li-load-more></u-li-load-more> -->
		</scroll-view>
		<view class="noPinlun" v-if="!is_commot&&es_type!=3">
			<image src="../../static/img/home_details_not_comment@3x.png"></image>
			<text>暂无相关评论，点击抢发首条评论</text>
		</view>
		<view :class="['inp',es_type==3?'atlas':'']" :style="(is_focus==true?('bottom:'+height+'px;'):'bottom:0;')+(inpshow==false?'opacity:0':'opacity:1')" >
			<image src="../../static/img/home_details_discuss@3x.png" v-if="es_type!=3"></image>
			<image src="../../static/img/home_details_discuss@3x1.png"  v-if="es_type==3"></image>
			<view class="model">
				<input type="text" class="" :disabled="true"  :placeholder="text" placeholder-style="color:#B8B8B8;font-size:28rpx;" @click="showFixed" v-if="!is_focus"  :class="(!is_focus&&showemReply)?'textReply':''" :style="es_type==3?'background:#2A2A2D;font-size:28rpx;':''">
				<textarea  :placeholder="text1"  v-if="is_focus" :focus="is_focus" @blur="outFoucs" v-model="value" :show-confirm-bar="false" maxlength="100" :adjust-position="false"/>
				<!-- {{info.is_laud}} -->
				<image src='../../static/img/video_support_not@3x.png' v-if="!is_focus&&info.is_laud==0&&!showemReply" @click="toggleLaud(info.id,info.media_id,0)" ></image>
				<image src='../../static/img/home_details_praise_yes@3x.png' v-if="!is_focus&&info.is_laud==1&&!showemReply" @click="toggleLaud(info.id,info.media_id,0)"></image>
				<!-- <image src="../../static/img/video_support_not@3x%20(1).png"></image> -->
				<image src="../../static/img/home_details_share@3x.png" v-if="!is_focus&&!showemReply" class="right" @click="share"></image>
				<text v-if="is_focus" :class="value==''?'':'red'" @click="public">发表</text>
			</view>
		</view>
		<u-li-load-more :status="repalyStatus" v-if="showReplayMore1"></u-li-load-more>
		<view class="bg00" v-if="showemReply||showshare"></view>
		<view class="bg01" v-if="is_focus"></view>
		<view class="share" v-if="showshare">
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
		<!-- <view class="packet">
			<image src="../../static/img/home_details_red_money@3x.png"></image>
		</view> -->
		<view class="emReplay" v-if="showemReply">
			<view>
				<image src="../../static/img/home_details_cancel@3x.png" @click="close"></image>
				<text>回复详情</text>
			</view>
			<scroll-view :scroll-y="true" scroll-left="-120" @scrolltolower="replyMore" style="height:calc( 1184rpx - 100rpx - 40rpx - 30px ) " :show-scrollbar='false'>
			<view class="emReplayScroll">
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
							<text @click="replaypop(item.member_name,item.member_id,item.id,item.root_id)">{{item.reply_num==0?'':item.reply_num}}回复</text>
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
		</view>
	</view>
</template>

<script>
	import commot from "@/components/commot/commot.vue"
	import sha1 from "sha1"
	import uLiLoadMore from "@/components/uLi-load-more/uLi-load-more.vue"
	export default {
		data() {
			return {
				is_focus: false,
				text: "写评论",
				text1: '写下你的评论',
				// height: '',
				value: '', 
				reply_type: 1,
				commentList:[],
				
				is_commot:'',
				page: 1,
				repalyStatus: 'loading', ///noMreo
				showReplayMore1: false, //一级评论上拉加载显示
				showReplayMore: false, //二级评论加载显示
				comment_id: '', 
				is_Reply: false,
				showemReply: false, //二级弹窗显示
				emReply: {},
				is_Reply_m: false,
				member_id: '',
				parent_id:'',
				reply_list:[],
				root_id:'',
				showshare: false,
			}
		},
		onLoad(){
			uni.getStorageSync('token')
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
		},
		props:['info','es_id',"comment_type",'loadMore','scene','es_type','height','inpshow'],
		watch:{
			value(){
				if(this.value.length == 300){
					uni.showToast({
						title: "不能超过300个字",
						icon: "none"
					})
				}
			},
			info(){
				// console.log(this.info)
			},
			loadMore(){
				// console.log(this.loadMore)
				if(this.loadMore==true){
					++this.page
					this._initComment()
				}
				
			},
			es_id(){
				console.log(this.es_id)
			}
		},
		mounted(){
			this.es_id
			this._initComment()
		},
		methods:{
			outFoucs(){
				setTimeout(()=>{
					this.value = ""
					this.is_focus = false
				},0)
			},
			gologin(){
				uni.navigateTo({
					url:"../login/login"
				})
			},
			close(){
				this.is_Reply = false
				this.is_Reply_m = false
				this.showemReply=false
				this.text = '写评论'
				this.$emit("hidden",false)
			},
			toggleComlaud(i){
				if(this.commentList[i].is_laud==0){
					
					this.$set(this.commentList[i],'is_laud',1)//this.content[i].is_laud = 1
					let laud_num = this.commentList[i].laud_num+1
					this.$set(this.commentList[i],'laud_num',laud_num)//this.content[i].laud_num = this.content[i].laud_num+1
				}else{
					this.$set(this.commentList[i],'is_laud',0)//this.content[i].is_laud = 0
					let laud_num = this.commentList[i].laud_num-1
					this.$set(this.commentList[i],'laud_num',laud_num)//this.content[i].laud_num = this.content[i].laud_num-1
				}
			},
			replyMore(){
				this.showReplayMore = true
				++this.reply_page
				this.initreplay()
			},
			replayDetail(id){
				this.is_Reply = true
				// this.emReply = id
				this.showemReply = true
				this.text = "回复评论"
				this.reply_list = []
				this.showReplayMore = false
				// comment_id	是	string	评论ID
				// page	是	string	页码
				// now_time	是	string	签名时间
				// sign	是	string	签名
				
				// this.focus = true
				this.$emit("hidden",true)
				this.conment_id = id
				this.initreplay(id)
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
					}
				})
			},
			share(){
				if(this.getStorage("token")==''){
					this.gologin()
					return false
				}
				this.showshare = true
			},
			closeShare(){
				this.showshare = false
			},
			togglelaud(id,member_id,i){
				// console.log(this.getStorage('token'))
				console.log(11)
				if(this.getStorage("token")==''){
					this.gologin()
					return false
				}
				if(i==undefined){
					member_id = this.emReply.id
				}
				// id	是	string	对象ID
				// scene	是	string	1=资讯 2=视频 3=微头条 4=评论
				// to_member_id	是	string	资讯视频的media_id 或者 评论的 member_id
				// now_time	是	string	签名时间
				// sign	是	string	签名
				let params = {
					id,
					to_member_id: member_id,
					scene: this.scene,
					now_time: this.now_time()
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.api_key+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post("/v1/laud.html",params).then(res=>{
					if(res.data.status == 1){
						// console.log(1)
						if(i==undefined){
							
							if(this.emReply.is_laud==0){
								this.$set(this.emReply,'is_laud',1)
								let laud_num = this.emReply.laud_num+1
								this.$set(this.emReply,'laud_num',laud_num)
								// this.emReply.is_laud = 1
								// this.emReply.laud_num = this.emReply.laud_num+1
							}else{
								this.$set(this.emReply,'is_laud',0)
								let laud_num = this.emReply.laud_num-1
								this.$set(this.emReply,'laud_num',laud_num)
								// this.emReply.is_laud = 0
								// this.emReply.laud_num = this.emReply.laud_num-1
							}
						}else{
							if(this.is_Reply==true){
								console.log(1)
								if(this.reply_list[i].is_laud==0){
									this.$set(this.reply_list[i],'is_laud',1)
									let laud_num = this.reply_list[i].laud_num+1
									this.$set(this.reply_list[i],'laud_num',laud_num)
									// this.emReply.reply_list[i].is_laud = 1
									// this.emReply.reply_list[i].laud_num = this.emReply.reply_list[i].laud_num+1
								}else{
									this.$set(this.reply_list[i],'is_laud',0)
									let laud_num = this.reply_list[i].laud_num-1
									this.$set(this.reply_list[i],'laud_num',laud_num)
									// this.emReply.reply_list[i].is_laud = 0
									// this.emReply.reply_list[i].laud_num = this.emReply.reply_list[i].laud_num-1
								}
							}
						}
					}
				})
			},
			toggleLaud(){
				// sign	是	string	签名
				let params = {
					id: this.info.id,
					to_member_id: this.info.media_id,
					scene: 2,
					now_time: this.now_time()
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.api_key+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post("/v1/laud.html",params).then(res=>{
					console.log(res)
					this.$emit("toggleinfolaud")
					
				})
			},
			public(){
				// console.log(uni.getStorageInfoSync(),this.getStorage('useInfo'))
				if(this.getStorage("token")==''){
					this.gologin()
					return false
				}
				let params = {
					id: this.info.id,
					content: this.trim(this.value),
					reply_type: this.reply_type,
					comment_type: this.comment_type,
					now_time: this.now_time()
				}
				if(this.is_Reply == true && !this.is_Reply_m){
					// to_member_id	是	int	给谁评论的 用户ID
					// parent_id	是	int	父评论id
					// root_id	是	int	根评论id
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
				let sign = sha1(this.api_key+threeparams).toUpperCase()
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
						// console.log(this.is_Reply)
						// this.questComment = true //没有评论的时候开启请求接口
						this.page = 1
						this.commentList = []
						this._initComment()()
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
			replaypop(name,member_id,parent_id,root_id){
				this.value = ''
				this.text = '回复'+name+"："
				this.text1 = '回复'+name+"："
				this.member_id = member_id
				this.parent_id = parent_id
				this.root_id = root_id
				this.is_Reply_m = true
			},
			_initComment(){
				console.log(this.es_id)
				let params = {
					// es_id	是	string	数据ID
					// comment_type	是	string	1=资讯，2=视频， 3=图集 4=小视频
					// page	是	string	页码
					// now_time	是	string	签名时间
					// sign	是	string	签名
					es_id: this.es_id,
					comment_type: 2,
					page: this.page,
					now_time: this.now_time()
					
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.api_key+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post("/v1/comment-list.html",params).then(res=>{
					console.log(res)
					this.commentList = this.commentList.concat(res.data.data)
					this.$emit('toggleLoadMroe',false)
					// console.log(res.data.data.length)
					if(res.data.data.length<10){
						this.repalyStatus = 'noMore'
					}
					if(this.commentList.length==0){
						this.is_commot = false
					}else{
						this.is_commot = true
					}
					if(this.commentList.length<10){
						this.showReplayMore1 = false
					}else{
						this.showReplayMore1 = true
					}
				})
			},
			showFixed(){
				this.is_focus = true
			},
		},
		components:{
			commot,
			uLiLoadMore
		},
	}
</script>

<style scoped lang="scss">
	view{
		//
		scroll-view::-webkit-scrollbar {  
		  display: none;  
		} 
		.atlas{
			background: rgba(28,28,30,.95) !important;
		}
		.inp{
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 390;
			padding: 12rpx 24rpx;
			background: #fff;
			box-sizing: border-box;
			width: 100vw;
			min-height: 50px;
			transition: .3s;
			// box-sizing: border-box;
			// position: relative;
			>image{
				position: absolute;
				top: 40rpx;
				left: 50rpx;
				width: 28rpx;
				height: 28rpx;
			}
			.model{
				display: flex;
				align-items: center;;
				input{
					width: 504rpx;
					height: 76rpx;
					background:rgba(245,246,247,1);
					border-radius:10px;
					padding-left: 72rpx;
					box-sizing: border-box;
				}
				textarea{
					width: 600rpx;
					height: 160rpx;
					background:rgba(243,244,245,1);
					border-radius:10px;
					margin-right: 34rpx;
					padding: 20rpx 24rpx;
					color: #2A2A2A;
					font-size: 32rpx;
					box-sizing: border-box;
				}
				.textReply{
					width: 702rpx;
				}
				text{
					font-size: 32rpx;
					color: #B8B8B8;
				}
				.red{
					color: #F03644
				}
				image:nth-child(2){
					width: 42rpx;
					height: 42rpx;
					margin-left: 56rpx;
				}
				image:nth-child(3){
					width: 42rpx;
					height: 42rpx;
					margin-left: 56rpx;
				}
			}
		}
		.hidden{
			overflow: hidden;
		}
		.comment{
			padding: 34rpx 24rpx;
			box-sizing: border-box;
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
			z-index: 380
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
			z-index: 370;
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
	}
	
</style>

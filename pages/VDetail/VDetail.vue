<template>
	<view :class="['Detail',hidden==true?'hidden':'']" >
		<view class="info">
			<view class="video">
				<video :src="info.play_url" controls :direction="90"></video>
				<image src="../../static/img/video_return_white@3x.png" @click="back" v-if="is_H5"></image>
				<!-- <image src="../../static/img/home_details_more@3x.png" v-if="is_H5"></image> -->
			</view>
			<view class="title">
				<view class="">{{info.title}}</view>
				<view>{{info.desc}}</view>
				<view class="option">
					<view>
						<image src="../../static/img/video_broadcast_quantity@3x.png"></image>
						<text>{{info.play_count}}次播放</text>
					</view>
					<view>
						<image src="../../static/img/video_support_quantity@3x.png"></image>
						<text>点赞{{info.laud_count}}</text>
					</view>
					<view>
						<image src="../../static/img/video_comment_quantity@3x.png"></image>
						<text>评论{{info.comment_num}}</text>
					</view>
				</view>
			</view>
			<view class="author">
				<view>
					<image :src="info.avatar"></image>
					<text>{{info.author}}</text>
				</view>
				<view class="GZ" v-if="info.is_follow==0" @click="toggleFollow">关注</view>
				<view class="NGZ" v-if="info.is_follow==1"  @click="toggleFollow">已关注</view>
			</view>
		</view>
		<view class="cut">
			
		</view>
		<view class="recom" v-if="rec_list.length>0">
			精彩推荐
		</view>
		<recom :content="rec_list" v-if="rec_list.length>0"></recom>
		<login-pop></login-pop>
		<!-- <view class="cut" style="margin-top: 0"></view> -->
		<!-- <replay  
		:height="height"
		:info="info" 
		:es_id='es_id' 
		:comment_type="2" 
		:loadMore="loadMore" 
		@toggleLoadMroe="toggleLoadMroe" 
		@hidden="togglehidden"
		@toggleinfolaud = "toggleinfolaud"
		:scene="0"
		></replay> -->
	</view>
</template>

<script>
	import recom from "@/components/homeRecom/homeRecom.vue"
	import loginPop from "@/components/loginpop/loginpop.vue"
	// import replay from "@/components/replay/replay.vue"
	import sha1 from "sha1"
	export default {
		data() {
			return {
				es_id: "",
				info: {},
				rec_list: [],
				page: 1,
				is_commot: '',
				loadMore: false,
				hidden: false,
				height: '',
				is_H5: true
			}
		},
		onLoad(option){
			this.es_id = option.id
			// console.log(this.es_id)
			this._initDetail()
			// this._initComment()
		},
		onShow(){
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
		onReachBottom(){
			this.loadMore = true
		},
		components:{
			// replay,
			recom,
			loginPop
		},
		methods: {
			// id	是	string	ID
			// now_time	是	string	签名时间
			// sign	是	string	签名
			_initDetail(){
				// sign	是	string	签名
				let params = {
					id: this.es_id,
					now_time: this.now_time()
					// to_member_id: member_id,
					// scene: 4,
					// now_time: this.now_time()
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.decrypt(this.key)+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post("/v1/video-detail.html",params).then(res=>{
					console.log(res)
					this.info = res.data.data.info
					console.log(this.info.video_type)
					if(this.info.video_type=='qq'||this.info.video_type=='tt'){
						this.initVideoUrl(this.info.video_type,this.info.vid,this.info.play_url)
					}
					this.rec_list = res.data.data.rec_list
					for(var index=0;index<this.rec_list.length;index++){
						this.rec_list[index].recomVideo = 1  //为了不和首页的es——type冲突，这里加一个标识
					}
					// console.log(this.rec_list)
					this.inithistoryAdd()
				})
			},
			toggleinfolaud(){
				if(this.info.is_laud == 0){
					this.$set(this.info,'is_laud',1)
					// console.log(this.info)
					// this.info.is_laud = 1
				}else{
					
					this.$set(this.info,'is_laud',0)
					// this.info.is_laud = 0
				}
			},
			inithistoryAdd(){
				// es_id	是	string	对象ID
				// scene_type	是	string	1=资讯 2=视频
				// now_time	是	string	签名时间
				// sign	是	string	签名
				// if(!this.getStorage('token')){
				// 	return false
				// }
				let params = {
					es_id: this.info.id,
					scene_type: 2,
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
			togglehidden(flag){
				this.hidden = flag
			},
			close(){
				this.is_Reply = false
				this.is_Reply_m = false
				this.showemReply=false
				this.text = '写评论'
			},
			initVideoUrl(type,vid,url){
				// type	是	string	qq=腾讯视频， tt=头条视频
				// vid	是	string	视频的vid
				// video_url	是	string	播放地址-需要拿来请求第三方
				// now_time	是	string	签名时间
				let params = {
					type: type,
					vid: vid,
					video_url: url,
					now_time: this.now_time()
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.decrypt(this.key)+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post("/v1/video-url.html",params).then(res=>{
					console.log(res)
					this.info.play_url = res.data.data.video_url
					console.log(this.info)
				})
			},
			toggleFollow(){
				// media_id	是	int	媒体号id
				// now_time	否	string	签名时间
				// sign	否	string	签名
				let params = {
					media_id: this.info.media_id,
					now_time: this.now_time()
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.decrypt(this.key)+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post('/v1/follow-media.html',params).then(res=>{
					console.log(res)
					if(res.data.status == 1){
						if(this.info.is_follow==0){
							this.info.is_follow = 1
						}else{
							this.info.is_follow = 0
						}
					}
				})
			},
			toggleLoadMroe(flag){
				this.loadMore = flag
			},
			back(){
				uni.navigateBack({
					delta: 1
				})
			}
		},
		
	}
</script>

<style scoped lang="scss">
	.hidden{
		height: 100vh;
		overflow: hidden;
	}
	.Detail{
		padding-bottom: 90rpx;
		box-sizing: border-box;
		.info{
			.video{
				width: 100vw;
				height: 442rpx;
				position: relative;
				image:nth-child(2){
					position: absolute;
					top: 32rpx;
					left: 24rpx;
					width: 22rpx;
					height: 30rpx;
					z-index: 99;
				}
				image:nth-child(3){
					width: 40rpx;
					height: 10rpx;
					position: absolute;
					right: 24rpx;
					top: 32rpx;
					z-index: 99;
				}
				video{
					width: 100%;
					height: 100%;
				}
			}
			.title{
				padding: 30rpx 24rpx 46rpx;
				>view:nth-child(1){
					font-size: 40rpx;
					color: #2A2A2A;
					font-weight: bold;
				}
				>view:nth-child(2){
					font-size: 28rpx;
					color:#B8B8B8;
					margin-top: 10rpx;
				}
				>view:nth-child(3){
					display: flex;
					>view{
						margin-right: 30rpx;
						image{
							width: 26rpx;
							height: 26rpx;
						}
						text{
							margin-left: 6rpx;
							font-size: 26rpx;
							color: #B8B8B8;
						}
					}
				}
			}
			.author{
				// margin-left: 24rpx;
				width: 702rpx;
				height: 100rpx;
				background: rgba(255,246,247,1);
				border-radius: 10rpx;
				padding: 0 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				view:nth-child(1){
					display: flex;
					align-items: center;
					image{
						width: 64rpx;
						height: 64rpx;
						border-radius: 50%;
					}
					text{
						font-size: 28rpx;
						color: #2A2A2A;
						margin-left: 18rpx;
					}
				}
			}
			.GZ{
				width:112rpx;
				height:52rpx;
				background:rgba(240,54,68,1);
				border-radius:10rpx;
				color: #fff;
				font-size: 26rpx;
				text-align: center;
				line-height: 52rpx;
			}
			.NGZ{
				width:112rpx;
				height:52rpx;
				background:rgba(245,230,232,1);
				border-radius:10rpx;
				color: #DDBCBC;
				font-size: 26rpx;
				text-align: center;
				line-height: 52rpx;
			}
		}
		.cut{
			width:750rpx;
			height:20rpx;
			background:rgba(245,246,247,1);
			margin-top: 46rpx;
		}
		.recom{
			margin-top: 32rpx;
			margin-left: 24rpx;
			margin-bottom: 40rpx;
			font-weight: bold;
			font-size: 36rpx;
			color: #2a2a2a;
		}
		
	}
</style>

<template>
	<scroll-view class="container"  scroll-y="scroll" :style="is_H5?'height: calc(100vh - 90rpx - 50px)':'height:calc(100vh - 90rpx)'" :show-scrollbar="false" @scrolltolower="tolower">
		<view class='item' v-for="(item,i) in videoList" :key="i" @tap='g_Detail(item.id)'>
			<view> 
				<view @tap="togglevideo(i)">
				<!-- 	<video 
					:direction="90"
					:src="item.is_play?item.play_url:''" 
					class="videoItem"  
					controls   
					:id="'videoItem'+i" 
					@timeupdate="pregass($event,item)" @waiting='warning' 
					:show-fullscreen-btn="false"
					:poster="item.thumb[0]"
					:page-gesture="false"
					:autoplay="item.is_play"
					:enable-progress-gesture="false"
					v-if="is_H5"
					></video> -->
				<!-- 	<video
					:direction="90"
					:src="item.is_play?item.play_url:''" 
					class="videoItem"  
					controls   
					:id="'videoItem'+i" 
					@timeupdate="pregass($event,item)" @waiting='warning' 
					:show-fullscreen-btn="false"
					:poster="item.thumb[0]"
					:page-gesture="false"
					:autoplay="item.is_play"
					:enable-progress-gesture="false"
					v-if="!is_H5"
					></video> -->
					<image class="videoItem" :src="item.thumb[0]" mode="aspectFill"></image>
				</view>
				<view class="title">
					{{item.title}}
				</view>
				<image src="../../static/img/video_stop@3x.png" class="autoPlay"></image>
				<view class="clickTimer">
					<text>{{item.play_count|clickCount}}播放 </text>
					<text ></text>
					<text> {{item.duration|timer}}</text>
				</view>
			</view>
			<view class="option" >
				<view>
					<view class="is_hot" v-if="item.is_hot==1">
						<image src="../../static/img/home_bghot1.png"></image>
						<text>热门</text>
					</view>
					<view class="info">
						<image :src="item.avatar"></image>
						<text>{{item.author}}</text>
					</view>
				</view>
				<view>
					<view class="comment">
						<image src="../../static/img/video_comment@3x.png"></image>
						<text>评论</text>
					</view>
					<view class="tranmit">
						<image src="../../static/img/video_share@3x.png"></image>
					</view>
				</view>
			</view>
			<view class="cut"></view>
		</view>
		<uLi-load-more :status="status" v-if="show"></uLi-load-more>
	</scroll-view>
</template>

<script>
	import uLiLoadMore from "@/components/uLi-load-more/uLi-load-more.vue"
	export default {
		data() {
			return {
				showVideo: true,
				is_play: true,
				duration: 500,
				indicatorDots: true,
				autoplay: true,
				is_H5: this.getStorage('is_H5'),
				times:[],
				show: true,
				windowHeight: 0,
				is_H5: uni.getStorageSync('is_H5')
				// status: 'more'
			};
		},
		components:{
			uLiLoadMore
		},
		props: ['videoList','status'],
		watch:{
			videoList(){
				// console.log(this.videoList)
				if(this.videoList!=undefined&&this.videoList.length>8){
					this.show = true
				}else{
					this.show = false
				}
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
		methods: {
			transition(e){
				// console.log(e)
			},
			tolower(){
				// this.status = 'loading'
				this.$emit("loadMroe",'loading')
			},
			// scrollTop(e){
			// 	// console.log(11)
			// 	let query = this.createSelectorQuery();
			// 	for (let i = 0; i < this.videoList.length; i++) {
			// 		query.select(`#videoItem${i}`).boundingClientRect()
			// 	}
			// 	query.exec(function (res) {
			// 		this.items = res;
			// 		// console.log(res)
			// 		console.log(this.windowHeight)
			// 		for(var j=0;j<res.length;j++){
			// 			if(res[j].top>-200&&res[j].top<1500){
			// 				// console.log(uni.createVideoContext('videoItem'+j),res[j].top)
			// 				// this.$emit('toggleplay',{index:j,flag:true})
			// 				// let query = this.createSelectorQuery().select(`#videoItem${j}`).boundingClientRect()
			// 				// console.log(query)
			// 				// uni.createVideoContext('videoItem'+j).seek(0)
			// 			}else{
			// 				this.$emit('toggleplay',{index:j,flag:false})
			// 			}
			// 		}
			// 		// this.scrollByIndex(this.tabCur, false)
			// 	}.bind(this));
			// 	// console.log(this.videoList[i])
			// 	// console.log(e)
			// },
			togglevideo(i){
				this.$emit('toggleplay',{index:i,flag:true})
			},
			pregass(e,item){
				// console.log(e)
			},
			warning(){
				// console.log(1)
			},
			g_Detail(id){
				uni.navigateTo({
					url:"../../pages/VDetail/VDetail?id="+id
				})
			},
		},
		onHide(){
			this.showVideo = false
		},
		onShow(){
			this.showVideo = true
		}
		
	}
</script>

<style scoped lang="scss">
	.container{
		.item{
			>view:nth-child(1){
				position: relative;
				>view:nth-child(1){
					width: 750rpx;
					height: 422rpx;
					background: url(../../static/img/Loading_video@3x.png) no-repeat;
					background-size: 100% 100%;
					>.videoItem{
						width: 750rpx;
						height: 422rpx;
					}
				}
				.title{
					position: absolute;
					left: 22rpx;
					top: 22rpx;
					color: #fff;
					font-size: 36rpx;
					width: 654rpx;
				}
				.autoPlay{
					width: 96rpx;
					height: 96rpx;
					position: absolute;
					left: 308rpx;
					top: 180rpx;
				}
				.clickTimer{
					box-sizing: border-box;
					// width:220rpx;
					height:42rpx;
					background:rgba(0,0,0,.2);
					border-radius:4rpx;
					// opacity:0.29;
					position: absolute;
					bottom: 62rpx;
					right: 36rpx;
					padding: 0 14rpx;
					display: flex;
					align-items: center;
					padding:3rpx  4rpx;
					
					// z-index: 50;
					text{
						color: #fff;
						font-size: 24rpx;
						line-height: 42rpx;
					}
					text:nth-child(1){
						// width: 116rpx;
						text-align: left
					}
					text:nth-child(2){
						height: 20rpx;
						width: 1rpx;
						background:#fff;
						margin-left: 4rpx;
						margin-right: 4rpx;
					}
					text:nth-child(3){
						flex: 1;
						text-align: right
					}
				}
			}
			.option{
				display: flex;
				justify-content: space-between;
				padding: 24rpx 24rpx;
				box-sizing: border-box;
				
				>view:nth-child(1){
					display: flex;
					align-items: center;
					text{
						color: #2A2A2A;
						font-size: 26rpx;
						margin-left: 6rpx;
					}
					image{
						position: relative;
						top: 6rpx;
					}
					.is_hot{
						image:nth-child(1){
							width: 22rpx;
							height: 30rpx;
						}
						text{
							color: #F03644
						}
					}
					.info{
						margin-left: 32rpx;
						image:nth-child(1){
							width: 40rpx;
							height: 40rpx;
							border-radius: 50%;
							position: relative;
							top: 12rpx;
						}
					}
				}
				>view:nth-child(2){
					display: flex;
					align-items: center;
					image{
						position: relative;
						top: 6rpx;
					}
					.comment{
						margin-right: 56rpx;
						image{
							width: 40rpx;
							height: 40rpx;
						}
						text{
							color: #848484;
							font-size: 26rpx;
							margin-left: 6rpx;
						}
					}
					.tranmit{
						image{
							width: 40rpx;
							height: 40rpx;
						}
					}
				}
			}
			.cut{
				width:750rpx;
				height:10rpx;
				background:rgba(138,147,157,0.09);
			}
		}
	}
</style>
<style scoped>
	.videoItem >>> .uni-video-cover-play-button{
		background: url(../../static/img/video_stop@3x.png) no-repeat;
		width: 96rpx;
		height: 96rpx;
		background-size: 100% 100%;
	}
	.videoItem >>> .uni-video-cover{
		width: 96rpx;
		box-sizing: border-box;
		height: 96rpx;
		top: 160rpx;
		left: 300rpx;
		background-color: transparent;
	}
	.videoItem >>> .uni-video-cover-duration{
		display: none
		
	}
	.videoItem >>> .uni-video-control-button.uni-video-control-button-play{
		position: absolute;
		width: 96rpx;
		height: 96rpx;
		padding:0;
		top: -180rpx;
		left: 300rpx;
		margin:0;
	}
	.videoItem >>> .uni-video-bar{
		overflow: visible;
		background-color: transparent;
	}
	.videoItem >>> .uni-video-control-button.uni-video-control-button-play:after{
		background: url(../../static/img/video_stop@3x.png) no-repeat;
		width: 96rpx;
		height: 96rpx;
		background-size: 100% 100%;
	}
	.videoItem >>> .uni-video-control-button.uni-video-control-button-pause{
		position: absolute;
		width: 96rpx;
		height: 96rpx;
		padding:0;
		top: -180rpx;
		left: 300rpx;
		margin:0;
	}
	.videoItem >>> .uni-video-control-button.uni-video-control-button-pause:after{
		background: url(../../static/img/video_broadcast@3x.png) no-repeat;
		width: 96rpx;
		height: 96rpx;
		background-size: 100% 100%;
	}
	.page-section-spacing >>>  uni-swiper-item{
		height: 600rpx !important;
	}
</style>
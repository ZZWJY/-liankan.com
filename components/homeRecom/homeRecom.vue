<template>
	<view>
		<scroll-view class="Content" >
			<view v-for="(item,i) in content" :key="i" @click='goInform(item.id,item.es_type,item.recomVideo)' >
				<view class="itemContent" v-if="(item.es_type==1&&item.thumb.length<3)||(item.recomVideo==1&&item.thumb.length<3)">
					<view>
						<view>
							<text >{{item.title}}</text>
							<view class="contentread">
								<view class="is_top" v-if="item.is_top==1&&type!=6">
									<image src="../../static/img/home_top@3x.png" class="home_bg"></image>
								</view>
								<text v-if="item.is_top==1&&type!=6" class="hottitle">置顶</text>
								<view v-if="item.mark>0&&item.is_top!=1&&type!=6" class="is_top">
									<image src="../../static/img/home_essay_bao@3x.png" v-if="item.mark == 1"></image>
									<image src="../../static/img/home_essay_re@3x.png" v-if="item.mark == 2"></image>
									<image src="../../static/img/home_essay_wei@3x.png" v-if="item.mark == 3"></image>
									<image src="../../static/img/home_comment_bao@3x.png" v-if="item.mark == 4"></image>
									<image src="../../static/img/home_comment_re@3x.png" v-if="item.mark == 5"></image>
									<image src="../../static/img/home_comment_xiao@3x.png" v-if="item.mark == 6"></image>
								</view>
								<text v-if="item.mark==1&&item.is_top!=1&&type!=6" class="mark1">爆文</text>
								<text v-if="item.mark==2&&item.is_top!=1&&type!=6" class="mark2">热文</text>
								<text v-if="item.mark==3&&item.is_top!=1&&type!=6" class="mark3">微热</text>
								<text v-if="item.mark==4&&item.is_top!=1&&type!=6" class="mark4">爆评</text>
								<text v-if="item.mark==5&&item.is_top!=1&&type!=6" class="mark5">热议</text>
								<text v-if="item.mark==6&&item.is_top!=1&&type!=6" class="mark6">小议</text>
								<text class="author">{{item.author}}</text>
								<text class="readtitle">{{item.read_count|clickCount}}阅读</text>
								<text class="timer" v-if="item.recomVideo!=1">{{item.format_time}}</text>
								<text class="timer" style="color: #F03644;font-weight:bold" v-if="item.recomVideo==1">APP中打开</text>
							</view>
						</view>
						<view>
							<image :src="item.thumb[0]||'../../static/img/home_bg@noIMG.png'" alt="" :lazy-load='true' mode="aspectFill">
								<!-- <image src="../../static/img/home_bg@noIMG.png"></image> -->
							<view class="videoTimer" v-if="item.recomVideo==1">
								<image src="../../static/img/video_broadcast_exhibition@3x.png"></image>
								<text>{{item.duration|timer}}</text>
							</view>
						</view>
					</view>
					<view class="line"></view>
				</view>
				<view class="itemCOntent1" v-if="(item.es_type==1&&item.thumb.length>2)||(item.recomVideo==1&&item.thumb.length>2)">
					<view>{{item.title}}</view>
					<view>
						<view>
							<image :src="item.thumb[0]||'../../static/img/home_bg@3x%20(3).png'" :lazy-load='true' mode="aspectFill"></image>
						</view>
						<view>
							<image :src="item.thumb[1]||'../../static/img/home_bg@3x%20(3).png'" :lazy-load='true' mode="aspectFill"></iamge>
						</view>
						<view>
							<image :src="item.thumb[2]||'../../static/img/home_bg@3x%20(3).png'" :lazy-load='true' mode="aspectFill"></iamge>
						</view>
					</view>
					<view>
						<view class="is_top" v-if="item.is_top==1&&type!=6">
							<image src="../../static/img/home_top@3x.png" class="home_bg"></image>
						</view>
						<text v-if="item.is_top==1&&type!=6" class="hottitle">置顶</text>
						<view v-if="item.mark>0&&item.is_top!=1&&type!=6" class="is_top">
							<image src="../../static/img/home_essay_bao@3x.png" v-if="item.mark == 1"></image>
							<image src="../../static/img/home_essay_re@3x.png" v-if="item.mark == 2"></image>
							<image src="../../static/img/home_essay_wei@3x.png" v-if="item.mark == 3"></image>
							<image src="../../static/img/home_comment_bao@3x.png" v-if="item.mark == 4"></image>
							<image src="../../static/img/home_comment_re@3x.png" v-if="item.mark == 5"></image>
							<image src="../../static/img/home_comment_xiao@3x.png" v-if="item.mark == 6"></image>
						</view>
						<text v-if="item.mark==1&&item.is_top!=1&&type!=6" class="mark1">爆文</text>
						<text v-if="item.mark==2&&item.is_top!=1&&type!=6" class="mark2">热文</text>
						<text v-if="item.mark==3&&item.is_top!=1&&type!=6" class="mark3">微热</text>
						<text v-if="item.mark==4&&item.is_top!=1&&type!=6" class="mark4">爆评</text>
						<text v-if="item.mark==5&&item.is_top!=1&&type!=6" class="mark5">热议</text>
						<text v-if="item.mark==6&&item.is_top!=1&&type!=6" class="mark6">小议</text>
						<text class="author">{{item.author}}</text>
						<text class="readtitle">{{item.read_count|clickCount}}阅读</text>
						<text class="timer">{{item.format_time}}</text>
					</view>
					<view class="line"></view>
				</view>
				<view class="atlas" v-if="item.es_type==2&&item.recomVideo!=1">
					<view>{{item.title}}</view>
					<view>
						<image :src="item.thumb[0]" mode="aspectFill"></image>
						<view class="play" v-if="item.es_type==2">
							<image src="../../static/img/video_stop@3x.png"></image>
						</view>
						<view class="playTimer" v-if="item.es_type==2">{{item.duration|timer}}</view>
						<view class="imgCount" v-if="item.es_type==3">
							<image src="../../static/img/home_img@3x.png" ></image>
							<text>{{item.pic_desc_count}}图</text>
						</view>
					</view>
					
					<view>
						<view class="is_top" v-if="item.is_top==1&&type!=6">
							<image src="../../static/img/home_top@3x.png" class="home_bg"></image>
							<text v-if="item.is_top==1" class="hottitle">置顶</text>
						</view>
						
						<view v-if="item.mark>0&&item.is_top!=1&&type!=6" class="is_top">
							<image src="../../static/img/home_essay_bao@3x.png" v-if="item.mark == 1"></image>
							<image src="../../static/img/home_essay_re@3x.png" v-if="item.mark == 2"></image>
							<image src="../../static/img/home_essay_wei@3x.png" v-if="item.mark == 3"></image>
							<image src="../../static/img/home_comment_bao@3x.png" v-if="item.mark == 4"></image>
							<image src="../../static/img/home_comment_re@3x.png" v-if="item.mark == 5"></image>
							<image src="../../static/img/home_comment_xiao@3x.png" v-if="item.mark == 6"></image>
						</view>
						<text v-if="item.mark==1&&item.is_top!=1&&type!=6" class="mark1">爆文</text>
						<text v-if="item.mark==2&&item.is_top!=1&&type!=6" class="mark2">热文</text>
						<text v-if="item.mark==3&&item.is_top!=1&&type!=6" class="mark3">微热</text>
						<text v-if="item.mark==4&&item.is_top!=1&&type!=6" class="mark4">爆评</text>
						<text v-if="item.mark==5&&item.is_top!=1&&type!=6" class="mark5">热议</text>
						<text v-if="item.mark==6&&item.is_top!=1&&type!=6" class="mark6">小议</text>
						<text>{{item.author}}</text>
						<text>{{item.read_count|clickCount}}阅读</text>
						<text>{{item.format_time}}</text>
					</view>
					<view class="line"></view>
				</view>
			<!-- 	<view class="minVideo" v-if="Object.prototype.toString.call(item)==='[object Array]'&&item[0]!=undefined&&item[0].es_type==4">
					<view class="cut"></view>
					<view class="mintitle">
						<view>
							<image src="../../static/img/small_video@3x.png"></image>
							<text>精彩小视频</text>
						</view>
						<image class="minB" src="../../static/img/more@3x.png"></image>
					</view>
					<scroll-view scroll-x="true" class="scrollX" :show-scrollbar="false">
						<view :style="'width:calc('+item.length*477+'rpx + 24rpx )'" class="Xitem">
							<view  v-for="(video,index) in item" :key=index @tap="gominvideo(item[index])" >
								<image :src="item[index].thumb[0]" mode="aspectFill"></image>
								<image src="../../static/img/small_video_suspend@3x.png"></image>
								<image src="../../static/img/home_video_shadow@3x.png"></image>
								<view class="title">{{item[index].title}}</view>
							</view> -->
							<!-- <view @tap="gominvideo">
								<image :src="item[2].thumb[0]"></image>
								<image></image>
								<image src="../../static/img/home_video_shadow@3x.png"></image>
								<view class="minMroe">
									<image src="../../static/img/home_small_video_more@3x.png"></image>
									<text>查看更多</text>
								</view>
							</view> -->
					<!-- 	</view>
					</scroll-view>
					<view class="btcut"></view>
				</view> -->
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		props: ['content','type'],
		// onReachBottom(){
		// 	console.log(11)
		// },
		watch:{
			content(){
				// console.log(this.content)
				// console.log(this.content)
				// if(this.content.length>6){
				// 	let query = this.createSelectorQuery();
				// 	query.selectAll(`.contentread`).boundingClientRect()
				// 	query.exec(function (res) {
				// 		// this.items = res;
				// 		console.log(res)
				// 		// this.scrollByIndex(this.tabCur, false)
				// 	}.bind(this));
				// }
			}
		},
		// updated(){
		// 	if(this.content.length>6){
		// 		let query = this.createSelectorQuery();
		// 		query.selectAll(`.contentread`).boundingClientRect()
		// 		query.exec(function (res) {
		// 			// this.items = res;
		// 			console.log(res)
		// 			// this.scrollByIndex(this.tabCur, false)
		// 		}.bind(this));
		// 	}
		// },
		methods:{
			goInform(id,es_type,recomVideo){
				if(recomVideo == 1){
					uni.showToast({
						title: '跳转下载地址',
						icon: "none"
					})
					return false
				}
				if(es_type==1){
					uni.navigateTo({
						url:'../../pages/information/information?id='+id
					})
					return false
				}
				if(es_type == 2){
					uni.navigateTo({
						url:"../../pages/VDetail/VDetail?id="+id
					})
					return false
				}
				if(es_type == 3){
					uni.navigateTo({
						url:'../../pages/atlasDetail/atlasDetail?id='+id
					})
					return false
				}
			},
			loadmore(){
				// console.log(11)
			},
			gominvideo(item){
				if(item!=undefined){
					uni.setStorageSync('minvideo',item)
				}
				uni.switchTab({
					url: "/pages/smallBrushVideo/smallBrushVideo"
				})
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
		}
		
	}
</script>

<style lang="scss" scoped>
.Content{
	// height: 90vh;
	.itemContent{
		box-sizing: border-box;
		padding: 20rpx 24rpx 0 24rpx; 
		// border-bottom: 1px solid #E7E7E7;
		padding-bottom: 30rpx;
		>view{
			display: flex;
			justify-content: space-between;
			>view:nth-child(1){
				width: 450rpx;
				color: #2A2A2A;
				font-size: 34rpx;
				// font-weight: bold;
				.contentread{
					// display: inline-block;
					// display:flex;
					font-weight: 400;
					font-size: 24rpx;
					margin-top: 28rpx;
					color:#B8B8B8;
					.readtitle{
						max-width: 200rpx;;
						margin-left: 18rpx;
					}
					.hot{
						image{
							width: 22rpx;
							height: 30rpx;
						}
					}
					.is_top{
						display: inline-block;
						position: relative;
						top: 4rpx;
						height: 30rpx;
						width: 30rpx;
						image{
							// width: 30rpx;
							height: 30rpx;
						}
					}
					.timer{
						margin-left: 18rpx;
					}
					.hottitle{
						width: 60rpx;
						color: #F03644 ; 
						margin-left: 6rpx;
						margin-right: 18rpx;
					}
					.author{
						display: inline-block;
						position: relative;
						top: 6upx;
						// width: auto;
						// flex: 1;
						width: 120rpx;
						// line-height: 40rpx;
						text-overflow: ellipsis;/*只是起到注解作用*/
						white-space: nowrap;/*不让文本换行*/
						overflow: hidden;/*超出的部分显示...*/
					}
				}
			}
			>view:nth-child(2){
				width: 228rpx;
				height: 156rpx;
				background: url(../../static/img/Loading_wenzhang@2x.png) no-repeat;
				background-size: 100% 100%;
				border-radius: 10rpx;
				position: relative;
				image{
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
				.videoTimer{
					position: absolute;
					right: 0;
					bottom: 10rpx;
					// width:98rpx;
					padding: 4rpx 8rpx;
					height:32rpx;
					background:rgba(0,0,0,0.35);
					border-radius:10px 0px 0px 0px;
					display: flex;
					align-items: center;
					justify-content: center;;
					image{
						width: 18rpx;
						height: 18rpx;
					}
					text{
						font-size: 20rpx;
						color: #fff;
						margin-left: 8rpx;
					}
					// opacity:0.35;
				}
			}
		}
	}
	.itemCOntent1{
		box-sizing: border-box;
		padding: 20rpx 24rpx 0rpx 24rpx;
		// border-bottom: 1px solid #E7E7E7;
		// padding-bottom: 30rpx;
		// padding-top: 20rpx;
		view:nth-child(1){
			font-size: 34rpx;
			color: #2a2a2a;
		}
		>view:nth-child(2){
			display: flex;
			justify-content: space-between;
			margin-top: 22rpx;
			view{
				width: 228rpx;
				height: 156rpx;
				border-radius: 10rpx;
				background: url(../../static/img/Loading_wenzhang@2x.png) no-repeat;
				background-size: 100% 100%;
				
			}
		}
		>view:nth-child(3){
			font-size: 24rpx;
			color: #B8B8B8;
			margin-top: 20rpx;
			display: flex;
			.readtitle{
				margin-left: 18rpx;
				
			}
			.hot{
				position: relative;
				top: -4rpx;
				image{
					width: 30rpx;
					height: 30rpx;
				}
			}
			.is_top{
				height: 30rpx;
				width: 30rpx;
				position: relative;
				top: -5rpx;
			}
			.hottitle{
				color: #F03644 ; 
				margin-left: 6rpx;
				margin-right: 18rpx;
			}
			.timer{
				margin-left: 18rpx;
			}
			.author{
				display: inline-block;
				max-width: 440rpx;
				text-overflow: ellipsis;/*只是起到注解作用*/
				white-space: nowrap;/*不让文本换行*/
				overflow: hidden;/*超出的部分显示...*/
			}
		}
		>view{
			image{
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
		}
	}
	.atlas{
		box-sizing: border-box;
		padding: 20rpx 24rpx 0rpx 24rpx;
		// border-bottom: 1px solid #E7E7E7; 
		>view:nth-child(1){
			color: #2A2A2A;
			font-size: 38rpx;
		}
		>view:nth-child(2){
			width: 702rpx;
			height: 396rpx;
			margin-top: 22rpx;
			border-radius:10px;
			position: relative;
			image{
				width: 100%;
				height: 100%;
				border-radius:10px;
				object-fit: cover;
			}
			.play{
				position: absolute;
				top: 140rpx;
				left: 300rpx;
				image{
					width: 96rpx;
					height: 96rpx;
				}
			}
			.imgCount{
				// width:94rpx;
				height:38rpx;
				padding: 8rpx 20rpx; 
				background:rgba(0,0,0,.3);
				border-radius:18rpx 0px 0px 0px;
				// opacity:0.3;
				position: absolute;
				bottom: 16rpx;
				right: 0rpx;
				color: #fff;
				font-size: 22rpx;
				image{
					width: 20rpx;
					height: 20rpx;
				}
				text{
					margin-left: 10rpx;
				}
			}
			.playTimer{
				position: absolute;
				bottom: 16rpx;
				right: 0;
				// width: 84rpx;
				padding: 8rpx 20rpx;
				font-size: 22rpx;
				height: 38rpx;
				background:rgba(0,0,0,0.3);
				border-radius:18rpx 0px 0px 0px;
				// opacity:0.3;
				color: #fff;
				text-align:center;
				line-height: 38rpx;
			}
		}
		
		>view:nth-child(3){
			display: flex;
			margin-top: 20rpx;
			font-size: 24rpx;
			color: #B8B8B8;
			text{
				margin-left: 18rpx;
				margin-right: 0!important;
			}
			text:nth-child(1){
				margin-left: 0;
			}
			>view+text{
				margin-left: 6rpx;
			}
		}
	}
	.minVideo{
		.cut{
			width:750rpx;
			height:20rpx;
			background:rgba(250,250,250,1);
			position: relative;
			left: -24rpx;
		}
		.mintitle{
			// margin-top: 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			padding: 0 24rpx;
			box-sizing: border-box;
			view{
				image{
					width: 46rpx;
					height: 32rpx;
				}
				text{
					color: #2A2A2A;
					font-size: 38rpx;
					margin-left: 12rpx;
					font-weight: bold;
				}
			}
			>image{
				width: 14rpx;
				height: 24rpx;
			}
		}
		.scrollX{
			margin-top: 22rpx;
			height: 700rpx;
			width: 100vw;
			
			// position: absolute;
			
		}
		.btcut{
			width:750rpx;
			height:20rpx;
			background:rgba(250,250,250,1);
			position: relative;
			left: -24rpx;
			margin-top:28rpx;
		}
	}
}
.is_top{
	height: 30rpx;
	width: 30rpx;
	image{
		width: 30rpx;
		height: 30rpx;
	}
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.Xitem{
	display: flex;
	padding-left: 24rpx;
	padding-right: 24rpx;
		>view{
			width: 466rpx;
			height: 700rpx;
			border-radius:10px;
			background: url(../../static/img/Loading_small_video@3x.png) no-repeat;
			background-size: 468rpx 700rpx;
			position: relative;
			image:nth-child(1){
				width: 466rpx;
				height: 700rpx;
				border-radius:10px;
				// background: url(../../static/img/Loading_small_video@3x.png) no-repeat;
				// background-size: 468rpx 700rpx;
			}
			image:nth-child(2){
				position: absolute;
				width: 40rpx;
				height: 46rpx;
				left: 240rpx;
				top: 335rpx;
			}
			image:nth-child(3){
				position: absolute;
				bottom: 0;
				left: 0;
				z-index: 10;
				width: 468rpx;
				height: 176rpx;
			}
			.title{
				position: absolute;
				padding: 0 20rpx;
				box-sizing: border-box;
				bottom: 20rpx;
				left: 0rpx;
				color: #fff;
				font-size: 32rpx;
				z-index: 15;
				// text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.minMroe{
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0rpx;
				left: 0rpx;
				background:rgba(0,0,0,.6);
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				image{
					width: 64rpx;
					height: 64rpx;
				}
				text{
					color: #FFF;
					margin-top: 22rpx;
				}
			}
		}
		view+view{
			margin-left: 24rpx;
		}
}
.line{
	height: 1px;
	width: 100%;
	background: #E7E7E7;
	margin-top: 20rpx; 
}
.mark1{
	width: 60rpx;
	color: #F03644;
	margin-right: 18rpx;
	margin-left: 6rpx;
	// width: 40rpx;
}
.mark2{
	width: 60rpx;
	color: #FF952F;
	margin-right: 18rpx;
	margin-left: 6rpx;
}
.mark3{
	width: 60rpx;
	color: #FFC638;
	margin-right: 18rpx;
	margin-left: 6rpx;
}
.mark4{
	// width: 40rpx;
	width: 60rpx;
	color: #F03644;
	margin-right: 18rpx;
	margin-left: 6rpx;
}
.mark5{
	width: 60rpx;
	color: #FF952F;
	margin-right: 18rpx;
	margin-left: 6rpx;
}
.mark6{
	width: 60rpx;
	color: #FFC638;
	margin-right: 18rpx;
	margin-left: 6rpx;
}
</style>
<style scoped>
	
</style>


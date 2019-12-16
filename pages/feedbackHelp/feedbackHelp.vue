<template>
	<view class="feedback" >
		<scroll-view scroll-y style="height: calc(100vh - 90upx)">
			<view class="must">
				<view class="must-title">
					<image src="../../static/img/help_must@3x.png"></image>
					<text>{{data.length>0?data[0].cate_name:''}}</text>
				</view>
				<view class="must-option" @tap="feedDetail(0,0)">
					<view>{{data.length>0?data[0].list[0].name:''}}</view>
					<image src="../../static/img/more@3x.png" mode="" class="more"></image>
				</view>
			</view>
			<view class="cut"></view>
			<view class="FAQ">
				<view class="must-title">
					<image src="../../static/img/help_why@3x.png"></image>
					<text >{{data.length>0?data[1].cate_name:''}}</text>
				</view>
				<view class="must-option" v-for="(item,i) in list" :key='i' v-if="data.length>0" @tap="feedDetail(1,i)">
					<view>{{item.name}}</view>
					<image src="../../static/img/more@3x.png" mode="" class="more"></image>
				</view>
			</view>
		</scroll-view>
		<view class="opinFeed" @tap="solve">
			意见反馈
		</view>
	</view>
</template>

<script>
	import sha1 from "sha1"
	export default {
		data() {
			return {
				data: [],
				list: []
			}
		},
		created(){
			this.initFAQ()
		},
		methods: {
			initFAQ(){
				let params = {
					// now_time	是	string	签名时间
					// sign	是	string	签名
					now_time:this.now_time(),
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.decrypt(this.key)+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post('/v1/problems-show.html',params,{
						headers:{
							'Authorization': this.token,
							// 'content-type': 'application/x-www-form-urlencoded'
						}
						
				}).then(res=>{
					this.data = res.data.data
					this.list = res.data.data[1].list
				})
			},
			feedDetail(i,j){
				window.location.href = "/pages/feedDetail/feedDetail?type="+i+"&index="+j
				// uni.navigateTo({
				// 	url: "../feedDetail/feedDetail?type="+i+"&index="+j
				// })
			},
			solve(){
				window.location.href = "/solve"
			},
		}
	}
</script>

<style scoped lang="scss">
	.feedback{
		.opinFeed{
			position: fixed;
			bottom: 0;
			left: 0;
			width:750upx;
			height:90upx;
			background:rgba(240,54,68,1);
			color: #fff;
			font-size: 32upx;
			text-align:center;
			line-height: 90upx;
		}
		scroll-view{
			::-webkit-scrollbar {
				width: 0;
				height: 0;
				background-color: transparent;
			} 
			.must{
				padding: 0 24upx;
				box-sizing: border-box;
				.must-title{
					display: flex;
					align-items: center;
					padding: 28upx 0 24upx 0;
					border-bottom: 1px solid #EFEFEF;
					image{
						width: 28upx;
						height: 34upx;
						position: relative;
						top: 4upx;
					}
					text{
						color: #2A2A2A;
						font-size: 34upx;
						font-weight: bold;
						margin-left: 14upx;
					}
				}
				.must-option{
					display: flex;
					justify-content: space-between;
					align-items: center;
					color:#2A2A2A;
					font-size: 30upx;
					padding: 20upx 0 24upx 0;
					box-sizing: border-box;
					
				}
			}
			.cut{
				width:750upx;
				height:20upx;
				background:rgba(245,246,247,1);
			}
			.FAQ{
				padding: 0 24upx;
				box-sizing: border-box;
				.must-title{
					display: flex;
					align-items: center;
					padding: 28upx 0 24upx 0;
					border-bottom: 1px solid #EFEFEF;
					image{
						width: 34upx;
						height: 36upx;
						position: relative;
						top: 2upx;
					}
					text{
						color: #2A2A2A;
						font-size: 34upx;
						font-weight: bold;
						margin-left: 14upx;
					}
				}
				.must-option{
					display: flex;
					justify-content: space-between;
					align-items: center;
					color:#2A2A2A;
					font-size: 30upx;
					padding: 20upx 0 24upx 0;
					box-sizing: border-box;
					border-bottom: 1px solid #EFEFEF;
				}
			}
			.more{
				width: 14upx;
				height: 24upx;
			}
		}
	}
</style>

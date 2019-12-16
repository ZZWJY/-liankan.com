<template>
	<view class="rank">
		<view class="rank-Top"></view>
		<view class="rank-Me">
			<view class="Me-content">
				<view class="MeRank">
					<view>富豪排名</view>
					<view style="font-family: fz;">{{my_data.my_location}}</view>
				</view>
				<view class="rank-avatar">
					<image :src="my_data.avatar||'../../static/img/personal_default.png'"></image>
				</view>
				<view class='MeInfo'>
					<view>
						<text>回想少年的你</text>
						<text>邀请{{my_data.invite_num}}人</text>
					</view>
					<view>
						<text style="font-family: fz;">{{my_data.kd}} <text>看点</text></text>
						<text style="font-family: fz;">{{my_data.annual_revenue|clickCount}} <text>{{(my_data.annual_revenue>10000||my_data.annual_revenue==1000)?'万':''}}元</text></text>
					</view>
				</view>
			</view>
		</view>
		<view class="rank-bottom">
			<view class="rankList-title">
				<text>排名</text>
				<text>用户</text>
				<text>看点</text>
				<text>
					预计年收益 
				</text>
				<image src="../../static/img/million_why@3x.png" @tap="annualEarnings"></image>
			</view>
			<scroll-view class="rankList-content" scroll-y style="height: calc(100vh - 510upx)">
				<view class="rank-Item" v-for="(item,i) in rank_data" :key="i">
					<view>
						<image src="../../static/img/million_one@3x.png" v-if="i==0"></image>
						<image src="../../static/img/million_two@3x.png" v-if="i==1"></image>
						<image src="../../static/img/million_three@3x.png" v-if="i==2"></image>
						<text v-if="i>2" style="font-family: fz;">{{i+1}}</text>
					</view>
					<view>
						<image :src="item.avatar||'../../static/img/personal_default.png'"></image>
					</view>
					<view>
						<view>{{item.nickname}}</view>
						<view>邀请{{item.invite_num}}人</view>
					</view>
					<view style="font-family: fz;">
						{{item.kd}}
					</view>
					<view>
						<text style="font-family: fz;">{{item.annual_revenue|clickCount}}</text>
						<text>万元</text>
					</view>
				</view>
				<!-- <view class="rank-Item-All" @tap="treasureTop">
					<text>查看TOP10看点财富榜</text>
					<image src="../../static/img/million_more@3x.png"></image>
				</view> -->
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import sha1 from "sha1"
	export default {
		data() {
			return {
				limit: 10,
				rank_data: [],
				token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEwMDIyLCJpc3MiOiJodHRwOlwvXC93d3cuYmliZW4uY29tIiwiaWF0IjoxNTc1NTQxNzY4LCJleHAiOjE1NzgxMzM3Njh9.QZZ5GKOPm9U7V4Ie3JIz2A9ZisgRnFC2h0aXzDKlZyQ',
				my_data: {}
			}
		},
		mounted(){
			this.initRank()
		},
		onLoad(params) {
			if(params.token!=undefined){
				this.token = params.token
			}
		},
		filters:{
			clickCount(value){
				if(value>10000){
					value = Math.round(value/1000)/10
				}
				return value
			}
		},
		methods: {
			initRank(){
				let params = {
					// now_time	是	string	签名时间
					// sign	是	string	签名
					now_time:this.now_time(),
					limit: this.limit
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.decrypt(this.key)+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post('/v1/treasure-top.html',params,{
						headers:{
							'Authorization': this.token,
							// 'content-type': 'application/x-www-form-urlencoded'
						}
						
					}).then(res=>{
					console.log(res)
					if(res.data.status == 1){
						this.rank_data = res.data.data.member_data
						this.my_data = res.data.data.my_data[0]
					}
				})
			},
			annualEarnings(){
				window.location.href = '/annualEarnings'
			},
		}
	}
</script>

<style scoped lang="scss">
	.rank{
		.rank-Top{
			height: 350upx;
			width: 750upx;
			background:url(../../static/img/richlist_bg@3x.png) no-repeat;
			background-size: 100% 100%;
		}
		.rank-Me{
			display: flex;
			justify-content: center;
			
			.Me-content{
				width:702upx;
				height:160upx;
				background:rgba(255,255,255,1);
				box-shadow:0px 0px 16upx 0upx rgba(0,0,0,0.05);
				border-radius:20upx;
				margin-top: -80upx;
				position: relative;
				display: flex;
				align-items: center;
				padding: 16upx;
				box-sizing: border-box;
				.MeRank{
					position: absolute;
					right: 28upx;
					top: -12upx;
					width: 130upx;
					height: 80upx;
					background:url(../../static/img/richlist_rank@3x.png) no-repeat;
					background-size: 100% 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					padding-right: 16upx;
					box-sizing: border-box;
					color: #fff;
					view:nth-child(1){
						font-size: 20upx;
					}
					view:nth-child(2){
						font-size: 32upx;
						font-weight: bold;
					}
				}
				.rank-avatar{
					width: 108upx;
					height: 108upx;
					image{
						width: 108upx;
						height: 108upx;
						border-radius: 50%;
					}
				}
				.MeInfo{
					margin-left: 22upx;
					display: flex;
					flex-direction: column;
					>view:nth-child(1){
						text:nth-child(1){
							font-size: 34upx;
							color: #2A2A2A;
							
						}
						text:nth-child(2){
							margin-left: 12upx;
							color: #F03644;
							font-size: 22upx;
							font-weight: bold;
						}
					}
					>view:nth-child(2){
						>text{
							font-size: 38upx;
							color: #2A2A2A;
							font-weight: bold;
							text{
								font-size: 24upx;
								font-weight: 400;
							}
						}
						>text+text{
							margin-left: 76upx;
						}
					}
				}
			}
		}
		.rank-bottom{
			padding: 0 24upx;
			box-sizing: border-box;
			.rankList-title{
				width:702upx;
				height:52upx;
				background:rgba(244,244,244,1);
				border-radius:20upx 20upx 0 0;
				margin-top: 20upx;
				display: flex;
				align-items: center;
				text{
					color: #B8B8B8;
					font-size: 24upx;
				}
				text:nth-child(1){
					margin-left: 24upx;
				}
				text:nth-child(2){
					margin-left: 88upx;
				}
				text:nth-child(3){
					margin-left: 194upx;
				}
				text:nth-child(4){
					margin-left: 82upx;
				}
				image{
					width: 22upx;
					height: 22upx;
					margin-left: 8upx;
					position: relative;
					top: 2upx;
				}
			}
			.rankList-content{
				::-webkit-scrollbar {
					width: 0;
					height: 0;
					background-color: transparent;
				} 
				.rank-Item{
					background: #F9F9F9;
					height: 165upx;
					width: 702upx;
					border-bottom: 1px solid #EDEDED;
					padding: 26upx 0; 
					box-sizing: border-box;
					display: flex;
					align-items: center;
					>view:nth-child(1){
						image{
							width: 36upx;
							height: 40upx;
						}
						text{
							display: inline-block;
							width: 36upx;
							height: 40upx;
							line-height: 40upx;
							text-align: center;
							color:#848484;
							font-size: 32upx;
						}
					}
					>view:nth-child(2){
						margin-left: 16upx;
						margin-right: 18upx;
						image{
							width: 88upx;
							height: 88upx;
							border-radius: 50%;
						}
					}
					view:nth-child(3){
						display: flex;
						flex-direction: column;
						view:nth-child(1){
							color: #2A2A2A;
							font-size: 26upx;
							width: 194upx;
							text-align: left;
							text-overflow :ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
							white-space :nowrap; /*让文字不换行*/
							overflow : hidden; /*超出要隐藏*/
						}
						view:nth-child(2){
							margin-top: 14upx;
							color: #A72D36;
							font-size: 22upx;
						}
					}
					view:nth-child(4){
						width: 100upx;
						text-align: right;
						color: #2A2A2A;
						font-size: 32upx;
						font-weight: bold;
					}
					view:nth-child(5){
						width: 226upx;
						text-align: right;
						color: #2A2A2A;
						font-size: 32upx;
						font-weight: bold;
						text:nth-child(2){
							font-size: 22upx;
							font-weight: 400;
						}
					}
				}
				// .rank-Item-All{
				// 	background: #F9F9F9;
				// 	height: 82upx;
				// 	width: 702upx;
				// 	border-bottom: 1px solid #EDEDED;
				// 	display: flex;
				// 	justify-content: center;
				// 	align-items: center;
				// 	box-sizing: border-box;
				// 	color: #B8B8B8;
				// 	font-size: 28upx;
				// 	image{
				// 		width: 26upx;
				// 		height: 26upx;
				// 		margin-left: 12upx;
				// 		position: relative;
				// 		top: 2upx;
				// 	}
				// }
			}
		}
	}
</style>

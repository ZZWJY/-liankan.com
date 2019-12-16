<template>
	<view class="detail">
		<view class="detail-box">
			<view class="box-content">
				<view>
					<view class="title">{{content.name}}</view>
					<view class="content" v-html="content.content"></view>
				</view>
				<view>
					<view>是否解决了您的问题</view>
					<view class="status">
						<view :class="!is_solve?'red':''" @tap="togglesolve(false)">
							<image :src="!is_solve?'../../static/img/help_details_not_red@3x.png':'../../static/img/help_details_not@3x.png'"></image>
							<text>未解决我的问题</text>
						</view>
						<view :class="is_solve?'green':''" @tap="togglesolve(true)">
							<image :src="is_solve?'../../static/img/help_details_yes_green@3x.png':'../../static/img/help_details_yes_not@3x.png'"></image>
							<text>解决了我的问题</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="solveMit" @tap="solve">
			<view>意见反馈</view>
		</view>
	</view>
</template>

<script>
	import sha1 from "sha1"
	export default {
		data() {
			return {
				content: {},
				type: 0,
				index: 0,
				is_solve: true
			}
		},
		onLoad(option) {
			console.log(option)
			this.type = option.type
			this.index = option.index
		},
		mounted(){
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
					this.content = res.data.data[this.type].list[this.index]
					console.log(this.content)
				})
			},
			togglesolve(flag){
				this.is_solve = flag
			},
			solve(){
				window.location.href = "/solve"
			},
		}
	}
</script>

<style scoped lang="scss">
	.detail{
		.detail-box{
			padding: 24upx 8upx 0 24upx;
			box-sizing: border-box;
			.box-content{
				padding: 24upx 46upx 56upx 32upx;
				box-sizing: border-box;
				width: 718upx;
				height: 1020upx;
				background:url(../../static/img/help_details_bg@3x.png) no-repeat;
				background-size: 100% 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.title{
					display: flex;
					justify-content: center;
					color: #6E1D1D;
					font-size: 46upx;
					font-weight: bold;
					margin-bottom: 8upx;
				}
				.content{
					font-size: 32upx;
				}
				view:nth-child(2){
					display: flex;
					flex-direction: column;
					>view:nth-child(1){
						text-align: center;
						color: #E0D0CF;
						font-size: 26upx;
					}
					.status{
						margin-top: 26upx;
						display: flex;
						justify-content: center;
						align-items: center;
						flex-direction: row;
						view{
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							color: #EAD7D6;
							font-size: 32upx;
							image{
								width: 86upx;
								height: 86upx;
							}
							text{
								
								
								margin-top: 14upx;
							}
						}
						view+view{
							margin-left: 106upx;
						}
						.green{
							color: #46DC96;
						}
						.red{
							color: #F03644
						}
					}
				}
			}
		}
		.solveMit{
			display: flex;
			justify-content: center;
			margin-top: 58upx;
			view{
				width: 640upx;
				height: 90upx;
				background: rgba(240,54,68,1);
				border-radius: 10upx;
				color: #fff;
				font-size: 36upx;
				text-align: center;
				line-height: 90upx;
			}
		}
	}
</style>
<style scoped>
	.content >>> p{
		color: #191110 !important;
		font-size: 32upx;
	}
	.content >>> span{
		color: #191110 !important;
		font-size: 32upx;
	}
</style>

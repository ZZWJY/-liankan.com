<template>
	<view class="sign">
		<view class="sign-list">
			<view class="sign-item" v-for="(item,i) in data.sign_time " :key="i" :style="(i<data.continuous_day||i==data.continuous_day)?'background:url(../../static/img/red_open@3x.png) no-repeat;background-size: 100% 100%;':'background:url(../../static/img/red_open@3.png) no-repeat;background-size: 100% 100%;'">
				<view style="font-family: fz;">+{{item}}</view>
				<view>第{{i}}天</view>
			</view>
		</view>
		<view class="sign-rule">
			<view>活动规则</view>
			<view class='sign-step'>
				<view>每天进入任务页，即可获得当日金币</view>
				<view>连续签到30天为一个周期，连续签到越多
     获得金币越多</view>
				<view>如果中间中断，将从第一天开始重算</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import sha1 from "sha1"
	export default {
		data() {
			return {
				token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEwMDIyLCJpc3MiOiJodHRwOlwvXC93d3cuYmliZW4uY29tIiwiaWF0IjoxNTc1NTQxNzY4LCJleHAiOjE1NzgxMzM3Njh9.QZZ5GKOPm9U7V4Ie3JIz2A9ZisgRnFC2h0aXzDKlZyQ',
				data:{}
			};
		},
		mounted(){
			this.initSign()
		},
		onLoad(params) {
			if(params.token!=undefined){
				this.token = params.token
			}
		},
		methods:{
			initSign(){
				let params = {
					// now_time	是	string	签名时间
					// sign	是	string	签名
					now_time:this.now_time(),
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.decrypt(this.key)+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post('/v1/sign-in-show.html',params,{
						headers:{
							'Authorization': this.token,
							// 'content-type': 'application/x-www-form-urlencoded'
						}
						
				}).then(res=>{
					// this.pool = res.data.data
					this.data = res.data.data
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.sign{
		padding: 390upx 24upx 50upx 24upx;
		box-sizing: border-box;
		width: 750upx;
		height: 3200upx;
		background:url(../../static/img/sign_bg@3x.png) no-repeat;
		background-size: 100% 100%;
		.sign-list{
			width: 702upx;
			height: 2300upx;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			background:url(../../static/img/sign_thread.png) no-repeat;
			background-size: 564upx 2080upx;
			background-position: 78upx 100upx;
			.sign-item{
				width: 204upx;
				height: 170upx;
				// background:url(../../static/img/red_open@3.png);
				margin-left: 20upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				>view:nth-child(1){
					font-size: 38upx;
					color: #FFF;
					position: relative;
					left: -6upx;
				}
				>view:nth-child(2){
					color: #FFCECB;
					font-size: 22upx;
					margin-top: 50upx;
				}
				.red{
					color: #FF4719
				}
			}
		}
		.sign-rule{
			margin-top: 50upx;
			width:702upx;
			height:422upx;
			background:rgba(253,219,143,1);
			border-radius:20upx;
			padding: 28upx 24upx;
			box-sizing: border-box;
			view:nth-child(1){
				color: #8A6000;
				font-size: 38upx;
				font-weight: bold;
				line-height: 52upx;
			}
			.sign-step{
				margin-top: 24upx;
				view{
					padding: 14upx 20upx;
					box-sizing: border-box;
					background:rgba(254,229,173,1);
					border-radius:10px;
					color: #A27B24;
					font-weight: bold;
					font-size: 30upx;
				}
				view+view{
					margin-top: 20upx;
					
				}
			}
		}
	}
</style>

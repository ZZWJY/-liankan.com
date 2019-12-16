<template>
	<view class='popLogin'>
		<view>
			<image src="../../static/img/home_bg@3x.png" class="home_bg"></image>
		</view>
		<text class="moneyTitle">点击领取<text class="money">{{money}}元</text>红包</text>
		<!-- <text class="tologin" @click="gologin" v-if="is_H5">登录</text>
		<button class="button"  open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="gologin" v-if="!is_H5">
		    登录
		</button> -->
		<text @tap="golook" class="golook">去看看</text>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				money: 10,
				bottom: 0,
				is_H5: true
			}
		},
		// props: ['bottom']
		created() {
			uni.getStorage({
				key:"is_H5",
				success:(res)=>{
					let _this = this
					// console.log(res)
					if(res.data === true){
						_this.bottom = 50
					}
				}
			})
		},
		props: ['is_token'],
		methods:{
			gologin(){
				// if(this.getStorage('is_H5')){
				// 	uni.navigateTo({
				// 		url:"../../pages/login/login"
				// 	})
				// }else{
				// 	let _this = this 
				// 	this.wxGetUserInfo(_this)
				// 	this.$emit("login",true)
				// }
			},
			golook(){
				// console.log(11)
				uni.showToast({
					title: '你瞅啥',
					icon: "none"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	$popwidth: 100%;
	$popheight: 90rpx;
	$backgroundColor: #F03644;
	.popLogin{
			width:$popwidth;
			height:$popheight;
			background-color: $backgroundColor;
			position: fixed;
			display: flex;
			align-items: center;;
			// bottom: 0rpx;
			left: 0;
			bottom: 0;
			display: block;
			.home_bg{
				width: 118rpx;
				height: 84rpx;
				position: absolute;
				left: 18rpx;
				top: 0rpx;
			}
			.moneyTitle{
				font-size: 34rpx;
				color: #fff;
				margin-left: 168rpx;
				line-height: 90rpx;
				font-weight: bold;
			
				.money{
					font-size: 48rpx;
					color: rgba(255,252,104,1);
					
				}
			}
			.tologin{
				display: inline-block;
				width: 120rpx;
				height: 50rpx;
				background: rgba(240,54,68,1);
				border-radius: 10rpx;
				color: #FFF;
				font-size: 28rpx;
				text-align: center;
				margin-left: 54rpx;
				position: relative;
				top: -6rpx;
				line-height: 50rpx;
			}
			.button{
				display: inline-block;
				width: 120rpx;
				height: 50rpx;
				background: rgba(240,54,68,1);
				border-radius: 10rpx;
				color: #FFF;
				font-size: 28rpx;
				text-align: center;
				margin-left: 54rpx;
				position: relative;
				top: -6rpx;
				line-height: 50rpx;
				position: relative;
				top: 10rpx;
			}
			.button::after{
				border: 0;
			}
			.golook{
				position: relative;
				top: -6rpx;
				color: #F03644;
				font-size: 28rpx;
				display: inline-block;
				text-align: center;
				line-height: 56rpx;
				width:124rpx;
				height:56rpx;
				background:rgba(255,255,255,1);
				border-radius:10rpx;
				margin-left: 112rpx;
			}
	}
	
</style>

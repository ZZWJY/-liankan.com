<template>
	<view class="share">
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
</template>

<script>
	export  default {
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped lang="scss">
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
	}
</style>

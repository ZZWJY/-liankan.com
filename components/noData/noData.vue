<template>
	<view>
		<image src="../../static/img/no_data@3x1.png"></image>
		<text>{{message}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			message:{
				type: String,
				default: '暂无关注信息'
			}
		}
	}
</script>

<style scoped lang="scss">
	view{
		display: flex;
		flex-direction: column;
		align-items: center;
		image{
			margin-top: 270rpx;
			width: 302rpx;
			height: 244rpx;
		}
		text{
			margin-top: 32rpx;
			font-size: 30rpx;
			color:#B8B8B8;
		}
	}
</style>

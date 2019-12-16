<template>
	<view class="poplikeContent">
		<view class="classify">
			<text>选择你想看的分类</text>
			<view>
				<text v-for="(item,i) in classify" :key="i" :class="['classifyitem',item.select==true?'active':'']" @click="sele(i)">{{item.name}}</text>
			</view>
			<view>
				确定
			</view>
			<view @click="jump">
				跳过
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				classify:[],
			}
		},
		created(){
			this.initcate()
		},
		methods:{
			jump(){
				this.setStorage('is_reg',0)
				this.$emit('change',false)
			},
			sele(i){
				let select = this.classify[i].select
				let name = this.classify[i].name
				let cate_id = this.classify[i].cate_id
				this.$set(this.classify,i,{
					select:!select,
					cate_id,
					name
				})
			},
			initcate(){
				this.uniRequest.get("/v1/get-cate.html").then(res=>{
					console.log(res)
					this.classify = res.data.data
					for(var index=0;index<this.classify.length;index++){
						if(index==0){
							this.classify[index].select = true
							continue
						}
						this.classify[index].select = false
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.poplikeContent{
		width: 100vw;
		height:100vh;
		background: rgba(0,0,0,.8);
		display: flex;
		justify-content: center;
		align-items: center;
		.classify{
			width:640rpx;
			height:658rpx;
			background:rgba(255,255,255,1);
			border-radius:20rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 32rpx 0rpx 26rpx 0rpx;
			>text:nth-child(1){
				font-size: 46rpx;
				color: #2A2A2A;
				font-weight: bold;
			}
			view:nth-child(2){
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				margin: 66rpx 20rpx 0 20rpx; 
				.classifyitem{
					width: 160rpx;
					height: 80rpx;
					background: rgba(245,246,247,1);
					border-radius: 10rpx;
					text-align: center;
					line-height: 80rpx;
					color: #B8B8B8;
					font-weight: bold;
					border: 2px solid transparent
				}
				.classifyitem+.classifyitem{
					margin-left: 20rpx;
				}
				.classifyitem:nth-child(3n+1){
					margin-left: 0
				}
				.classifyitem:nth-child(n+4){
					margin-top: 60rpx;
				}
				.active{
					background:rgba(255,239,240,1);
					border-color:rgba(246,127,136,1);
					color: #F03644;
				}
			}
			view:nth-child(3){
				width:550rpx;
				height:80rpx;
				background:rgba(240,54,68,1);
				border-radius:10rpx;
				text-align: center;
				line-height: 80rpx;
				color: #fff;
				font-size: 32rpx;
				margin-top: 115rpx;
			}
			view:nth-child(4){
				font-size: 30rpx;
				color: #B8B8B8;
				margin-top: 20rpx;
			}
		}
	}
</style>
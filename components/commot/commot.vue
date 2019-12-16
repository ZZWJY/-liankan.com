<template>
	<view :class="es_type==3?'es_type3':''">
		<text v-if='es_type!=3'>热门评论</text>
		<view class="commentItem" v-for="(item,i) in content" :key="i">
			<view>
				<image :src="item.avatar||'../../static/img/personal_default@3x.png'"></image>
			</view>
			<view>
				<view>
					{{item.member_name}}
				</view>
				<view>{{item.content}}</view>
				<view>
					<text>{{item.created}}</text>
					<text @click="emReply(i)">{{item.reply_num==0?'':item.reply_num}}回复</text>
					<view class="right" @click="togglelaud(item.id,item.member_id,i)">
						<image :src="item.is_laud==1?'../../static/img/home_details_praise_yes@3x.png':'../../static/img/home_details_praise_not@3x.png'"></image>
						<text :class="item.is_laud==1?'red':''">{{item.laud_num}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import sha1 from "sha1"
	export default {
		data() {
			return {
				page: 1,
			}
		},
		onShow(){
			
		},
		props:{
			content: {
			  type: Array,
			  default: () => {
				return []
			  }
			},
			es_type: {
			  type: Number,
			  default: () => {
				return 2
			  }
			},
		},
		methods: {
			// page	是	string	页码
			// now_time	是	string	签名时间
			// sign	是	string	签名
			// init(){
			// 	let params = {
			// 		page: this.page,
			// 		now_time: this.now_time()
			// 	}
			// 	let twoparams = this.objKeySort(params)
			// 	let threeparams = this.stringify(twoparams)
			// 	let sign = sha1(this.api_key+threeparams).toUpperCase()
			// 	params.sign = sign
			// 	this.uniRequest.post("/v1/comment-list.html",params).then(res=>{
			// 		console.log(res)
			// 		if(res.data.status == 1){
			// 			this.content = res.data.data
			// 		}
			// 	})
			// }
			emReply(i){
				// console.log(this.content[i])
				this.$emit('reply',this.content[i].id)
			},
			togglelaud(id,member_id,i){
				// console.log(this.getStorage('token'))
				if(this.getStorage('token')==''){
					if(this.getStorage("is_H5")){
						uni.navigateTo({
							url:'../../pages/login/login'
						})
					}
					return false
				}
				// id	是	string	对象ID
				// scene	是	string	1=资讯 2=视频 3=微头条 4=评论
				// to_member_id	是	string	资讯视频的media_id 或者 评论的 member_id
				// now_time	是	string	签名时间
				// sign	是	string	签名
				let params = {
					id,
					to_member_id: member_id,
					scene: 0,
					now_time: this.now_time()
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.api_key+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post("/v1/laud.html",params).then(res=>{
					console.log(res)
					if(res.data.status == 1){
						console.log(11)
						this.$emit("toggleComlaud",i)
						// if(this.content[i].is_laud==0){
							
						// 	this.$set(this.content[i],'is_laud',1)//this.content[i].is_laud = 1
						// 	let laud_num = this.content[i].laud_num+1
						// 	this.$set(this.content[i],'laud_num',laud_num)//this.content[i].laud_num = this.content[i].laud_num+1
						// }else{
						// 	this.$set(this.content[i],'is_laud',0)//this.content[i].is_laud = 0
						// 	let laud_num = this.content[i].laud_num-1
						// 	this.$set(this.content[i],'laud_num',laud_num)//this.content[i].laud_num = this.content[i].laud_num-1
						// }
					}
				})
			}
		},
		components:{
			// homeRecom
		}
	}
</script>

<style scoped lang="scss">
	view{
		>text:nth-child(1){
			font-size: 32rpx;
			color: #2A2A2A;
			font-weight: bold
		}
		.commentItem{
			padding: 22rpx 0;
			border-bottom: 1rpx solid #EFEFEF;
			display: flex;
			view:nth-child(1){
				margin-right: 24rpx;
				image{
					width: 66rpx;
					height: 66rpx;
					border-radius: 50%;;
				}
			}
			view:nth-child(2){
				flex: 1;
				color: #2A2A2A;
				>view:nth-child(1){
					font-size: 30rpx;
					margin-bottom: 20rpx;
					font-weight: bold;
				}
				view:nth-child(2){
					font-size: 32rpx;
				}
				>view:nth-child(3){
					width: 100%;
					margin-top: 20rpx;
					>text:nth-child(1){
						font-size: 24rpx;
						color: #B8B8B8;
					}
					>text:nth-child(2){
						font-size: 24rpx;
						display: inline-block;
						padding: 6rpx 30rpx;
						margin-left: 15rpx;
						background: #F0F0F0;
						border-radius: 22rpx;
					}
					>view:nth-child(3){
						image{
							width: 32rpx;
							height: 34rpx;
							position: relative;
							top: 4rpx;
						}
						text{
							font-size: 26rpx;
							color: #b8b8b8;
							margin-left: 15rpx;
						}
						.red{
							color: #F03644;
						}
					}
				}
			}
		}
	}
	.es_type3{
		width:750rpx;
		height:1084rpx;
		background:rgba(255,255,255,1);
		border-radius:20rpx 20rpx 0px 0px;
		position: fixed;
		bottom: 50px;
	}
</style>
<template>
	<view :class="['alcom',is_com?'showCom':'']" :style="focus?'height: 224rpx;background: #fff;':'height:50px'" >
		<view class="inp" :style="focus?'display: flex;align-items: center':''">
			<image src="../../static/img/home_details_discuss@3x1.png" v-if="!focus"></image>
			<input type="text" :disabled="true" :placeholder="inpplace" placeholder-style="font-size: 28rpx;color: #606873" v-if="!focus" @tap='togglefocus' :class="is_com?'showComInp':''">
			<textarea value="" 
			:placeholder="focustext" 
			v-if="focus" 
			:focus="focus" 
			:show-confirm-bar='false' 
			placeholder-style="font-size: 32rpx;color: #B8B8B8;" 
			cursor-spacing="15px" 
			@blur="blur" 
			v-model="value"
			:adjust-position="false"
			maxlength="100"/>
			<text :class="['public',value.length>0?'red':''] " v-if="focus" @tap="public">发表</text>
		</view>
		<view class="imgs" v-if="!focus&&!is_com">
			<view class="num" @tap="showCom">{{info.comment_num}}</view>
			<image src="../../static/img/home_img_comment@3x.png" class="item" @tap="showCom"></image>
			<image src="../../static/img/home_img_collect_not@3x.png" class="item" @tap="toggleCollect" v-if="info.is_favorite==0"></image>
			<image src="../../static/img/home_details_collect_yes@3x.png" v-if="info.is_favorite==1" class="item"  @tap="toggleCollect"></image>
			<image src="../../static/img/home_img_share@3x.png" class="item" @click="showshare"></image>
		</view>
	</view>
</template>

<script>
	import sha1 from "sha1"
	export default {
		data(){
			return {
				// text: "写评论",
				focus: false,
				focustext: "优质评论将会被优先展示",
				value: ''
			}
		},
		wacth:{
			vlaue(){
				if(this.value.length == 100){
					uni.showToast({
						title: 不能超过100个字,
						icon: 'none'
					})
				}
			}
		},
		props: ['info','is_com','inpplace','height'],
		methods: {
			togglefocus(){
				// console.log(11)
				this.focus = true
				this.$emit('focus',true)
			},
			blur(){
				setTimeout(()=>{
					this.focus = false
					this.$emit('focus',false)
				},0)
				
			},
			gologin(){
				uni.navigateTo({
					url:"../login/login"
				})
			},
			showCom(){
				this.$emit('showCom',true)
			},
			showshare(){
				this.$emit('showshare',true)
			},
			toggleCollect(){
				if(this.getStorage("token")==''){
					this.gologin()
					return false
				}
				let params = {
					// es_id	是	string	对象ID
					// scene_type	是	string	类型 1=资讯 2=视频
					// now_time	是	string	签名时间
					// sign	是	string	签名
					es_id: this.info.id,
					scene_type: 1,
					now_time: this.now_time()
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.api_key+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post("/v1/favorite.html",params).then(res=>{
					if(res.data.status == 1){
						if(this.info.is_favorite==0){
							this.info.is_favorite = 1
							uni.showToast({
								title: "收藏成功",
								icon: "none"
							})
						}else{
							this.info.is_favorite = 0
							uni.showToast({
								title: "取消收藏成功",
								icon: "none"
							})
						}
					}
				})
			},
			public(){
				
				if(this.value!='')
				this.$emit('dec',this.value)
				setTimeout(()=>{
					this.value = ''
				},0)
			},
		}
	}
	
</script>

<style scoped lang="scss">
	.alcom{
		display: flex;
		align-items: center;
		padding: 10rpx 24rpx;
		box-sizing: border-box;
		.inp{
			
			box-sizing: border-box;
			position: relative;
			image{
				position: absolute;
				width: 28rpx;
				height: 30rpx;
				left: 34rpx;
				top: 26rpx;
			}
			input{
				width: 414rpx;
				height: 80rpx;
				background:rgba(42,42,45,1);
				border-radius:10px;
				padding-left: 80rpx;
				box-sizing: border-box;
			}
			textarea{
				width: 600rpx;
				height: 160rpx;
				padding: 24rpx;
				box-sizing: border-box;
				background:rgba(243,244,245,1);
				border-radius:10rpx;
			}
			.public{
				margin-left: 34rpx;
				color: #B8B8B8;
				font-size: 32rpx;
			}
			.red{
				color: #F03644;
			}
		}
		.imgs{
			// display:flex;
			flex: 1;
			position: relative;
			.num{
				position: absolute;
				top: -4rpx;
				left: 80rpx;
				width: 36rpx;
				height: 22rpx;
				background:url(../../static/img/home_img_comment_bg@3x.png) no-repeat;
				background-size: 36rpx 22rpx;
				text-align:center;
				font-size: 18rpx;
				color: #fff;
				line-height: 22rpx;
			}
			>view:nth-child(1){
				width: 40rpx;
				height: 40rpx;
			}
			.item{
				width: 40rpx;
				height: 40rpx;
				margin-left: 54rpx;
			}
			
		}
	}
	.showCom{
		background: #fff !important;
		border-top: 1px solid #E7E7E7;
	}
	.showComInp{
		width: 702rpx !important;
		height: 80rpx !important;
		background: #F5F6F7 !important;
		
	}
</style>
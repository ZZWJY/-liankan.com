<template>
	<view class="quest">
		<scroll-view scroll-y style="height:calc(100vh - 90upx)">
			<view class="quest-item" v-for="(item,i) in data" :key="i" :id="'item'+i">
				<view v-if="item.check == 0"><text style="font-family: fz;">{{i+1}}.</text><text>{{item.problems}}{{item.check==0?'(单选)':'(多选)'}}</text></view>
				<radio-group @change="radioChange($event,item)" class="uni-list-cell-all" v-if="item.check == 0">
					<label  v-for="(items, index) in item.answer" :key="index" :class="['uni-list-cell-pd',item.sele == index?'sele':'']">
						<view>
							<radio :value="(index+'')" :checked="index === item.sele" />
						</view>
						<view>{{items}}</view>
						<image src="../../static/img/sele.png" v-if="item.sele == index"></image>
					</label>
				</radio-group>
				<view v-if="item.check == 1"><text style="font-family: fz;">{{i+1}}.</text>{{item.problems}}{{item.check==0?'(单选)':'(多选)'}}</view>
				<checkbox-group @change="radioChange($event,item)" class="uni-list-cell-all" v-if="item.check == 1">
					<label  v-for="(items, index) in item.answer" :key="index" :class="['uni-list-cell-pd',item.sele.indexOf(index+'')!=-1?'sele':'']">
						<view>
							<checkbox :value="(index+'')" :checked="index === item.sele" />
						</view>
						<view>{{items}}</view>
						<image src="../../static/img/sele.png" v-if="item.sele.indexOf(index+'')!=-1"></image>
					</label>
				</checkbox-group>
			</view>
			<view class="quest-item" :id="'item'+data.length">
				<view><text style="font-family: fz;">{{this.data.length+1}}.</text><text>感谢您的参与，最后您对平台有什么建议或意见，请告诉我们，我们会尽最大努力让您满意</text></view>
				<textarea value="" placeholder="请输入您的意见" v-model="value" placeholder-style="color: #B8B8B8;font-size: 30upx;"/>
				<text>{{value.length}}/500</text>
			</view>
			<view class="questBot">
				<view><image src="../../static/img/box.png"></image></view>
				<view class="sp">本次问卷中奖用户，我们会通过消息中心通知，中奖金币自动到账，请留意查看。</view>
			</view>
		</scroll-view>
		<view class="submit" v-if="!submit" @tap="toast">提交</view>
		<view class="submit red" v-if="submit" @tap="submitData">提交</view>
	</view>
</template>

<script>
	import sha1 from "sha1"
	export default {
		data() {
			return {
				data:[],
				current1: 0,
				value: '',
				is_submit: false,
				submit: false,
				token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEwMDIyLCJpc3MiOiJodHRwOlwvXC93d3cuYmliZW4uY29tIiwiaWF0IjoxNTc1NTQxNzY4LCJleHAiOjE1NzgxMzM3Njh9.QZZ5GKOPm9U7V4Ie3JIz2A9ZisgRnFC2h0aXzDKlZyQ'
			}
		},
		watch:{
			data:{
			　　handler(newVal,oldVal){
				let _this = this
					if(newVal.length>0){
						// console.log(1)
						for (var j=0;j<newVal.length;j++){
							if(newVal[j].check == 0){
								if(newVal[j].sele==undefined){
									_this.is_submit = false
									return false
								}
							}
							if(newVal[j].check == 1){
								if(newVal[j].sele[0]==undefined||newVal[j].sele.length==0){
									_this.is_submit = false
									this.submit = false
									return false
								}
							}
						}
						_this.is_submit = true
						if(this.value!=''){
							this.submit = true
						}
					}
			　　},
			　　deep:true
			},
			value(){
				if(this.is_submit&&this.value!=''){
					this.submit = true
				}else{
					this.submit = false
				}
			},
		},
		onLoad(params) {
			if(params.token!=undefined){
				this.token = params.token
			}
		},
		created(){
			this.initquect()
		},
		methods: {
			initquect(){
				let params = {
					// now_time	是	string	签名时间
					// sign	是	string	签名
					now_time:this.now_time(),
					limit: 4
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.decrypt(this.key)+threeparams).toUpperCase()
				params.sign = sign
				
				this.uniRequest.post('/v1/questionnaire-show.html',params).then(res=>{ 
					// console.log(res)
					this.data = res.data.data
					for(var i=0;i<this.data.length;i++){
						if(this.data[i].check == 0){
							this.$set(this.data[i],'sele',undefined)
						}else{
							this.$set(this.data[i],'sele',[undefined])
						}
						
					}
					// console.log(this.data)
				})	
			},
			toast(){
				uni.showToast({
					title: '全部做完才能领取奖励哦 ',
					icon: 'none'
				})
				// document.getElementById("item2").scrollIntoView()
				for (var j=0;j<this.data.length;j++){
					if(this.data[j].check == 0){
						if(this.data[j].sele==undefined){
							document.getElementById(`item${j}`).scrollIntoView()
							return false
						}
					}
					if(this.data[j].check == 1){
						if(this.data[j].sele[0]==undefined||this.data[j].sele.length==0){
							document.getElementById(`item${j}`).scrollIntoView()
							return false
						}
					}
				}
				let num = this.data.length
				
				document.getElementById(`item${num}`).scrollIntoView()
			},
			submitData(){
				// console.log(this.data)
				let arr=[]
				for(var z=0;z<this.data.length;z++){
					if(this.data[z].check == 0){
						arr[z] = this.data[z].sele
					}else{
						arr[z] = this.data[z].sele.join(',')
					}
				}
				let params = {
					// content	是	string	内容
					// answer	是	string	答案格式：[“1”,”2”,”3”,”4”,”3”,”1,4”,”2,5”,”5”]
					// now_time	是	string	签名时间
					// sign	是	string	签名
					content: this.value,
					answer: JSON.stringify(arr),
					now_time: this.now_time()
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.decrypt(this.key)+threeparams).toUpperCase()
				params.sign = sign
				// console.log(params)
				this.uniRequest.post('/v1/member-write.html',params,{
						headers:{
							'Authorization': this.token,
							// 'content-type': 'application/x-www-form-urlencoded'
						}
						
				}).then(res=>{
					if(res.data.status == 1){
						uni.showToast({
							title: '提交成功',
							icon: 'none'
						})
						window.location.href = '/task?redirect=true'
					}else{
						uni.showToast({
							title: res.data.message,
							icon: 'none'
						})
					}
				})
			},
			radioChange(e,item){
				// console.log(e,e.detail.value)
				// this.$set(this.data[i],'sele',e.detail.value)
				item.sele = e.detail.value
				
				// console.log(this.data)
			},
		}
	}
</script>

<style scoped lang="scss">
	.quest{
		.submit{
			width:750upx;
			height:90upx;
			background:rgba(226,226,226,1);
			color: #FFF;
			font-size: 32upx;
			text-align: center;
			line-height: 90upx;
			position: fixed;
			bottom: 0;
			left: 0;
		}
		.red{
			background:rgba(240,54,68,1);
		}
		>scroll-view:nth-child(1){
			padding: 20upx 24upx 0 24upx;
			box-sizing: border-box;
			::-webkit-scrollbar {
				width: 0;
				height: 0;
				background-color: transparent;
			} 
			.questBot{
				display: flex;
				margin-top: 42upx;
				padding-bottom: 20upx;
				box-sizing: border-box;
				view:nth-child(1){
					width: 50upx;
					height:50upx;
					display: flex;
					justify-content: center;
					align-items: center;
					image{
						width: 30upx;
						height: 30upx;
					}
				}
				
				.sp{
					color: #6C6C6C;
					font-size: 28upx;
					margin-left: 10upx;
				}
			}
			.quest-item{
				padding: 22upx 28upx;
				box-sizing: border-box;
				position: relative;
				>text:nth-child(3){
					position: absolute;
					color: #E0E0E0;
					font-size: 26upx;
					bottom: 20upx;
					right: 44upx;
				}
				textarea{
					margin-top: 30upx;
					padding: 24upx 28upx;
					box-sizing: border-box;
					width:642upx;
					height:260upx;
					background:rgba(248,248,248,1);
					border-radius:10upx;
					border:1px solid rgba(242,242,242,1);
				}
				view:nth-child(1){
					font-weight: bold;
					font-size: 34upx;
					color: #191110;
					display: flex;
					text{
						display: block;
						
					}
					text:nth-child(1){
						width: 7%;
						color: #F03644;
						font-size: 38upx;
					}
					text:nth-child(2){
						width: 90%;
					}
				}
				
				.uni-list-cell-all{
					display: flex;
					flex-wrap: wrap;
					.uni-list-cell-pd{
						display: inline-block;
						width:310upx;
						height:80upx;
						background:rgba(248,248,248,1);
						border-radius:10upx;
						border:1px solid rgba(242,242,242,1);
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top: 30upx;
						font-size: 32upx;
						color: #444343;
						position: relative;
						image{
							position: absolute;
							bottom: 0upx;
							right: 0upx;
							width: 44upx;
							height: 40upx;
						}
					}
					.uni-list-cell-pd:nth-child(2n){
						margin-left: 18upx;
					}
					// .uni-list-cell-pd:nth-child(n+3){
						
					// }
					.sele{
						background:rgba(255,241,242,1);
						border-radius:10px;
						border:1px solid rgba(240,54,68,1);
						color:#F03644
					}
				}
				
			}
		}
	}
</style>
<style scoped>
	.quest-item >>> .uni-radio-input{
		display: none;
	}
	.quest-item >>> .uni-checkbox-wrapper{
		display: none
	}
</style>

<template>
	<view class="content">
		<view class="">
			<view>
				<text>{{nH}}</text>
				<text>时</text>
				<text>{{nM}}</text>
				<text>分</text>
				<text>{{nS}}</text>
				<text>秒</text>
				<text>{{nMS}}</text>
			</view>
			 <view>
				<checkbox-group>
					<label>
						<checkbox value="cb" checked="true" color="#FFCC33" style="transform:scale(0.7)" />选中
					</label>
					<label>
						<checkbox value="cb" color="#FFCC33" style="transform:scale(0.7)" />未选中
					</label>
				</checkbox-group>
			</view>
		</view>
		<view class="item" @tap="goinvite">邀请好友界面</view>
		<view class="item" @tap="gomillion"> 年入百万计划 </view>
		<view class="item" @tap="goAspect"> 看点价值</view>
		<view class="item" @tap='goRank'>百万富豪榜</view>
		<view class="item" @tap='gosign'>签到展示</view>
		<view class="item" @tap='gopersonally'>手把手教学界面</view>
		<view class="item" @tap='gomake'>怎么赚看点</view>
		<view class="item" @tap='goupstart'>暴富秘籍</view>
		<view class="item" @tap='goquestionnaire'>问卷调查</view>
		<view class="item" @tap='gofeedback'>反馈与帮助</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nD: 0,
				nH: 0,
				nM: 0,
				nS: 0,
				nMS: 0
			}
		},
		onLoad() {
			
		},
		onShow(){
			// console.log(this.decrypt(this.key))
			this.GetRTime()
			setInterval(this.GetRTime, 10);
		},
		methods: {
			GetRTime()
			{
				let EndTime = 0
				let NowTime = new Date();
				if(NowTime.getHours()>=21){
					EndTime = new Date(NowTime.getFullYear(),NowTime.getMonth()+1,NowTime.getDate()+1,21,0)
				}else{
					EndTime = new Date(NowTime.getFullYear(),NowTime.getMonth()+1,NowTime.getDate(),21,0)
				}
				let nMS = EndTime.getTime() - NowTime.getTime();
				let nD = Math.floor(nMS / (1000 * 60 * 60 * 24));
				let nH = Math.floor(nMS / (1000 * 60 * 60)) % 24;
				let nM = Math.floor(nMS / (1000 * 60)) % 60;
				let nS = Math.floor(nMS / 1000) % 60;
				let nmS = Math.floor((nMS % 1000)/10) ;
				this.nD = nD<10?('0'+nD):nD
				this.nH = nH<10?('0'+nH):nH
				this.nM = nM<10?('0'+nM):nM
				this.nS = nS<10?('0'+nS):nS
				this.nMS = nmS<10?('0'+nmS):nmS;
			},
			goinvite(){
				uni.navigateTo({
					url:'/pages/inviteFriend/inviteFriend'
				})
			},
			gomillion(){
				uni.navigateTo({
					url: '/pages/million/million'
				})
			},
			goAspect(){
				uni.navigateTo({
					url: "../Aspect/Aspect"
				})
			},
			goRank(){
				uni.navigateTo({
					url: "../Rank/Rank"
				})
			},
			gosign(){
				uni.navigateTo({
					url: "../signShow/signShow"
				})
			},
			gopersonally(){
				uni.navigateTo({
					url: '../personallyTeach/personallyTeach'
				})
			},
			gomake(){
				uni.navigateTo({
					url: "../makeAspect/makeAspect"
				})
			},
			goupstart(){
				uni.navigateTo({
					url: '../upstart/upstart'
				})
			},
			goquestionnaire(){
				uni.navigateTo({
					url:'../questionnaire/questionnaire'
				})
			},
			gofeedback(){
				uni.navigateTo({
					url:'../feedbackHelp/feedbackHelp'
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.item{
		width: 100%;
		height: 60upx;
		background:#B8B8B8;
		color: #2a2a2a;
		text-align: center;
		line-height: 60upx;
		font-size: 32upx;
		margin-top: 40upx;
	}
</style>

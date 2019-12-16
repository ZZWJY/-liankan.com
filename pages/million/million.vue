<template>
	<view class="million">
		<view class="bg"></view>
		<view class="million-Top">
			<view class="million-CountDown">
				<view class="CountDown-Top">
					<view class="DownTitle">
						今日分红倒计时
					</view>
					<view class="DownTime">
						<text>{{nH}}</text>
						<text>时</text>
						<text>{{nM}}</text>
						<text>分</text>
						<text>{{nS}}</text>
						<text>秒</text>
						<text>{{nMS}}</text>
					</view>
					<view class="Down-hint">
						<view class="hint-Content">
							<text>倒计时结束,你的今日分红将自动发放至<text @tap="Memoney">个人钱包></text></text>
							<view> 天天领分红，轻松赚取年薪百万</view>
						</view>
					</view>
				</view>
				<view class="CountDown-Bottom">
					<view>
						<view>
							<view class="item">
								<image src="../../static/img/million_countdown_one@3x.png"></image>
								<text>平台用户越多，分红池越大</text>
							</view>
							<view class="line-item"></view>
						</view>
					</view>
					<view>
						<view class="item">
							<image src="../../static/img/million_countdown_two@3x.png"></image>
							<text>平台将每天20%的收益分配给看点持有者</text>
						</view>
						<view class="line-item"></view>
					</view>
					<view>
						<view class="item">
							<image src="../../static/img/million_countdown_three@3x.png"></image>
							<text>看点持有者还将享有平台总收益10%的年终分红</text>
						</view>
						<view class="line-item"></view>
					</view>
					<view>
						<view class="item">
							<image src="../../static/img/4.million_countdown_four@3x.png"></image>
							<text>人人都有机会轻松赚取年薪百万</text>
						</view>
						<view class="line-item"></view>
					</view>
				</view>
				
			</view>
		</view>
		<view class="million-content">
			<view class="million-Tab">
				<text>看点富豪榜</text>
				<text @tap="cost">看点价值</text>
			</view>
			<view class="Bonus-pools">
				<view>总分红池(元)</view>
				<view>{{pool.num_share_out_bonus}}</view>
			</view>
			<view class="million-info">
				<view>
					<view style="font-family: fz;">{{pool.yesterday_share_out_bonus}}<text>元</text></view>
					<view>昨日分红池</view>
				</view>
				<view>
					<view style="font-family: fz;">{{pool.look_value}}<text>元/个</text></view>
					<view>看点价值</view>
				</view>
				<view>
					<view style="font-family: fz;">{{pool.look_num}}<text>万</text></view>
					<view>看点总量</view>
				</view>
			</view>
			<view class="million-rank">
				<image :src="info.avatar||'../../static/img/million_title_decorate@3x.png'"></image>
				<text>排名</text>
			</view>
			<view class="million-Me" v-if="token">
				<view class="Me-info">
					<view>
						<view>{{info.nickname}}</view>
						<view>邀请{{info.invite_num}}人</view>
					</view>
					<view style="font-family: fz;">{{info.kd}}</view>
					<view style="font-family: fz;">{{info.annual_revenue|clickCount}}<text>{{info.annual_revenue>10000?'万':''}}元</text></view>
				</view>
				<view class="Me-Avatar">
					<view class="Me-rank">第1名</view>
					<image src="../../static/img/personal_default.png"></image>
				</view>
				
			</view>
			<view class="rankList-title">
				<text>排名</text>
				<text>用户</text>
				<text>看点</text>
				<text>
					预计年收益 
				</text>
				<image src="../../static/img/million_why@3x.png" @tap="annualEarnings"></image>
			</view>
			<view class="rankList-content">
				<view class="rank-Item" v-for="(item,i) in rank_data" :key="i">
					<view>
						<image src="../../static/img/million_one@3x.png" v-if="i==0"></image>
						<image src="../../static/img/million_two@3x.png" v-if="i==1"></image>
						<image src="../../static/img/million_three@3x.png" v-if="i==2"></image>
						<text v-if="i==3" style="font-family: fz;">4</text>
					</view>
					<view>
						<image :src="item.avatar||'../../static/img/personal_default.png'"></image>
					</view>
					<view>
						<view>{{item.nickname}}</view>
						<view>邀请{{item.invite_num}}人</view>
					</view>
					<view style="font-family: fz;">
						{{item.kd}}
					</view>
					<view>
						<text style="font-family: fz;">{{item.annual_revenue|clickCount}}</text>
						<text>万元</text>
					</view>
				</view>
				<view class="rank-Item-All" @tap="treasureTop">
					<text>查看TOP10看点财富榜</text>
					<image src="../../static/img/million_more@3x.png"></image>
				</view>
			</view>
			<view class="teach-Img">
				<image src="../../static/img/million_banner_why@3x.png" @tap="HowAspect"></image>
				<image src="../../static/img/million_banner_baofu@3x.png" @tap="Newupstart"></image>
			</view>
			<view class="three-Title">
				<image src="../../static/img/million_title_decorate@3x.png"></image>
				<text>简单3步 年薪百万</text>
			</view>
			<view class="million-Step">
				<view>
					<image src="../../static/img/million_step_one@3x.png"></image>
					<view>继续分享</view>
				</view>
				<image src="../../static/img/million_step_arrow@3x.png"></image>
				<view>
					<image src="../../static/img/million_step_two@3x.png"></image>
					<view>兑换看点</view>
				</view>
				<image src="../../static/img/million_step_arrow@3x.png"></image>
				<view>
					<image src="../../static/img/million_step_three@3x.png"></image>
					<view>坐等分红</view>
				</view>
			</view>
			<view class="million-slogan">
				<view class="sloganContent">抓住机会，越早参与，越早享受分红权益</view>
			</view>
			<view class="three-Title">
				<image src="../../static/img/million_title_decorate@3x.png"></image>
				<text>快邀请好友 坐享分红</text>
			</view>
			<view class="million-Option">
				<view class="Code-Title">您的专属邀请码</view>
				<view>
					<text style="font-family: fz;">{{code}}</text>
					<text @tap="copy">复制</text>
				</view>
				<view class="share-type">
					<view class="type-Content">
						<view @tap="millionCircle">
							<image src="../../static/img/million_friends@3x.png"></image>
							<view>朋友圈</view>
						</view>
						<view @tap="millionWechat">
							<image src="../../static/img/million_wechat@3x.png"></image>
							<view>微信好友</view>
						</view>
						<view @tap="millionQQ">
							<image src="../../static/img/million_qq@3x.png"></image>
							<view>QQ</view>
						</view>
						<view @tap="millionLink">
							<image src="../../static/img/million_link@3x.png"></image>
							<view>链接邀请</view>
						</view>
					</view>
					<view class="share-Hint">成功邀请好友，兑换成看点，即可坐享分红</view>
				</view>
			</view>
		</view>
		<view class="million-Footer">
			活动解释权归链看点APP所有
		</view>
	</view>
</template>

<script>
	import sha1 from "sha1"
	export default {
		data() {
			return {
				nD: 0,
				nH: 0,
				nM: 0,
				nS: 0,
				nMS: 0,
				rank_data:[],
				code: '--------',
				token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEwMDIyLCJpc3MiOiJodHRwOlwvXC93d3cuYmliZW4uY29tIiwiaWF0IjoxNTc1NTQxNzY4LCJleHAiOjE1NzgxMzM3Njh9.QZZ5GKOPm9U7V4Ie3JIz2A9ZisgRnFC2h0aXzDKlZyQ',
				info: {},
				pool: {}
			};
		},
		mounted(){
			this.GetRTime()
			this.initRank()
			this.inittreasure()
			setInterval(this.GetRTime, 10);
			
		},
		onLoad(params) {
			if(params.token!=undefined){
				this.token = params.token
			}
		},
		filters:{
			clickCount(value){
				if(value>10000){
					value = Math.round(value/1000)/10
				}
				return value
			}
		},
		methods:{
			GetRTime(){
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
			inittreasure(){
				let params = {
					// now_time	是	string	签名时间
					// sign	是	string	签名
					now_time:this.now_time(),
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.decrypt(this.key)+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post('/v1/treasure-data-show.html',params,{
						headers:{
							'Authorization': this.token,
							// 'content-type': 'application/x-www-form-urlencoded'
						}
						
				}).then(res=>{
					this.pool = res.data.data
					// console.log(res)
				})
			},
			initRank(){
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
				this.uniRequest.post('/v1/treasure-top.html',params,{
						headers:{
							'Authorization': this.token,
							// 'content-type': 'application/x-www-form-urlencoded'
						}
						
					}).then(res=>{ 
					if(res.data.status == 1){
						this.rank_data = res.data.data.member_data
						this.info = res.data.data.my_data[0]
					}
				})
			},
			Memoney(){
				window.location.href = '/Memoney'
			},
			cost(){
				window.location.href = '/watchCost'
			},
			copy(){
				window.location.href = '/millionCopy?code='+this.code
			},
			millionCircle(){
				window.location.href = '/millionCircle'
			},
			millionWechat(){
				window.location.href = '/millionWechat'
			},
			millionQQ(){
				window.location.href = '/millionQQ'
			},
			millionLink(){
				window.location.href = '/millionLink'
			},
			annualEarnings(){
				window.location.href = '/annualEarnings'
			},
			treasureTop(){
				window.location.href = '/treasureTop'
			},
			HowAspect(){
				window.location.href = '/pages/makeAspect/makeAspect'
			},
			Newupstart(){
				window.location.href = '/pages/upstart/upstart'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.million{
		.bg{
			width: 750upx;
			height: 200upx;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			background: linear-gradient(270deg,rgba(254,187,60,1) 0%,rgba(255,150,50,1) 100%);;
		}
		.million-Top{
			width: 750upx;
			height: 1150upx;
			background:url(../../static/img/million_bg@3x.png) no-repeat;
			background-color: linear-gradient(270deg,rgba(254,187,60,1) 0%,rgba(255,150,50,1) 100%);;
			background-size: 100% 100%;
			padding-top: 354upx;
			box-sizing: border-box;
			position: relative;
			.million-CountDown{
				width: 750upx;
				height: 772upx;
				background:url(../../static/img/million_countdown_bg@3x.png) no-repeat;
				background-size: 100% 100%;
				padding: 50upx 34upx;
				box-sizing: border-box;
				.CountDown-Top{
					text-align: center;
					font-size: 40upx;
					color: #2A2A2A;
					font-weight: bold;
				}
				.DownTime{
					text-align: center;
					text:nth-child(2n+1){
						display: inline-block;
						margin-top: 36upx;
						width: 82upx;
						height: 82upx;
						background:url(../../static/img/million_countdown_figure@3x.png) no-repeat;
						background-size: 100% 100%;
						text-align: center;
						line-height: 82upx;
						color: #fff;
						font-size: 48upx;
					}
					text:nth-child(2n){
						font-size: 32upx;
						color: #848484;
						margin-left: 20upx;
						margin-right: 26upx;
					}
				}
				.Down-hint{
					display: flex;
					justify-content: center;
					margin-top: 38upx;
					.hint-Content{
						width: 638upx;
						height: 104upx;
						background:url(../../static/img/million_countdown_explain_bg@3x.png) no-repeat;
						background-size: 100% 100%;
						padding: 10upx 32upx 10upx 32upx;
						box-sizing: border-box;
						text-align:center;
						color: #725528;
						font-size: 26upx;
						>text{
							text:nth-child(1){
								color: #FFA800;
								text-decoration: underline;
							}
						}
						view{
							color: #725528;
							font-size: 28upx;
						}
					}
				}
				.CountDown-Bottom{
					margin-top: 100upx;
					>view{
						height: 42upx;
						line-height: 42upx;
						padding-left: 10upx;
						color: #000000;
						font-size: 30upx;
						font-weight: bold;
						position: relative;
						.item{
							position: absolute;
							z-index: 2;
							image{
								width: 26upx;
								height: 30upx;
								margin-right: 6upx;
							}
							
						}
						
					}
					>view+view{
						margin-top: 30upx;
					}
					.line-item{
						position: absolute;
						bottom: 0upx;
						left: 0upx;
						background:linear-gradient(270deg,rgba(254,170,29,0) 0%,rgba(254,166,30,1) 100%);
						opacity:0.19;
						z-index: 1;
						
					}
					view:nth-child(1) .line-item{
						width:420upx;
						height:26upx;
					}
					view:nth-child(2) .line-item{
						width:560upx;
						height:26upx;
					}
					view:nth-child(3) .line-item{
						width:658upx;
						height:26upx;
					}
					view:nth-child(4) .line-item{
						width:420upx;
						height:26upx;
					}
				}
			}
		}
		.million-content{
			width: 750upx;
			min-height: 356upx;
			background: rgba(255,255,255,1);
			border-radius: 20upx;
			margin-top: -20upx;
			padding: 38upx 24upx 0 24upx;
			box-sizing: border-box;
			.rankList-content{
				.rank-Item{
					background: #F9F9F9;
					height: 165upx;
					width: 702upx;
					border-bottom: 1px solid #EDEDED;
					padding: 26upx 0; 
					box-sizing: border-box;
					display: flex;
					align-items: center;
					>view:nth-child(1){
						image{
							width: 36upx;
							height: 40upx;
						}
						text{
							display: inline-block;
							width: 36upx;
							height: 40upx;
							line-height: 40upx;
							text-align: center;
							color:#848484;
							font-size: 32upx;
						}
					}
					>view:nth-child(2){
						margin-left: 16upx;
						margin-right: 18upx;
						image{
							width: 88upx;
							height: 88upx;
							border-radius: 50%;
						}
					}
					view:nth-child(3){
						display: flex;
						flex-direction: column;
						view:nth-child(1){
							color: #2A2A2A;
							font-size: 26upx;
							width: 194upx;
							text-align: left;
							text-overflow :ellipsis; /*让截断的文字显示为点点。还有一个值是clip意截断不显示点点*/
							white-space :nowrap; /*让文字不换行*/
							overflow : hidden; /*超出要隐藏*/
						}
						view:nth-child(2){
							margin-top: 14upx;
							color: #A72D36;
							font-size: 22upx;
						}
					}
					view:nth-child(4){
						width: 100upx;
						text-align: right;
						color: #2A2A2A;
						font-size: 32upx;
						font-weight: bold;
					}
					view:nth-child(5){
						width: 226upx;
						text-align: right;
						color: #2A2A2A;
						font-size: 32upx;
						font-weight: bold;
						text:nth-child(2){
							font-size: 22upx;
							font-weight: 400;
						}
					}
				}
				.rank-Item-All{
					background: #F9F9F9;
					height: 82upx;
					width: 702upx;
					border-bottom: 1px solid #EDEDED;
					display: flex;
					justify-content: center;
					align-items: center;
					box-sizing: border-box;
					color: #B8B8B8;
					font-size: 28upx;
					image{
						width: 26upx;
						height: 26upx;
						margin-left: 12upx;
						position: relative;
						top: 2upx;
					}
				}
			}
			.million-Tab{
				display: flex;
				justify-content: center;
				text{
					display: inline-block;
					width:260upx;
					height:84upx;
					border-radius:10upx;
					color: #6E5758;
					font-size: 32upx;
					text-align: center;
					line-height: 84upx;
					background:rgba(253,241,242,1);
				}
				text:nth-child(1){
					color: #fff;
					font-size: 36upx;
					background:rgba(240,54,68,1);
				}
			}
			.Bonus-pools{
				margin-top: 44upx;
				width: 702upx;
				height: 226upx;
				background:url(../../static/img/million_bonus_pool_bg@3x.png) no-repeat;
				background-size: 100% 100%;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				view:nth-child(1){
					color: #fff;
					font-size: 30upx;
				}
				view:nth-child(2){
					font-size: 74upx;
					line-height: 94upx;
					color: #fff;
				}
			}
			.million-info{
				padding: 24upx 38upx;
				box-sizing: border-box;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				>view{
					>view:nth-child(2){
						text-align: center;
						font-size: 24upx;
						color: #B8B8B8;
					}
					>view:nth-child(1){
						text-align: center;
						font-size: 38upx;
						color: #2A2A2A;
						text{
							font-size: 24upx;
						}
					}
				}
			}
			.million-rank{
				margin-top: 34upx;
				image{					
					width: 26upx;
					height: 16upx;
				}
				text{
					color: #2A2A2A;
					font-size: 36upx;
					margin-left: 18upx;
					font-weight: bold;
				}
			}
			.million-Me{
				height: 120upx;
				width: 702upx;
				margin-top: 32upx;
				display: flex;
				justify-content: flex-end;
				position: relative;
				.Me-info{
					width: 645upx;
					height: 120upx;
					background: rgba(255,245,246,1);
					border-radius: 20upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-left: 82upx;
					padding-right: 20upx;
					box-sizing: border-box;
					>view{
						color: #2A2A2A;
						font-size: 38upx;
						font-weight: bold;
						text{
							font-size: 24upx;
							font-weight: 400;
						}
					}
					>view:nth-child(1){
						font-size: 28upx;
						font-weight: 400;
						view:nth-child(2){
							margin-top: 12upx;
							font-weight: bold;
							font-size: 22upx;
							color: #F03644;
						}
					}
				}
				.Me-Avatar{
					position: absolute;
					left: 0upx;
					top: 0upx;
					z-index: 10;
					image{
						width: 108upx;
						height: 108upx;
						border-radius: 50%;
					}
					text-align: center;
				}
				.Me-rank{
					position: absolute;
					width: 108upx;
					padding: 4upx 8upx;
					top: -12upx;
					background: rgba(240,54,68,1);
					border-radius: 12upx;
					z-index: 15;
					color: #fff;
					font-size: 22upx;
					text-align: center;
					line-height: 26upx;
					box-sizing: border-box;
				}
			}
			.rankList-title{
				width:702upx;
				height:52upx;
				background:rgba(244,244,244,1);
				border-radius:20upx 20upx 0 0;
				margin-top: 20upx;
				display: flex;
				align-items: center;
				text{
					color: #B8B8B8;
					font-size: 24upx;
				}
				text:nth-child(1){
					margin-left: 24upx;
				}
				text:nth-child(2){
					margin-left: 88upx;
				}
				text:nth-child(3){
					margin-left: 194upx;
				}
				text:nth-child(4){
					margin-left: 82upx;
				}
				image{
					width: 22upx;
					height: 22upx;
					margin-left: 8upx;
					position: relative;
					top: 2upx;
				}
			}
			.teach-Img{
				display: flex;
				justify-content: space-between;
				image{
					width: 340upx;
					height: 180upx;
					margin-top: 30upx;
				}
			}
			.three-Title{
				display: flex;
				align-items:  center;
				margin-top: 44upx;
				image{
					width: 26upx;
					height: 16upx;
				}
				text{
					font-size: 36upx;
					color: #2A2A2A;
					font-weight: bold;
					margin-left: 20upx;
				}
			}
			.million-Step{
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 38upx;
				image{
					width: 74upx;
					height: 26upx;
				}
				>view{
					display: flex;
					flex-direction: column;
					align-items: center;
					image{
						width: 98upx;
						height: 108upx;
					}
					>view{
						text-align: center;
						color: #2A2A2A;
						font-size: 28upx;
						margin-top: 12upx;
					}
				}
			}
			.million-slogan{
				display: flex;
				justify-content: center;
				margin-top: 26upx;
				.sloganContent{
					width: 690upx;
					height: 78upx;
					background: url(../../static/img/million_step_bg@3x.png) no-repeat;
					background-size: 100% 100%;
					text-align: center;
					line-height: 78upx;
					color: #2A2A2A;
					font-size: 32upx;
					font-weight: bold;
				}
			}
			.million-Option{
				width: 702upx;
				height: 402upx;
				background:url(../../static/img/million_code_bg@3x.png) no-repeat;
				background-size: 100% 100%;
				margin-top: 26upx;
				padding: 20upx;
				box-sizing: border-box;
				.Code-Title{
					color: #fff;
					font-size: 26upx;
				}
				>view:nth-child(2){
					font-size: 70upx;
					color: #FFF;
					line-height: 86upx;
					display: flex;
					align-items: center;
					text:nth-child(2){
						display: inline-block;
						width: 122upx;
						height: 56upx;
						background: rgba(246,122,114,1);
						border-radius: 35upx;
						font-size: 28upx;
						color: #FFC0BA;
						text-align: center;
						line-height: 56upx;
						margin-left: 68upx;
					}
				}
				.share-type{
					width: 662upx;
					height: 222upx;
					background: rgba(255,255,255,1);
					border-radius: 20upx;
					margin-top: 18upx;
					padding: 18upx 28upx;
					box-sizing: border-box;
					.type-Content{
						display: flex;
						justify-content: space-between;
						>view{
							display: flex;
							flex-direction: column;
							align-items: center;
							image{
								width: 88upx;
								height: 88upx;
							}
							>view{
								font-size: 22upx;
								color: #2A2A2A;
							}
						}
					}
					.share-Hint{
						text-align: center;
						color: #F03644;
						font-size: 30upx;
						margin-top: 22upx;
					}
				}
			}
		}
		.million-Footer{
			height: 100upx;
			width: 750upx;
			text-align: center;
			line-height: 100upx;
			color: #E7E8E9;
			font-size: 30upx;
		}
		
	}
</style>

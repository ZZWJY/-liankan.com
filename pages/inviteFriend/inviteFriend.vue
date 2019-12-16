<template>
	<view class='container'>
		<view class='invite'>
			<view class="invite-swipe">
				<view class="swiper-all" :style="transition?'transform:translateY('+'-'+index*56+'upx);transition: 1s;':''">
					<view class="swiper-item" v-for="(item,i) in arr" :key= 'i'> 
						<image src="../../static/img/invite_notice@3x.png" mode=""></image>
						<view class="swiper-title">
							{{item}}
						</view>
					</view>
					<!-- <view class="swiper-item">
						<image src="../../static/img/invite_notice@3x.png" mode=""></image>
						<view class="swiper-title">
							少年的你10分钟前 邀请了1个好友 获得8.8元
						</view>
					</view>
					<view class="swiper-item">
						<image src="../../static/img/invite_notice@3x.png" mode=""></image>
						<view class="swiper-title">
							少年的你10分钟前 邀请了1个好友 获得8.8元
						</view>
					</view>
					<view class="swiper-item">
						<image src="../../static/img/invite_notice@3x.png" mode=""></image>
						<view class="swiper-title">
							少年的你10分钟前 邀请了1个好友 获得8.8元
						</view>
					</view>
					<view class="swiper-item">
						<image src="../../static/img/invite_notice@3x.png" mode=""></image>
						<view class="swiper-title">
							少年的你10分钟前 邀请了1个好友 获得8.8元
						</view>
					</view> -->
				</view>
			</view>
			<view class="activity" @tap="activity">活动规则</view>
			<view class="inviteCode">
				<view class="whatinviteCode right" @tap="share">
					什么是邀请码
				</view>
				<view class="MinviteTile">
					我的邀请码
				</view>
				<view class="inviteCodeNum" style="font-family: fz">
					{{inviteCode}}
					<text @tap="copy">复制</text>
				</view>
			</view>
			<view class="inviteEarnings">
				<view class="eEarningsTitle">
					<view class="title">邀请越多，可享躺赚收益</view>
					<view class="titleBottom"></view>
				</view>
				<view class="EarningsOption">
					<image src="../../static/img/notice_explain_red@3x.png" mode=""></image>
					<view class="OptionTitle">
						当个人等级达到星耀矿工以上，最高可享受好友总收益的20%
						（赚钱小技巧：邀请越多，升级越快！）
					</view>
				</view>
			</view>
			<view class="how-invite">
				<view class="eEarningsTitle">
					<view class="title">怎么邀请好友？</view>
					<view class="titleBottom"></view>
					<view class="meFriend" @tap="Mefriend">我的好友</view>
				</view>
				<view class="howStep">
					<view>
						<image src="../../static/img/notice_why_share@3x.png"></image>
						<view>任意页面</view>
						<view>分享给好友</view>
					</view>
					<image src="../../static/img/notice_why_arrow@3x.png"></image>
					<view>
						<image src="../../static/img/notice_why_download@3x.png"></image>
						<view>好友通过</view>
						<view>链接下载安装</view>
					</view>
					<image src="../../static/img/notice_why_arrow@3x.png"></image>
					<view>
						<image src="../../static/img/notice_why_reap@3x.png"></image>
						<view>好友登录阅读</view>
						<view>双方获得金币</view>
					</view>
				</view>
			</view>
			<view class="invite-skill">
				<view class="eEarningsTitle">
					<view class="title">邀请小技巧</view>
					<view class="titleBottom"></view>
				</view>
				<view class="skill-title">
					成功率提升
					<text>200%</text>
				</view>
				<view class="skill-substep">
					<view class="substep-item">
						<view class="substep-num" style="font-family: fz">1</view>
						<view class="substep-content">邀请你的家人、朋友、同事和同学成功率最高</view>
					</view>
					<view class="substep-item">
						<view class="substep-num" style="font-family: fz">2</view>
						<view class="substep-content">分享到3个以上微信群/qq群，成功邀请的几率 提升<text>200%</text></view>
					</view>
					<view class="substep-item">
						<view class="substep-num" style="font-family: fz">3</view>
						<view class="substep-content">可以告诉邀请的朋友：注册可领现金红包，更能参加百万分红</view>
					</view>
					<view class="substep-item" >
						<view class="substep-num" style="font-family: fz">4</view>
						<view class="substep-content">越早参与，邀请人数越多，奖励越大</view>
					</view>
				</view>
				<view class="skill-teach" @tap="teachInvite">
					<view class="teach-content">手把手教你邀请好友</view>
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
				inviteCode: '--------',
				token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEwMDIyLCJpc3MiOiJodHRwOlwvXC93d3cuYmliZW4uY29tIiwiaWF0IjoxNTc1NTQxNzY4LCJleHAiOjE1NzgxMzM3Njh9.QZZ5GKOPm9U7V4Ie3JIz2A9ZisgRnFC2h0aXzDKlZyQ',
				info: {},
				arr:[
					'少年的你10分钟前 邀请了1个好友 获得8.8元',
					'少年的你10分钟前 邀请了1个好友 获得8.8元',
					'少年的你10分钟前 邀请了1个好友 获得8.8元',
					'少年的你10分钟前 邀请了1个好友 获得8.8元',
					'少年的你10分钟前 邀请了1个好友 获得8.8元',
					'少年的你10分钟前 邀请了1个好友 获得8.8元',
					'少年的你10分钟前 邀请了1个好友 获得8.8元',
					'少年的你10分钟前 邀请了1个好友 获得8.8元'
				],
				index: 0,
				timer: undefined,
				transition: true
			};
		},
		onLoad(params) {
			if(params.token!=undefined){
				this.token = params.token
			}
			this.timer = setInterval(()=>{
				++this.index
			},2000)
		},
		mounted(){
			this.initInfo()
		},
		watch:{
			index(){
				// console.log(this.index,this.arr.length-1)
				if(this.index==(this.arr.length-1)){
					setTimeout(()=>{
						this.transition = false
						this.index=0
						setTimeout(()=>{
							this.transition = true
						},1000)
					},1000)
				}
			}
		},
		methods:{
			initInfo(){
				let params = {
					// now_time	是	string	签名时间
					// sign	是	string	签名
					now_time:this.now_time(),
				}
				let twoparams = this.objKeySort(params)
				let threeparams = this.stringify(twoparams)
				let sign = sha1(this.decrypt(this.key)+threeparams).toUpperCase()
				params.sign = sign
				this.uniRequest.post('/v1/member-info.html',params,{
						headers:{
							'Authorization': this.token,
							// 'content-type': 'application/x-www-form-urlencoded'
						}
						
					}).then(res=>{
						this.info = res.data.data
						this.inviteCode = this.info.code
						// console.log(res)
					})
			},
			share(){
				window.location.href = '/inviteDescribe'
			},
			copy(){
				window.location.href = "/copy?inviteCode="+this.inviteCode
			},
			Mefriend(){
				window.location.href = '/friendList'
			},
			teachInvite(){
				window.location.href = '/teachInvite'
			},
			activity(){
				window.location.href = '/activity'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		.invite{
			position: relative;
			background: url(../../static/img/invite_bg@3x.png) no-repeat;
			background-size: 100% 100%;
			width: 750upx;
			padding: 530upx 24upx 0;
			box-sizing: border-box;
			position: relative;
			height: 2414upx;
			.activity{
				width:126upx;
				height:50upx;
				background:rgba(0,0,0,.3);
				border-radius:200upx 0 0 200upx;
				position: absolute;
				top: 88upx;
				right: 0;
				color: #CEC7DA;
				font-size: 22upx;
				text-align: center;
				line-height: 50upx;
			}
			.invite-swipe{
				position: absolute;
				width:750upx;
				height:56upx;
				left: 0upx;
				top: 0;
				background:linear-gradient(302deg,rgba(58,16,161,0.79) 0%,rgba(43,54,179,0.79) 100%);
				overflow: hidden;
				.swiper-all{
					.swiper-item{
						display: flex;
						justify-content: center;
						align-items: center;
						height:56upx;
						image{
							width: 22upx;
							height: 26upx;
						}
						.swiper-title{
							margin-left: 14upx;
							color: #BDAEFF;
							font-size: 24upx;
						}
					}
				}
				
			}
			.inviteCode{
				width: 702upx;
				height: 220upx;
				background: url(../../static/img/notice_code_bg@3x.png) no-repeat;
				background-size: 100% 100%;
				padding: 6upx 6upx 0upx 30upx;
				box-sizing: border-box;
				.whatinviteCode{
					width:190upx;
					height:56upx;
					background:rgba(237,214,202,1);
					border-radius:0upx 14upx 0upx 0upx;
					color: #4E2E1D;
					font-size: 24upx;
					text-align: center;
					line-height: 56upx;
				}
				.MinviteTile{
					margin-top:44upx;
					color: #4E2E1D;
					font-size: 26upx;
				}
				.inviteCodeNum{
					color: #4E2E1D;
					font-size: 76upx;
					line-height: 94upx;
					margin-top: 12upx;
					font-weight: bold;
					display: flex;
					align-items: center;
					text{
						font-weight: 400;
						font-size: 28upx;
						color: #804E33;
						display: inline-block;
						text-align: center;
						line-height: 56upx;
						width: 122upx;
						height: 56upx;
						background: rgba(234,195,173,1);
						border-radius: 35upx;
						margin-left: 36upx;
					}
				}
			}
			.inviteEarnings{
				width: 702upx;
				height: 430upx;
				background:url(../../static/img/notice_explain_bg@3x.png) no-repeat;
				background-size: 100% 100%;
				margin-top: 22upx;
				padding: 28upx 0;
				box-sizing: border-box;
				.eEarningsTitle{
					color: #F03C36;
					font-size: 36upx;
					height: 50upx;
					line-height: 50upx;
					font-weight: bold;
					margin-left: 30upx;
					position: relative;
					.title{
						position: absolute;
						z-index: 2
					}
					.titleBottom{
						width:384upx;
						height:26upx;
						position: absolute;
						bottom: 0upx;
						left: 30upx;
						z-index: 1;
						background:rgba(254,217,209,0.69);
					}
				}
				.EarningsOption{
					margin-top: 30upx;
					display: flex;
					align-items: center;
					flex-direction: column;
					image{
						width: 562upx;
						height: 206upx;
					}
					.OptionTitle{
						width: 600upx;
						height: 64upx;
						color: #CC8F68;
						font-size: 22upx;
						margin-top: 30upx;
					}
				}
			}
			.how-invite{
				width: 702upx;
				height: 336upx;
				box-sizing: border-box;
				background: url(../../static/img/notice_why_bg@3x.png) no-repeat;
				background-size: 100% 100%;
				margin-top: 30upx;
				padding: 28upx 46upx 42upx 30upx;
				.eEarningsTitle{
					color: #F03C36;
					font-size: 36upx;
					height: 50upx;
					line-height: 50upx;
					font-weight: bold;
					position: relative;
					.title{
						position: absolute;
						z-index: 2
					}
					.titleBottom{
						width: 210upx;
						height: 26upx;
						position: absolute;
						bottom: 0upx;
						left: 30upx;
						z-index: 1;
						background: rgba(254,217,209,0.69);
					}
					.meFriend{
						width: 176upx;
						height: 56upx;
						background: rgba(234,195,173,1);
						border-radius: 35upx;
						position: absolute;
						right: 0;
						color: #804E33;
						font-size: 28upx;
						text-align: center;
						line-height: 56upx;
					}
				}
				.howStep{
					margin-top: 44upx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					>image{
						width: 80upx;
						height: 28upx;
						position: relative;
						top: -36upx;
					}
					>view{
						display: flex;
						flex-direction: column;
						align-items: center;
						image{
							width: 84upx;
							height: 90upx;
							margin-bottom: 12upx;
						}
						view{
							color: #2A2A2A;
							font-size: 24upx;
							text-align: center
						}
					}
				}
			}
			.invite-skill{
				width: 702upx;
				height: 776upx;
				background:url(../../static/img/notice_skill_bg@3x.png) no-repeat;
				background-size: 100% 100%;
				margin-top: 30upx;
				box-sizing: border-box;
				padding: 28upx 26upx 48upx 30upx;
				.eEarningsTitle{
					color: #F03C36;
					font-size: 36upx;
					height: 50upx;
					line-height: 50upx;
					font-weight: bold;
					position: relative;
					.title{
						position: absolute;
						z-index: 2
					}
					.titleBottom{
						width: 162upx;
						height: 26upx;
						position: absolute;
						bottom: 0upx;
						left: 30upx;
						z-index: 1;
						background: rgba(254,217,209,0.69);
					}
				}
				.skill-title{
					color: #2A2A2A;
					font-size: 40upx;
					font-weight: bold;
					line-height: 56upx;
					margin-top: 24upx;
					text{
						color: #F03644;
					}
				}
				.skill-substep{
					.substep-item{
						margin-top: 20upx;
						background:linear-gradient(90deg,rgba(252,232,222,1) 0%,rgba(255,217,195,1) 100%);
						border-radius:8px;
						border:2px solid;
						border-image:linear-gradient(90deg, rgba(255,229,215,1), rgba(253,203,176,1)) 2 2;
						padding: 16upx;
						box-sizing: border-box;
						color: #4E2E1D;
						font-size: 28upx;
						display: flex;
						.substep-num{
							width: 5%;
							font-weight: bold;
						}
						.substep-content{
							width: 95%;
							text{
								color: #F03644
							}
						}
					}
				}
				.skill-teach{
					display: flex;
					justify-content: center;
					margin-top: 30upx;
					.teach-content{
						width: 552upx;
						height: 80upx;
						background: rgba(234,195,173,1);
						border-radius: 35upx;
						color: #804E33;
						font-size: 32upx;
						text-align: center;
						line-height: 80upx;
					}
				}
			}
		}
	}
</style>

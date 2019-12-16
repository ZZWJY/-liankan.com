<template>
	<view class="aspect">
		<view class="aspect-value">
			<view class="aspect-title">
				<image src="../../static/img/million_title_decorate@3x.png"></image>
				<text>1看点价值</text>
			</view>
			<view>{{look_worth[0]==undefined?'':look_worth[0][0]}}<view>坐享收益</view></view>
			<view>{{look_worth[0]==undefined?'':look_worth[0][1]}}<text></text><view>平台分红</view></view>
			<view>{{look_worth[0]==undefined?'':look_worth[0][2]}}<view>收益共享</view></view>
		</view>
		<view class="aspect-data">
			<view class="data-Title">分红数据</view>
			<view class="data-content">
				<view>
					<view class="verticar">分红池 (万)</view>
					<view>
						<!-- <view id="Chart" style="width: 90%;height:300upx;" ></view> -->
						<view class="qiun-charts">
									<!--#ifdef MP-ALIPAY -->
							<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio" :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart.stop="touchLineA" @touchmove.stop="moveLineA" @touchend.stop="touchEndLineA"></canvas>
							<!--#endif-->
							<!--#ifndef MP-ALIPAY -->
							<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart.stop="touchLineA" @touchmove.stop="moveLineA" @touchend.stop="touchEndLineA"></canvas>
							<!--#endif-->
						</view>
						<view>看点总量(万)</view>
					</view>
				</view>
				<view class="aspect-data-info">
					<view class="line-Top"></view>
					<view class="data-info">
						<view>
							<view style="font-family: fz">{{treasure_data.look}} <text> 元/个</text></view>
							<view>看点价值</view>
						</view>
						<view>
							<view style="font-family: fz">{{treasure_data.look_num}}<text> 万</text></view>
							<view>看点总量</view>
						</view>
					</view>
				</view>
			</view>
			<view class="aspect-Why">
				<view class="aspect-title">
					<image src="../../static/img/million_title_decorate@3x.png"></image>
					<text>2 如何能年入百万</text>
				</view>
				<view class="why-content">
					<view class="why-item">
						<image src="../../static/img/value_title_tall_bg@3x.png"></image>
						<view>{{year_million[0]==undefined?'':year_million[0][0]}}</view>
					</view>
					<view class="why-item">
						<image src="../../static/img/value_title_bg@3x.png"></image>
						<view>{{year_million[0]==undefined?'':year_million[0][1]}}</view>
					</view>
					<view class="why-item">
						<image src="../../static/img/value_title_three_bg@3x.png"></image>
						<view>{{year_million[0]==undefined?'':year_million[0][2]}}</view>
					</view>
				</view>
			</view>
			<view class="aspect-what">
				<view class="aspect-title">
					<image src="../../static/img/million_title_decorate@3x.png"></image>
					<text>3 看点是什么</text>
				</view>
				<view class='what-content'>
					<view class="what-item">
						{{looks[0]==undefined?'':looks[0][0]}}
					</view>
					<view class="what-item">
						{{looks[0]==undefined?'':looks[0][1]}}
					</view>
					<view class="what-item">
						{{looks[0]==undefined?'':looks[0][2]}}
					</view>
					<view class="what-item">
						{{looks[0]==undefined?'':looks[0][3]}}
					</view>
				</view>
			</view>
			<view class="aspect-Bq">
				活动解释权归链看点APP所有
			</view>
		</view>
	</view>
</template>

<script>
	import sha1 from "sha1"
	// import echarts from 'echarts'
	import uCharts from '@/static/js/u-charts.js';
	// require('echarts/lib/component/tooltip');
	var _self;
	var canvaLineA=null;
	var lastMoveTime=null;//最后执行移动的时间戳
	export default {
		data() {
			return {
				look_worth:[],
				myChart:{},
				year_million:[],
				looks:[],
				treasure_data:{},
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				textarea:'',
				Interactive:'',//交互显示的数据
			}
		},
		onLoad(){
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function (res) {
					if(res.pixelRatio>1){
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio =2;
					}
				}
			});
			//#endif
			this.cWidth=uni.upx2px(650);
			this.cHeight=uni.upx2px(300);
			// _self.showLineA("canvasLineA")
			this.initChartData()
		},
		mounted(){
			
		},
		methods: {
			initChartData(){
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
				this.uniRequest.post('/v1/look-worth.html',params).then(res=>{
					console.log(res)
					this.look_worth = res.data.data.look_worth
					this.year_million = res.data.data.year_million
					this.looks = res.data.data.looks
					this.treasure_data = res.data.data.treasure_data
					console.log(JSON.stringify(res.data.data.treasure_data.link))
					this.link = res.data.data.treasure_data.link
					let x = []
					let y = []
					console.log(this.link)
						for (var z=0;z<this.link.length;z++){
							x.push(this.link[z][0])
							y.push(this.link[z][1])
						}
						console.log(x,y)
						_self.showLineA("canvasLineA",x,y)
						// console.log(res)
						// this.myChart = echarts.init(document.getElementById('Chart'));
						// app.title = '多 Y 轴示例';
						// echarts.init(document.getElementById('Chart')).setOption({
						// 	xAxis: {
						// 		axisLine:{                 //设置X坐标的样式，这里设置的是白色
								
						// 			lineStyle:{
						// 				color:'#B8B8B8',
						// 				fontSize: '24upx'
						// 			}
						// 		},
						// 		// data: [1,5,10,50],
						// 		// data: res.data.data.categories
						// 	},
						// 	grid: {
						// 		 left: '3%',   //图表距边框的距离
						// 		 right: '2%',
						// 		 bottom: '3%',
						// 		 top: '4%',
						// 		 containLabel: true
						// 	},
						// 	yAxis: {
						// 		axisLine:{                 //设置X坐标的样式，这里设置的是白色
						// 			lineStyle:{
						// 				color:'#B8B8B8',
						// 				fontSize: '24upx'
						// 			}
						// 		},
						// 	},
						// 	tooltip:{
						// 	 	trigger: 'item',
						// 	 	axisPointer: {
						// 			type: 'cross'
						// 		},
						// 		formatter:function(params){
						// 			console.log(params)
						// 			return params
						// 		}
						// 	},
						// 	series: [{
						// 		// 根据名字对应到相应的系列
						// 		name: 'total',
						// 		type: 'line',
						// 		data: res.data.data.treasure_data.link,
						// 		itemStyle: {
						// 			normal: {
						// 				color:'#F03644',
						// 				label: {
						// 				color:'#000', //字的颜色
						// 				borderColor: '#A618FF',  //拐点边框颜色
						// 				// show: true  //设置这个就会把值显示在图表上
						// 				},
						// 				lineStyle:{
						// 					color:'#F03644'
						// 				}
						// 			}
						// 		},
						// 		label:{
						// 			show:true
						// 		},
						// 		// hoverAnimation: true
						// 	}]
						// });
					
				})
			},
			showLineA(canvasId,x,y){
				canvaLineA=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'line',
					colors:['#F03644', '#f04864', '#8543e0', '#90ed7d'],
					fontSize:11,
					padding:[15,15,0,15],
					// legend:{
					// 	show:true,
					// 	padding:5,
					// 	lineHeight:11,
					// 	margin:0,
					// },
					dataLabel:false,
					dataPointShape:true,
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					// ["5", "10", "15", "30", "50", "80"]
					categories: x,
					legend:{show:false},
					series: [{
								"name": "看点",
								"data": y
							}],
					animation: true,
					xAxis: {
						type:'grid',
						gridColor:'#E5E5E5',
						gridType:'dash',
						dashLength:1,
						//disableGrid:true
					},
					yAxis: {
						gridType:'dash',
						gridColor:'#CCCCCC',
						dashLength:1,
					},
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					extra: {
						line:{
							type: 'straight'
						},
						tooltip:{
							showBox:true,//是否显示半透明黑色的提示区域
							bgColor:'#000000',//主体背景颜色
							bgOpacity:0.7,//背景颜色透明度
							gridType:'solid',//辅助线类型（虚线）
							dashLength:5,//虚线单段长度
							gridColor:'#FFA6AC',//辅助线颜色
							fontColor:'#FFFFFF',//主体文字颜色
							// horizentalLine:true,//是否显示横向辅助线
							// xAxisLabel:true,//是否显示X轴辅助标签
							yAxisLabel:true,//是否显示Y轴辅助标签
							labelBgColor:'#DFE8FF',//标签背景颜色
							labelBgOpacity:0.95,//背景颜色透明度
							labelFontColor:'#666666'//标签文字颜色
						},
					}
				});
				
			},
			touchLineA(e) {
				lastMoveTime=Date.now();
			},
			moveLineA(e){
				let _this = this
				let currMoveTime = Date.now();
				let duration = currMoveTime - lastMoveTime;
				if (duration < Math.floor(1000 / 60)) return;//每秒60帧
				lastMoveTime = currMoveTime;
				
				let currIndex=canvaLineA.getCurrentDataIndex(e);
				if(currIndex>-1&&currIndex<canvaLineA.opts.categories.length){
					let riqi=canvaLineA.opts.categories[currIndex];
					let leibie=canvaLineA.opts.series[0].name;
					let shuju=canvaLineA.opts.series[0].data[currIndex];
					this.Interactive=leibie+':'+riqi+'-'+shuju+'元';
				}
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						console.log(item)
						return _this.link[currIndex][2] +"\n"+category+ ' ' + item.name + ':' + item.data 
					}
				});
			},
			touchEndLineA(e){
				let _this = this
				let currIndex=canvaLineA.getCurrentDataIndex(e);
				if(currIndex>-1&&currIndex<canvaLineA.opts.categories.length){
					let riqi=canvaLineA.opts.categories[currIndex];
					let leibie=canvaLineA.opts.series[0].name;
					let shuju=canvaLineA.opts.series[0].data[currIndex];
					this.Interactive=leibie+':'+riqi+'-'+shuju+'元';
				}
				console.log( _this.link[currIndex][2])
				canvaLineA.touchLegend(e);
				canvaLineA.showToolTip(e, {
					format: function (item, category) {
						// console.log(e,item,category)
						return _this.link[currIndex][2] + '\n'+category + '万/' + item.data +'万'
					}
				});
			},
			changeData(){
				if(isJSON(_self.textarea)){
					let newdata=JSON.parse(_self.textarea);
					canvaLineA.updateData({
						series: newdata.series,
						categories: newdata.categories
					});
				}else{
					uni.showToast({
						title:'数据格式错误',
						image:'../../../static/images/alert-warning.png'
					})
				}
			}
		}
	}
</script>
 
<style scoped lang="scss">
	.qiun-charts {
		width: 650upx;
		height: 300upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		width: 650upx;
		height: 300upx;
		background-color: #FFFFFF;
	}
	.aspect{
		padding: 38upx 24upx 0 24upx;;
		box-sizing: border-box;
		.aspect-value{
			.aspect-title{
				display: flex;
				align-items: center;
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
			>view+view{
				width:702upx;
				background:linear-gradient(243deg,rgba(251,239,230,1) 0%,rgba(255,247,240,1) 100%);
				border-radius:10upx;
				margin-top: 44upx;
				box-sizing: border-box;
				color: #92583A;
				position: relative;
				font-size: 30upx;
				padding: 42upx 30upx 24upx 30upx;
				text{
					font-weight: bold;
				}
				>view{
					width:134upx;
					height:50upx;
					background:rgba(246,224,198,1);
					border-radius:10upx;
					position: absolute;
					top: -30upx;
					left: 30upx;
					text-align:center;
					line-height: 50upx;
					color: #C08B6A;
					font-size: 28upx;
					font-weight: bold;
				}
			}
		}
		.aspect-data{
			margin-top: 30upx;
			.data-Title{
				color: #2A2A2A;
				font-size: 30upx;
				font-weight: bold;
			}
			.data-content{
				margin-top: 20upx;
				width: 702upx;
				height: 534upx;
				background: rgba(249,249,249,1);
				border-radius: 20upx;
				padding: 22upx 10upx 16upx 22upx;
				box-sizing: border-box;
				>view:nth-child(1){
					.verticar{
						color: #B8B8B8;
						font-size: 22upx; 
					}
					>view:nth-child(2){
						margin-top: 6upx;
						display: flex;
						align-items: flex-end;
						>view:nth-child(2){
							width: 7%;
							color: #B8B8B8;
							font-size: 22upx;
							text-align: center;
							// margin-left: 6upx;
						}
					}
				}
				.aspect-data-info{
					margin-top: 20upx;
					display: flex;
					justify-content: center;
					position: relative;
					.line-Top{
						width: 630upx;
						height: 22upx;
						background:rgba(216,216,216,.57);
						border-radius:11upx;
					}
					.data-info{
						position: absolute;
						top: 11upx;
						width:588upx;
						height:120upx;
						background:rgba(240,54,68,1);
						border-radius:0px 0px 20upx 20upx; 
						display:  flex;
						justify-content: center;
						align-items: center;
						>view{
							display: flex;
							flex-direction: column;
							color: #fff;
							font-size: 28upx;
							>view:nth-child(1){
								font-size: 38upx;
								font-weight: bold;
								text{
									font-size: 28upx;
									font-weight: 400;
								}
							}
							
						}
						>view+view{
							margin-left: 166upx;
						}
					}
				}
			}
		}
		.aspect-Why{
			margin-top: 44upx;
			.aspect-title{
				display: flex;
				align-items: center;
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
			.why-content{
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				.why-item{
					width: 658upx;
					margin-top: 22upx;
					display: flex;
					justify-content: center;
					padding: 24upx 22upx 20upx 64upx;
					position: relative;
					color: #862E2E;
					font-size: 30upx;
					box-sizing: border-box;
					image{
						position: absolute;
						top: 12upx;
						left: -46upx;
					}
				}
				.why-item:nth-child(1){
					height: 212upx;
					background:url(../../static/img/value_content_tall_bg@3x.png) no-repeat;
					background-size: 100% 100%;
					image{
						width: 78upx;
						height: 170upx;
					}
				}
				.why-item:nth-child(2){
					
					height: 158upx;
					background: url(../../static/img/value_content_bg@3x.png) no-repeat;
					background-size: 100% 100%;
					image{
						width: 78upx;
						height: 128upx;
					}
				}
				.why-item:nth-child(3){
					height: 176upx;
					background: url(../../static/img/value_content_three_bg.png) no-repeat;
					background-size: 100% 100%;
					image{
						width: 78upx;
						height: 146upx;
					}
				}
			}
		}
		.aspect-what{
			margin-top: 54upx;
			.aspect-title{
				display: flex;
				align-items: center;
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
			.what-content{
				margin-top: 26upx;
				padding: 30upx;
				box-sizing: border-box;
				width: 704upx;
				height: 522upx;
				background: rgba(249,249,249,1);
				border-radius: 20upx;
				.what-item{
					padding: 15upx 10upx 15upx 26upx;
					box-sizing: border-box;
					width:636upx;
					color: #3E4970;
					font-size: 30upx;
					height:114upx;
					background:linear-gradient(270deg,rgba(255,255,255,0) 0%,rgba(93,118,182,0.09) 100%);
				}
				.what-item:nth-child(1){
					height:68upx !important;
				}
				.what-item+.what-item{
					margin-top: 12upx;
				}
			}
		}
		.aspect-Bq{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100upx;
			color: #E7E8E9;
			font-size: 30upx;
		}
	}
</style>

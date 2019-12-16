<template>
	<view class="container" :style="type==3?'background:rgba(245,246,247,1);position:static':''">
		<scroll-view :scroll-x="true"
					 scroll-with-animation
					 :scroll-left="scrollLeft">
			<view :class="['tabs', scroll ? 'tabs--scroll' : '']" :style="{height: size + 'rpx',transform: 'translateX('+tans+')'}" id="tab" >
				<view 
						v-for="(item,index) in tabData"
						:key="index"
						:class="['tabs__item', index === curLoc ? 'tabs__item--cur': '']"
					  :style="{height: size+ 'rpx', 'line-height': size + 'rpx','width': width+'rpx'}"
					  @click="toggleTab(index)" :id="'item' + index">
					<view  :class="['tabs__item-child ',index === tabCur ? (type==3?'altse':'active'): '']" :style="type==3?'font-size: 28rpx':'font-size: 32rpx;'" >{{item.name}}</view>
				</view>
				<view :class="['tabs__line', needTransition ? 'transition' : '']" 
				:style="{background: color,width: 30 + 'rpx', transform: 'translateX('+ translateX  +'px)'}" v-if='type!=3'></view>
			</view>
		</scroll-view>
		<view class="add" :style="is_H5?'top: 22rpx':'top: 18rpx'" v-if="is_H5">
			<image src="../../static/img/home_increase@3x.png" v-if="type!=3" style="width: 30rpx;height:30rpx;" @tap="channel"></image>
			<image src="../../static/img/home_img_add@3x.png" v-if="type==3" style="width:34rpx;height:26rpx;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 当前位置
			tabCur: {
				type: Number,
				value: 0
			},
			// 是否可以超出滚动
			scroll: {
				type: Boolean,
				default(){
					return true;
				}
			},
			// 数据源
			tabData: {
				type: Array,
				value: []
			},
			// tab高度
			size: {
				type: Number,
				default(){
					return 90;
				}
			},
			// 颜色
			color: {
				type: String,
				default(){
					return "#3F82FD"
				}
			},
			//指示器的位置
			trundleX: {
				type: Number,
				default(){
					return 0
				}
			},
			type: {
				type:Number,
				default(){
					return 0
				}
			}
		},
		data() {
			return {
				windowWidth: 375,
				needTransition: false, // 下划线是否需要过渡动画
				translateX: 0, // 下划 line 的左边距离
				oldTranslateX: 0, // 下划 line 的左边距离
				lineWidth: 100, // 下划 line 宽度
				scrollLeft: 0, // scroll-view 左边滚动距离
				curLoc: -1,
				curIndex: 0 ,
				items:[],
				initFlag: true,
				is_H5: this.getStorage("is_H5"),
				width: 110,
				tans: 0
			};
		},
		watch: {
			tabCur(n, o){
				// console.log(n)
				// console.log(n)
				this.tacCurChange(n, o);
			},
			size(n, o){
				this.sizeChange(n, o);
			},
			trundleX(n, o){
				// console.log(1)
				// console.log(this.oldTranslateX)
				this.translateX = this.oldTranslateX + (n * this.lineWidth / this.windowWidth);
				// console.log(this.translateX)
			},
			tabData(){
				this.initTab()
			}
		},
		mounted(){
			// console.log(this.tabData)
			if(this.type==3){
				this.width = 100
			}else{
				this.width = 110
			}
			// console.log(1)

			
		},
		updated(){
			if(this.tabData.length>0&&this.initFlag){
				this.curLoc = this.tabCur;
				this.initTab();
				this.initFlag = false
				this.tacCurChange(0)
			}
		},
		methods: {
			/**
			 * 切换菜单
			 */
			toggleTab(index) {
				// this.curIndex = index
				
				this.$emit('change', {index: index});
				this.scrollByIndex(index)
			},
			moveHandle(){
				return false
			},
			channel(){
				// console.log(11)
				uni.navigateTo({
					url: '/pages/channel/channel'
				});
			},
			/**
			 * 滑动到指定位置
			 * @param tabCur: 当前激活的tabItem的索引
			 * @param needTransition: 下划线是否需要过渡动画, 第一次进来应设置为false
			 */
			scrollByIndex(tabCur, needTransition = true) {
				this.needTransition = needTransition;
				// console.log(tabCur)
				let item = this.items[tabCur];

				if(!item) return;
				// console.log(1)
				// 子item宽度
				let chItemWidth = item.width;
				// console.log(chItemWidth)

				// 父item左边距离
				let offsetLeft = item.left+chItemWidth/2;;

				if (this.scroll) { // 超出滚动的情况
					// 保持滚动后当前item'尽可能'在屏幕中间
					let scrollLeft = offsetLeft - (this.windowWidth - item.width) / 2 ;
					this.scrollLeft = scrollLeft;
				}
				this.curLoc = tabCur;
				this.translateX = offsetLeft;
				this.oldTranslateX = offsetLeft;
				this.lineWidth = chItemWidth;
			},
			/**
			 *  监听tab高度变化, 最小值为80rpx
			 */
			sizeChange(newVal, oldVal) {
				if (newVal <= 80) {
					this.size = 80;
				}
			},
			/**
			 *  监听tabCur变化, 做对应处理
			 */
			tacCurChange(newVal, oldVal) {
				// console.log(newVal)
				this.curLoc = newVal;
				let query = this.createSelectorQuery();
				for (let i = 0; i < this.tabData.length; i++) {
					query.select(`#item${i}`).boundingClientRect()
				}
				let tabWidth = this.createSelectorQuery().select('#tab').boundingClientRect().exec((res)=>{
					console.log(res)
				})
				console.log(tabWidth)
				query.exec(function (res) {
					this.items = res;
					console.log(res)
				}.bind(this));
				this.scrollByIndex(newVal);
			},
			/**
			 *  初始化函数
			 */
			initTab() {
				const {windowWidth} = uni.getSystemInfoSync();

				// 设置屏幕宽度
				this.windowWidth = windowWidth || 375;

				// 动态item的padding大小
				this.itemPadding = this.windowWidth / 375 * 15;

				// 获取每一个tab的宽高信息并存储起来
				let query = this.createSelectorQuery();
				for (let i = 0; i < this.tabData.length; i++) {
					query.select(`#item${i}`).boundingClientRect()
				}

				query.exec(function (res) {
					this.items = res;
					console.log(res)
					this.scrollByIndex(this.tabCur, false)
				}.bind(this));
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "../../static/css/variables.scss";

$refresh-height: 150rpx;
$success-height: 60rpx;
$success-top: $refresh-height - $success-height;
$refresh-padding: ($refresh-height - 50rpx) / 2;


$top-height: 90rpx;

scroll-view {
	width: 100%;
	
}


	// height: 43rpx;
	// overflow: hidden;
	.tabs {
		position: relative;
		height: $top-height;
		color: $mainBlack3;
		overflow-y: hidden;
		overflow-x: scroll;
		display: flex;
		width: 670rpx;
		width: 720rpx;
		
		&--scroll {
			white-space: nowrap !important;
			display: block !important;
		}

		&--scroll &__item {
			flex: initial !important;
			// text-align: initial !important;
			display: inline-block !important;
		}

		&--scroll &__item-child {
			display: block !important;
		}

		&__item {
			flex: 1;
			// width: 110rpx;
			text-align: center !important;
			height: $top-height;
			line-height: $top-height;
			// padding: 0 30rpx;
			// text-align: center;
			box-sizing: border-box;
			transition: color 0.3s ease-in-out;
			// box-sizing: border-box;
			&--cur {
				color: $mainBlack1;
			}
		}

		&__item-child {
			display: inline-block;
			font-size: 32rpx;
			color: $mainBlack1
		}
		
		&__item-child + &__item-child{
			// margin-left: 25rpx;
		}
		.active{
			color: #2A2A2A;
			font-size: 42rpx;
			font-weight: bold;
		}
		.altse{
			color: #F03644;
			font-size: 32rpx;
			font-weight: bold;
		}
		&__line {
			position: absolute;
			left:-17rpx;
			bottom: 2rpx;
			background-color: #F03644 !important;
			height: 6rpx;
			width: 0rpx;
			border-radius: 4rpx;
			display: inline-block;
			&.transition {
				transition: width 0.3s, transform .3s;
			}
		}
	}
	.tabs::-webkit-scrollbar {
		display: none;
	}
.container{
	background: #fff;
	width: 100vw;
	// padding-left: 24rpx;
	position: relative;
}
.add{
	position: absolute;
	right: 0rpx;
	// flex: 1;
	background: #fff;
	width: 80rpx;
	height: 38rpx;
	text-align: center;
	image{
		width: 30rpx;
		height: 30rpx;
	}
}
</style>

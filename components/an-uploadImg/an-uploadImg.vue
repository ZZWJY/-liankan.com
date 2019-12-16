<template>
	<view>
		<view class="an-uploadImg-group">
			<view>
				<view class="an-img" v-for="(item, index) in imgList" :key="index" @click="perviewImg(index)">
					<image :src="item" v-if="item"></image>
					<view class="an-icon-close" @click.stop="handleRemove(index)">
						<image src="../../static/img/search_history_delete@3x.png"></image>
					</view>
				</view>
				<view class="an-img-add" @click="chooseImage" v-if="imgList.length<3">
					<image src="../../static/img/website_increase@3x.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// import uniIcon from '@/components/uni-icon/uni-icon.vue'
	import sha1 from "sha1"
	export default {
		name: 'AnUploadImg',
		components:{
			// uniIcon
		},
		data() {
			return {
				imgList: [],
				imgBase64List: [],
				imgUrl: []
			};
		},
		props:["up_token"],
		methods:{
			chooseImage() {
				let that = this
				uni.chooseImage({
					sizeType: ['original'], 
					success: (chooseImageRes) => {
					  // console.log(chooseImageRes)
					 uni.getImageInfo({
						 src: chooseImageRes.tempFilePaths[0],
						 success: function (image) {
							 console.log(image);
							 console.log(image);
						 }
					 });
					for (var i = 0; i < chooseImageRes.tempFilePaths.length; i++) {
						this.imgList.push(chooseImageRes.tempFilePaths[i])
					}
					let imgFiles = chooseImageRes.tempFilePaths[0]
					
					let date = new Date()// 获取当前日期
					let timestamp = Date.parse(date)// 转换13位时间戳
					let key = sha1(imgFiles + timestamp)
					let token = this.up_token
					// console.log(this.up_token)
					let uper = uni.uploadFile({
                             // 需要上传的地址
                            url:'https://upload-z2.qiniup.com',
							formData:{
								key: key,
								token: token
							},
							fileType:'image',
                            // filePath  需要上传的文件
                            filePath: imgFiles,
                            name: 'file',
                            success(res1) {
                                // 显示上传信息
								console.log(res1)
								if(res1.statusCode == 200){
									res1.data = JSON.parse(res1.data)
									that.imgUrl.push('http://media.biben.com/'+res1.data.key)
								}
								console.log(that.imgUrl)
							}
						});

						// uni.getFileSystemManager().readFile({
						// 	filePath: chooseImageRes.tempFilePaths[i], //选择图片返回的相对路径
						// 	encoding: 'base64', //编码格式
						// 	success: res => { //成功的回调
						// 		let base64 = 'data:image/jpeg;base64,' + res.data //不加上这串字符，在页面无法显示的哦
						// 		this.imgBase64List.push(base64);
						// 	}
						// })
						
					}
				})
				// uni.getImageInfo({
				// 	success: (res)=>{
				// 		console.log(res)
				// 	}
				// })
			},
			perviewImg(index){
				let urls = [];
				if(index != -1){
					urls[0] = this.imgList[index];
				}else{
					urls = this.imgList;
				}
				uni.previewImage({
					urls: urls
				});
			},
			handleRemove(index){
				let il=[], ibl=[], imgArr=[];
				for (var i = 0; i < this.imgList.length; i++) {
					if(i != index){
						il.push(this.imgList[i]);
						ibl.push(this.imgBase64List[i]);
						imgArr.push(this.imgUrl[i])
					}
				}
				this.imgList = il;
				this.imgBase64List = ibl;
				this.imgUrl = imgArr
			}
		}
	}
</script>

<style>
	.an-uploadImg-group{
		margin: 5upx 20upx;
	}
	.an-img{
		float: left; 
		margin-right: 10upx;
		position: relative;
		border-radius: 6rpx;
	}
	.an-img-add{
		float: left; 
		margin-right: 10upx; 
		height: 120upx; 
		width: 120upx; 
		background-color: #C8C7CC; 
		text-align: center; 
		line-height: 110upx;
		margin-left: 20rpx;
	}
	.an-img>image{
		height: 100upx; 
		width: 100upx;
	}
	.an-icon-close{
		position: absolute; 
		right: -10upx; 
		top: -10upx;
	}
</style>
<style scoped>
	.an-img-add >>> img,.an-img-add >>> uni-image,.an-img-add >>> image{
		width: 120rpx;
		height: 120rpx;
	}
	.an-img >>> img,.an-img >>> uni-image,.an-img >>> image{
		width: 120rpx;
		height: 120rpx;
		border-radius: 6rpx
	}
	.an-icon-close >>> uni-image,.an-icon-close>>>img,.an-icon-close>>>image{
		width: 32rpx;
		height: 32rpx;
	}
</style>

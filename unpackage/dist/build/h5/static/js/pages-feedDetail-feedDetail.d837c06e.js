(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-feedDetail-feedDetail"],{2189:function(t,e,i){"use strict";i.r(e);var n=i("49e2"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);e["default"]=o.a},"38cd":function(t,e,i){"use strict";var n=i("e440"),o=i.n(n);o.a},"3e03":function(t,e,i){t.exports=i.p+"static/img/help_details_bg@3x.ee25e9b1.png"},"49e2":function(t,e,i){"use strict";var n=i("288e");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=n(i("55ec")),a={data:function(){return{content:{},type:0,index:0,is_solve:!0}},onLoad:function(t){console.log(t),this.type=t.type,this.index=t.index},mounted:function(){this.initFAQ()},methods:{initFAQ:function(){var t=this,e={now_time:this.now_time()},i=this.objKeySort(e),n=this.stringify(i),a=(0,o.default)(this.decrypt(this.key)+n).toUpperCase();e.sign=a,this.uniRequest.post("/v1/problems-show.html",e,{headers:{Authorization:this.token}}).then(function(e){t.content=e.data.data[t.type].list[t.index],console.log(t.content)})},togglesolve:function(t){this.is_solve=t},solve:function(){window.location.href="/solve"}}};e.default=a},"813f":function(t,e,i){var n=i("b041");e=t.exports=i("2350")(!1),e.push([t.i,'@charset "UTF-8";\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\n/* 颜色变量 */\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */.detail .detail-box[data-v-31cbf096]{padding:%?24?% %?8?% 0 %?24?%;-webkit-box-sizing:border-box;box-sizing:border-box}.detail .detail-box .box-content[data-v-31cbf096]{padding:%?24?% %?46?% %?56?% %?32?%;-webkit-box-sizing:border-box;box-sizing:border-box;width:%?718?%;height:%?1020?%;background:url('+n(i("3e03"))+") no-repeat;background-size:100% 100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}.detail .detail-box .box-content .title[data-v-31cbf096]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;color:#6e1d1d;font-size:%?46?%;font-weight:700;margin-bottom:%?8?%}.detail .detail-box .box-content .content[data-v-31cbf096]{font-size:%?32?%}.detail .detail-box .box-content uni-view[data-v-31cbf096]:nth-child(2){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}.detail .detail-box .box-content uni-view:nth-child(2)>uni-view[data-v-31cbf096]:first-child{text-align:center;color:#e0d0cf;font-size:%?26?%}.detail .detail-box .box-content uni-view:nth-child(2) .status[data-v-31cbf096]{margin-top:%?26?%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row}.detail .detail-box .box-content uni-view:nth-child(2) .status uni-view[data-v-31cbf096]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;color:#ead7d6;font-size:%?32?%}.detail .detail-box .box-content uni-view:nth-child(2) .status uni-view uni-image[data-v-31cbf096]{width:%?86?%;height:%?86?%}.detail .detail-box .box-content uni-view:nth-child(2) .status uni-view uni-text[data-v-31cbf096]{margin-top:%?14?%}.detail .detail-box .box-content uni-view:nth-child(2) .status uni-view+uni-view[data-v-31cbf096]{margin-left:%?106?%}.detail .detail-box .box-content uni-view:nth-child(2) .status .green[data-v-31cbf096]{color:#46dc96}.detail .detail-box .box-content uni-view:nth-child(2) .status .red[data-v-31cbf096]{color:#f03644}.detail .solveMit[data-v-31cbf096]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;margin-top:%?58?%}.detail .solveMit uni-view[data-v-31cbf096]{width:%?640?%;height:%?90?%;background:#f03644;border-radius:%?10?%;color:#fff;font-size:%?36?%;text-align:center;line-height:%?90?%}",""])},"89f6":function(t,e,i){var n=i("cc8d");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("c164654a",n,!0,{sourceMap:!1,shadowMode:!1})},b041:function(t,e){t.exports=function(t){return"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),/["'() \t\n]/.test(t)?'"'+t.replace(/"/g,'\\"').replace(/\n/g,"\\n")+'"':t)}},b48e:function(t,e,i){"use strict";var n=i("89f6"),o=i.n(n);o.a},bb21:function(t,e,i){"use strict";i.r(e);var n=i("e8fe"),o=i("2189");for(var a in o)"default"!==a&&function(t){i.d(e,t,function(){return o[t]})}(a);i("38cd"),i("b48e");var s=i("2877"),c=Object(s["a"])(o["default"],n["a"],n["b"],!1,null,"31cbf096",null);e["default"]=c.exports},cc8d:function(t,e,i){e=t.exports=i("2350")(!1),e.push([t.i,".content[data-v-31cbf096] p{color:#191110!important;font-size:%?32?%}.content[data-v-31cbf096] span{color:#191110!important;font-size:%?32?%}",""])},e440:function(t,e,i){var n=i("813f");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=i("4f06").default;o("3fd1eb40",n,!0,{sourceMap:!1,shadowMode:!1})},e8fe:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"detail"},[i("v-uni-view",{staticClass:"detail-box"},[i("v-uni-view",{staticClass:"box-content"},[i("v-uni-view",[i("v-uni-view",{staticClass:"title"},[t._v(t._s(t.content.name))]),i("v-uni-view",{staticClass:"content",domProps:{innerHTML:t._s(t.content.content)}})],1),i("v-uni-view",[i("v-uni-view",[t._v("是否解决了您的问题")]),i("v-uni-view",{staticClass:"status"},[i("v-uni-view",{class:t.is_solve?"":"red",on:{click:function(e){e=t.$handleEvent(e),t.togglesolve(!1)}}},[i("v-uni-image",{attrs:{src:t.is_solve?"../../static/img/help_details_not@3x.png":"../../static/img/help_details_not_red@3x.png"}}),i("v-uni-text",[t._v("未解决我的问题")])],1),i("v-uni-view",{class:t.is_solve?"green":"",on:{click:function(e){e=t.$handleEvent(e),t.togglesolve(!0)}}},[i("v-uni-image",{attrs:{src:t.is_solve?"../../static/img/help_details_yes_green@3x.png":"../../static/img/help_details_yes_not@3x.png"}}),i("v-uni-text",[t._v("解决了我的问题")])],1)],1)],1)],1)],1),i("v-uni-view",{staticClass:"solveMit",on:{click:function(e){e=t.$handleEvent(e),t.solve(e)}}},[i("v-uni-view",[t._v("意见反馈")])],1)],1)},o=[];i.d(e,"a",function(){return n}),i.d(e,"b",function(){return o})}}]);
<template>
<transition :name="Hdname">
	<div class="home">
		<div class="content"
		v-swipe-left
		v-swipe-right>
			<!-- 导航部分 -->
		<Navigation></Navigation>
		<!-- 中心内容部分 -->
		<Content></Content>
		</div>
		<!-- 侧栏部分 -->
		<Slide></Slide>
	</div>
</transition>
</template>
<script type="text/javascript">
import Swal from "sweetalert";
import Navigation from './navigation/Navigation.vue';
// 引入中间内容组件
import Content from "./content/Content.vue";
//引入侧滑组件
import Slide from "./slidebar/slide.vue";
// 引入zepto做拖拽
import Zepto from "zepto"
import {mapGetters,mapMutations} from "vuex"
export default {
	name: 'Home',
	data() {
		return {
		}
	},
	components:{
		Navigation,
		Content,
		Slide
	},
	mounted () {
		this.hideSlide();
	},
	computed: {
		...mapGetters(["Hdname"])
	},
	methods: {
		...mapMutations(["setHdname"])
	},
	beforeRouteEnter(to,from,next){
		// 在beforeRouteEnter后卫确实不访问this，因为确认导航前的后卫被调用，因此新进入组件甚至还没有被创建。
		console.log(to);
		next(vm=>{
			$(vm.$el).find(".foodlist").scrollTop(to.meta.scrollTop)
		})
	},
	directives:{
		"swipe-left":{
			bind:function(el,binds,vNode){
				Zepto(el).on("swipeLeft",()=>{
						vNode.context.hideSlide();
				})
			}
		},
		"swipe-right":{
			bind:function(el,binds,vNode){
				Zepto(el).on("swipeRight",()=>{
					// 第一步:让隐藏的slider显示
				vNode.context.showSlide()
				})
			}
		}
	}
}
</script>
<style type="text/css">
.slider-enter-active,.slider-leave-active{
	transition: all 0.5s linear;
}
.slide-enter{
	transform: translateX(50%);
}
.slide-leave-to{
	transform: translateX(50%);
}
.home {
  overflow-x: hidden;
}
/*设置滚动元素的父容器高度为设备的屏幕高度,否则无法滚动*/
html,
body,
#app,
.home,
.content{
  height: 100%;
  width: 100%;
}
/* .home{
  transform: translateX(45%);
} */
</style>


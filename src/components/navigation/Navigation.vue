<template>
<nav>
	<!-- 侧边栏按钮 -->
	<!-- pull-left,pull-right:导航栏左右对齐 -->
	<button class="menu-btn pull-left" @click="menuClick">
	  <!-- <span class="glyphicon glyphicon-list" v-if="type"></span>
	  <span class="glyphicon glyphicon-menu-left" v-else></span> -->
	  <span :class="{'glyphicon':true,'glyphicon-list':type,'glyphicon-menu-left':!type}"></span>
	</button>
	<!-- 收藏按钮 -->
	<button class="menu-btn pull-right" @click="saveBtn" v-if="fav">
		<span :class="{'glyphicon':true,'glyphicon-heart':noFav,'glyphicon-heart-empty':!noFav}"></span>
	</button>
	<!-- 删除按钮 -->
	<button class="menu-btn pull-right" @click="clearFn" v-if="clearBtn">
		<span :class="{'glyphicon':true,'glyphicon-trash':clearBtn}"></span>
	</button>
	<!-- 标题 -->
	<span class="h3 text-center">{{title}}</span>
</nav>	
</template>
<script type="text/javascript">
export default{
  props:{
  	// 导航左侧按钮类型
  	type:{
  		default:true,
  		type:Boolean
  	},
  	// 导航标题
  	title:{
  		default:"大众菜谱",
  		type:String
  	},
  	// fav:如果是true代表(收藏),false就不显示
  	fav:{
  		default:false,
  		type:Boolean
  	},
  	// noFav:如果是true代表实心(收藏),false就代表空心
  	noFav:{
  		default:false,
  		type:Boolean
  	},
  	// 导航的清除按钮
  	clearBtn:{
  	    default:false,
  	    type:Boolean
	  },
	
  },
  methods:{
  	menuClick(){
		//   如何区分是返回按钮事件处理还是菜单按钮事件处理
		if (this.type){
			// 能进来说明是菜单按钮
  		if(this.Isslide){
			  console.log(this.Isslide)
			  this.hideSlide()
		  }else{
			  this.showSlide()
		  }
		  }else{
			  window.history.back(); 
		  }
  	},
  	saveBtn(){
		  if(this.fav){
			  this.$emit("setCollection")
		  }
  	},
  	clearFn(){
  		alert("用户点击了删除按钮");
  	}
  }
}	
</script>
<style type="text/css">
nav {
  position: fixed !important;
  width: 100%;
  height: 44px;
  background-color: linen;
  text-align: center;
  z-index: 9;
  color: peru;
}
nav .menu-btn {
  height: 100%;
  width: 40px;
  font-size: 20px;
  border: none;
  outline: none;
  background-color: transparent;
}
nav .h3 {
  line-height: 44px;
}	
</style>
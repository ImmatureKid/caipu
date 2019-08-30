// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入jquery
import $ from 'jquery';
// 引入bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
// 引入axios
import axios from "axios";
import VueAxios from "vue-axios";
// 引入懒加载
import VueLazyload from "vue-lazyload";
import infiniteScroll from 'vue-infinite-scroll';
// 引入
import loading from "./plugins/loading.js";
// 左右滑动
import "zepto/dist/zepto.js";
// 使用定义好的仓库
import store from "./store/store.js"
Vue.use(loading)
Vue.use(infiniteScroll)
Vue.config.productionTip = false
Vue.use(VueAxios,axios);
Vue.use(VueLazyload,{
	// 加载失败展示公司log图
	error: "./assets/logo.png",
	loading: "./assets/logo.png",
	attempt:3
});
router.beforeEach((to, from, next) => {
  var token = localStorage.getItem("tc");
  if(to.name=="people"){
    if(token){
      next()
    }else if(to.name=="login"){
      next()
    }else{
      next({
        name:"login"
      })
    }
  }else{
    next()
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import FoodDetial from "@/components/content/FoodDetial"
import People from "@/components/user/people"
import login from "@/components/login"
import rigest from "@/components/rigest"
Vue.use(Router)
export default new Router({
  node: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home 
    },{
      path:"/FoodDetial:id",
      name:"FoodDetial",
      component:FoodDetial,
      // 该组件不需要被缓存
      meta:{
        keepAlive:false
      }
    },{
      path:"/People",
      name:"people",
      component:People,
      meta:{
        keepAlive:false
      }
    },{
      path:"/login",
      name:"login",
      component:login,
      meta:{
        keepAlive:false
      }
    },
    {
      path:"/rigest",
      name:"rigest",
      component:rigest,
      meta:{
        keepAlive:false
      }
    }
  ]
})

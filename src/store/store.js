import Vue from "vue";
import Vuex from "vuex";
// 引入仓库模块
import food from "./modules/food";
//使用Vuex
Vue.use(Vuex);
//定义仓库
export default new Vuex.Store({
        // 仓库共享的数据
        state:{
            page:1,//存储页码
            isslide:false,//存储侧边栏的滑动状态
            type:"name",//接口请求类型
            hdname:"slideh",
            peopleData:[]
        },
        getters:{
            //获取页码
            Page(state){
                return state.page
            },
            Isslide(state){
                console.log(state.isslide)
                return state.isslide
            },
            Type(state){
                return state.type
            },
            Hdname(state){
                return state.hdname
            },
            PeopleData(state){
                return state.peopleData
            }
        },
        mutations:{
            setPage(state,page){
                state.page=page;
            },
            setSlide(state,isslide){
                state.isslide = isslide;
            },
            setType(state,type){
                console.log(type)
                state.type = type;
            },
            setHdname(state,hdname){
                state.hdname = hdname;
            },
            setPeopleData(state,arr){
                state.peopleData = arr;
            }
        },
        actions:{
            setType({commit},type){
                commit("setType",type)
            }
        },
        modules:{
            food
        }
})
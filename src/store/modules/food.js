//仓库共享数据
const state ={
    currFood:"红烧肉",
}
const getters={
    Food(state){
        return state.currFood;
    }
}
// 挂载方法:设置菜名
const mutations ={
    setFood(state,food){
        console.log(food);
        state.currFood = food;
    }
}
const actions = {
    setFood({commit},food){
        commit("setFood",food);
    }
};
// 将定义好的state,getters,mutations,action暴露出去
export default {
    namespaced:true,//设置命名空间，便于管理.否则vuex管理的状态多了，容易出现冲突
    state,
    getters,
    mutations,
    actions
}
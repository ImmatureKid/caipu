<template>
    <transition name="slided">
    <div>
        
         <Navigation :type="false" title="注册"></Navigation>
        <div class="rigist">
       <p><input type="text" id="usn" v-model="user"></p> 
        <p><input type="password" id="psd" v-model="pwd"></p>
        <button @click="reginstFn">注册</button>
    </div>
   
    </div>
     </transition>
</template>

<script>
import network from "../assets/js/network.js";
import Navigation from './navigation/Navigation.vue';
import Swal from "sweetalert";
    export default {
        name:"rigest",
        data() {
            return {
                user: "",
                pwd:""
            }
        },
        mounted () {
            this.hide();
        },
        methods: {
            reginstFn() {
                network.userRegist(this.user,this.pwd,data=>{
                   if(data.data.code=="203"){
                       Swal("密码不符合规范")
                   }else if(data.data.code=="201"){
                        Swal("用户名或密码不能为空")
                   }else if(data.data.code=="202"){
                        Swal("该用户已存在")
                   }else if(data.data.code=="200"){
                       Swal("注册成功")
                       this.$router.push({
                           name:"login"
                       })
                   }
                })
            }
        },
        components: {
            Navigation,
        },
    }
</script>

<style scoped>
.rigist{
    margin-top:50px;
    border-radius: 8px;
}
.rigist input{
    border-radius: 8px;
    border:1px solid #f8f8f8;
}
.rigist button{
    width:100px;
    border-radius:8px;
    background: salmon;
}
.slided-enter-active,
.slided-leave-active {
  transition: all 0.3s linear;
}
.slided-enter {
  transform: translateX(100%);
}
.slided-leave-to {
  transform: translateX(100%);
}
</style>
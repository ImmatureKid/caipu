<template>
    <transition name="slided">
    <div>
        
        <Navigation :type="false" title="登录"></Navigation>
        <div class="login">
       <p><input type="text" id="usn" v-model="user" placeholder="请输入用户名"></p> 
        <p><input type="password" id="psd" v-model="pwd"  placeholder="请输入密码"></p>
        <button @click="loginFn">登录</button>
        </div>
         
    </div>
   </transition>
</template>

<script>
import network from "../assets/js/network.js";
import Navigation from './navigation/Navigation.vue';
import Swal from "sweetalert";
    export default {
        name:"login",
        data() {
            return {
                user:"",
                pwd:""
            }
        },
        mounted () {
            this.hide();
        },
        methods: {
            loginFn() {
                network.userLogin(this.user,this.pwd,data=>{
                    console.log(data);
                    if(data.data.code=="202"){
                        Swal("该用户未注册")
                        this.$router.push({
                            name:"rigest"
                        })
                    }else if(data.data.code=="201"){
                         Swal("用户名或密码不能为空")
                    }else if(data.data.code=="203"){
                          Swal("用户名或密码错误")
                    }else if(data.data.code=="200"){
                        localStorage.setItem("tc",this.user);
                        this.$router.push({
                            path:"/"
                        });
                      
                    }

                })
            }
        },
        components: {
             Navigation,
        },
    }
</script>

<style  scoped>
.login{
    margin-top:50px;
    border-radius: 8px;
}
.login input{
    border-radius: 8px;
    border:1px solid #f8f8f8;
}
.login button{
    width:100px;
    border-radius:8px;
    background: salmon;
}
.slided-enter-active,
.slided-leave-active {
  transition: all 0.3s linear;
}
.slided-enter {
  transform: translateY(100%);
}
.slided-leave-to {
  transform: translateY(100%);
}
</style>
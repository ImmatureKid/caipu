import loading from "../components/loading.vue"
import {mapGetters,mapMutations} from "vuex"
export default {
    // install:全局注册组件
    install(Vue){
        // 定义模板并且将模板载入body上
        let Load =Vue.extend(loading)
        let load = new Load({
            el:document.createElement("div")
        });
        document.body.appendChild(load.$el);
        // 全局loading方法
        // Vue.show = function(){
        //     $(load.$el).show()
        // }
        // Vue.hide = function(){
        //     $(load.$el).hide()
        // }
        Vue.mixin({
            computed:{
                ...mapGetters(["Isslide"]),
            },
            methods:{
                ...mapMutations(["setSlide"]),
                show(){
                    $(load.$el).show()
                   
                },
               hide(){
                    $(load.$el).hide()
                   
                },
                //显示侧栏
                showSlide(){
                    $(".slide").fadeIn("fast");
                    $(".content").css("transform","translateX(50%)")
                    this.setSlide(true);
                },
                hideSlide(){
                    $(".slide").fadeOut("fast");
                    $(".content").css("transform","translateX(0px)")
                    this.setSlide(false);
                }
            }
        })
    }
    //全局混入
    }
    

<template>
  <!-- 侧栏 -->
  <div class="slide">
    <!-- <div class="logo"
         @click="toPersonCenter"></div> -->
    <div class="logo"
         v-tap
         v-longTap @click="fromPeople"></div>
    <div class="panel-group"
         id="accordion">
      <div class="panel panel-default"
           v-for="item in cai"
           :key="item.categoryInfo.ctgId">
        <div class="panel-heading">
          <h4 class="panel-title">
            <a data-toggle="collapse"
               data-parent="#accordion"
               :href="item.categoryInfo.ctgId | addPrefix">
              {{item.categoryInfo.name}}
            </a>
          </h4>
        </div>
        <div :id="item.categoryInfo.ctgId"
             class="panel-collapse collapse">
          <div class="panel-body">
            <p v-for="child in item.childs"
               :key="child.categoryInfo.ctgId"
               @click="selectFood(child.categoryInfo.ctgId)">
              {{child.categoryInfo.name}}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swal from "sweetalert";
import network from "../../assets/js/network.js";
// 获取zepto对象
import Zepto from "zepto";
// 导入仓库
import {mapGetters,mapMutations} from "vuex";
export default {
  data: function() {
    return {
      cai: [] //用来存储侧栏的数据
    };
  },
  computed: {
    // vuex模块名称，模块中的Food
    ...mapGetters("food",["Food"])
  },
  filters: {
    // 给id增加前缀
    addPrefix: function(val) {
      return "#" + val;
    }
  },
  directives: {
    tap: {
      bind: function(el, binds, vNode) {
        Zepto(el).on("tap",()=>{
        })
      }
    },
    longTap: {
      bind: function(el, binds, vNode) {
          Zepto(el).on("tap",()=>{
        })
      }
    }
  },
  methods: {
    ...mapMutations(["setType"]),
     ...mapMutations(["setPage"]),
      ...mapMutations("food",["setFood"]),
    selectFood(ctgId) {
      // 设置页面的请求类型
      this.setType("cid");
      // 设置默认请求第一页的数据
      this.setPage(1);
      // 将获取到的cid存进去
      this.setFood(ctgId);
      // 关闭菜单栏
      this.hideSlide();
    },
    fromPeople(){
      this.$router.push({
        name:"people"
      })
       this.hideSlide()
    },
    toPersonCenter() {
      // 如果已登录则直接进入个人中心，否则弹出登录界面
      alert("跳转到个人中心");
    },
    logout() {
      swal("登出成功", "", "success").then(() => {
        console.log("----");
      });
    }
  },
  mounted: function() {
    // 默认在程序挂载成功后加载数据
    network.types(data => {
      this.cai = data.result.childs;
    });
  }
};
</script>
<style>
.logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid grey;
  background-image: url("../../assets/logo.png");
  background-position: center center;
  background-size: 100% 100%;
  margin: 0 auto;
  position: relative;
  top: 100px;
  box-shadow: 0px 0px 5px 0px grey;
}
.slide {
  width: 45%;
  /* height: 500px; */
  height: 100%;
  position: absolute;
  top: 0px;
  /* background-color: lightgreen; */
  display: none;
  overflow-y: auto;
  box-shadow: 0px 1px 1px 1px grey;
}
.slide .panel-group {
  position: relative !important;
  top: 120px;
}
.slide .panel-group .panel {
  margin: 0 auto;
  width: 95%;
}
.slide .panel-group a {
  text-decoration: none;
}
.slide .panel-body p {
  cursor: pointer;
}
/* 设置滚动条的样式 */
.slide::-webkit-scrollbar {
  width: 0px;
}
/* 滚动槽 */
.slide::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
/* 滚动条滑块 */
.slide::-webkit-scrollbar-thumb:vertical {
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.8);
  /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,1); */
}
/* .toggle_mask::-webkit-scrollbar-thumb:window-inactive {    
      background: rgba(0,0,0,0.8);
} */
</style>
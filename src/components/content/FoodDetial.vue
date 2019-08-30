<template>
  <transition name="slided">
    <div class="main-detail">
      <Navigation :type=false
            :title="detailData.name"
            :fav=true
            :noFav=noFav
            @setCollection="setCollection"
            @gotoback="goback"></Navigation>
      <div class="detail"
           v-if="detailData.recipe">
        <div class="cover">
          <img :src="detailData.recipe.img"
               alt=""
               width="100%">
        </div>
        <div>
          <div class="title">
            <span class='h3'>{{detailData.name}}</span>
            <span class='ctgtitle'>({{detailData.ctgTitles}})</span>
          </div>

        </div>
        <div class="ingredients">
          <p class="h4">材料:</p>
          <p v-for="(cailiao,index) in parseStr(detailData.recipe.ingredients)"
             :key="index+'cl'">
            {{cailiao}}
          </p>

        </div>
        <div class="method">
          <p class="h4">制作过程:</p>
          <div v-for="(bz,index) in parseStr(detailData.recipe.method)"
               :key="index+'bz'">
            <p class="step">{{bz.step}}</p>
            <img :src="bz.img"
                 alt="图片丢失"
                 width="100%">
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Navigation from "../navigation/Navigation.vue";
import network from "../../assets/js/network.js";
import Swal from "sweetalert";
// import { mapGetters,mapMutations} from "vuex";
export default {
  name: "FoodDetial",
  data: function() {
    return {
      // 记录传递过来的id
      menuId: "",
      arr:[],
      // 记录请求回来的数据
      detailData: {},
      // 记录收藏状态
      noFav: false
    };
  },
  watch: {
  	// 一进来就监听路由的变化,一旦监听到路由进入详情页码就立马根据id请求数据
    $route: function(newVal) {
      if (newVal.name == "FoodDetial") {
        this.menuId = newVal.params.id;
        this.getCaiByMenuId(this.menuId);
      }
    }
  },
  mounted: function() {
  	// 根据传递过来的id请求相应的数据
    this.menuId = this.$route.params.id;
    this.getCaiByMenuId(this.menuId);
    // 判断当前这条数据是否被收藏过
    this.noFav = this.hasCollection();
  },
  components: {
    Navigation
  },
  methods: {
    // 在navigation.vue组件中通过emit触发此事件才能执行
    goback() {
      this.$router.go(-1);
    },
    getCaiByMenuId(menuId) {
      this.show();
      network.getByMenuId(menuId, data => {
        this.hide();
        this.detailData = data.result;
        this.noFav = this.hasCollection();
      });
    },
    // 对返回的字符串数据做统一处理
    parseStr: function(val) {
      if (val == undefined) {
        return ["暂无"];
      }
      var obj = JSON.parse(val);
      return obj;
    },
    // 在navigation.vue组件中通过emit触发此事件才能执行
    setCollection() {
      // 首先，判断localStorage中是否存在已关联的数据，如果有则取消收藏，否则收藏
      let localStorage = window.localStorage;
      if(!localStorage.getItem("tc")){
        Swal("请先登录吧");
        return
      }
      if (this.hasCollection()) {
      	// 通过id区分收藏的每一项
        localStorage.removeItem("caipu" + this.detailData.menuId);
        this.noFav = false;
      } else {
        if (this.detailData.menuId != undefined) {
          localStorage.setItem(
            "caipu" + this.detailData.menuId,
            JSON.stringify(this.detailData)
          );
          this.noFav = true;
        }
      }
    },
    // 判断是否收藏过
    hasCollection() {
      let localStorage = window.localStorage;
      if (localStorage.getItem("caipu" + this.menuId)) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>
<style>
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
.main-detail {
  width: 100%;
  height: 100%;
}
.detail {
  position: relative;
  top: 7%;
  /* padding-top: 5px; */
  padding-bottom: 1px;
  height: 93%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  background-color: aliceblue;
}
.detail::-webkit-scrollbar {
  width: 0px;
}
.title {
  padding: 5px 5px;
}
.ctgtitle {
  color: grey;
  padding-left: 5px;
}
.ingredients,
.method p {
  padding-left: 5px;
  padding-right: 5px;
}
</style>

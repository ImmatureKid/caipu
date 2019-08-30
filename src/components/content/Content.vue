<template>
  <div class="main">
    <!-- 搜索框 -->
    <div class="search">
      <input type="text" class="col-xs-10" placeholder="红烧肉" v-model="cname" @click="searchClicked" />
      <button class="searthbtn col-xs-2" @click="search">
        <span class="glyphicon glyphicon-search pull-right"></span>
      </button>
    </div>
    <!-- 菜品列表 -->
    <div
      class="foodlist"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="10"
    >
      <div class="panel-group">
        <div class="panel panel-default" v-for="(item,index) in clist" :key="index">
          <div class="panel-heading clearfix">
            <img :src="item.thumbnail" class="thumbnails col-xs-5" />
            <div class="col-xs-7">
              <a
                class="h4 test"
                data-toggle="collapse"
                :href="item.menuId | addPrefix"
              >{{item.name}}</a>
              <p
                class="summary"
                v-if="item.recipe && item.recipe.sumary !=''"
              >简介：{{item.recipe.sumary}}</p>
              <p class="summary" v-else>简介：暂无简介</p>
            </div>
            <span
              class="glyphicon glyphicon-menu-right pull-right"
              @click="showDetail(item.menuId)"
            ></span>
          </div>
          <div :id="item.menuId" class="panel-collapse collapse">
            <div class="panel-body">
              <p v-if="item.recipe && item.recipe.sumary !=''">{{item.recipe.sumary}}</p>
              <p v-else>简介：暂无简介</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import Swal from "sweetalert";
import network from "../../assets/js/network.js";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "Content",
  data() {
    return {
      clist: [],
      //所有的数据渲染都放在clist数组中
      cname: "", //cname用来存储搜索框输入的数据
      busy: false,
      //  currentPage:1,
      // 总页码
      totalPage: 1
    };
  },
  computed: {
    ...mapState(["type"]),
    ...mapGetters(["Page"]),
    ...mapState("food", ["currFood"]),
    ...mapGetters(["Type"]),
    ...mapGetters("food", ["Food"])
    //  show(){
    //    this.getCaipu(this.Food,this.Page)
    // }
  },
  filters: {
    addPrefix: function(val) {
      return "#" + val;
    }
  },
  mounted() {
    this.getCaipu(this.currFood);
    var self = this;
    setTimeout(function() {
      self.collapseState();
    }, 500);
  },
  watch: {
    currFood: function(newFood, oldFood) {
      // this.clist=[]
      this.getCaipu(newFood);
    }
  },
  methods: {
    ...mapMutations("food", ["setFood"]),
    ...mapMutations(["setPage", "setType"]),
    searchClicked() {
      // alert("点击搜索");
    },
    search() {
      if (this.cname == "") {
        Swal({ text: "请输入要查询的菜名" });
        return;
      }
      // 查询的时候清空
      // this.clist=[]
      this.setType("name");
      this.setFood(this.cname);
      this.setPage(1);
    },
    showDetail(id) {
      this.$router.push({
        name:"FoodDetial",
        params:{id:id},
      })
    },
    // 切换>上下利用bootstrop的collapse
    collapseState() {
      $(".foodlist .collapse").on("hide.bs.collapse", function() {
        $(this)
          .parent()
          .find(".glyphicon-menu-right")
          .css("transform", "rotateZ(0deg)");
      });
      $(".foodlist .collapse").on("show.bs.collapse", function() {
        $(this)
          .parent()
          .find(".glyphicon-menu-right")
          .css("transform", "rotateZ(90deg)");
      });
    },
    getCaipu(param, page) {
      if (this.Page == 1) {
        this.clist = [];
      }
      // 设置为忙碌状态
      this.busy = true;
      this.show();
      network.getCaipu(this.Type, param, this.Page, data => {
        // 请求成功后设为false
        this.hide();
        this.busy = false;
        if (data.retCode == "20201") {
          Swal({ text: "查询的菜名不存在" });
          return;
        }
        this.clist = this.clist.concat(data.result.list);
        // this.collapseState ()
        //计算总也吗
        this.totalPage = Math.ceil(data.result.total / 20);
        this.setPage(this.Page + 1);
        console.log(data);
      });
    },
    loadMore() {
      if (this.Page > this.totalPage) {
        Swal({
          text: "没有更多数据了"
        });
        return;
      }

      this.getCaipu(this.currFood, this.Page);
    }
  }
};
</script>
<style type="text/css">
.main {
  position: relative;
  top: 7%;
  width: 100%;
  height: 93%;
}
.search {
  height: 6%;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  background: white;
}
.search input {
  outline: none;
  background-color: transparent;
  border: none;
  height: 100%;
  background-color: transparent;
  font-size: 1.2em;
  /* border: 1px solid grey !important; */
  border-radius: 0px;
  padding-left: 5px;
  padding-right: 5px;
}

.search button {
  /* padding-right: 0px !important; */
  line-height: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  font-weight: bolder;
}
.foodlist {
  padding-top: 5px;
  padding-bottom: 5px;
  height: 94%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  background-color: aliceblue;
}
.foodlist::-webkit-scrollbar {
  width: 0px;
}
.foodlist::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
/* 滚动条滑块 */
.foodlist::-webkit-scrollbar-thumb:vertical {
  border-radius: 3px;
  background: rgba(255, 0, 0, 1);
  /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,1); */
}
.foodlist .panel-group {
  margin-bottom: 0px;
}
.panel-group .panel {
  margin: 0 auto;
  width: 98%;
  border-radius: 0px !important;
}
.panel-heading {
  padding-left: 5px !important;
  padding-right: 5px !important;
  padding-top: 8px !important;
  padding-bottom: 8px !important;
  position: relative;
  background-color: white !important;
  box-shadow: 1px 1px 1px 0px grey;
}
.thumbnails {
  width: 100px !important;
  height: 74px !important;
  border-radius: 4px;
  padding: 0px 0px !important;
}
.summary {
  margin-top: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 0px !important;
}
.foodlist .glyphicon {
  top: 30px !important;
}
.glyphicon-menu-right {
  transition: all 0.25s;
}
</style>
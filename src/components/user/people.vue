<template>
  <div class="footlist">
    <Navigation :type="type" :clearBtn="true" title="个人中心"></Navigation>
    <div class="panel-group" id="meun">
      <div class="panel panel-default" v-for="(item,index) in pdata" :key="index" v-swipe-left v-swipe-right>
        <div class="panel-heading clearfix">
          <img :src="item.thumbnail" class="thumbnails col-xs-5" />
          <div class="col-xs-7">
            <a class="h4 test" data-toggle="collapse" :href="item.menuId | addPrefix">{{item.name}}</a>
            <p
              class="summary"
              v-if="item.recipe && item.recipe.sumary !=''"
            >简介：{{item.recipe.sumary}}</p>
            <p class="summary" v-else>简介：暂无简介</p>
          </div>
          <span class="glyphicon glyphicon-menu-right pull-right" @click="showDetail(item.menuId)"></span>
        </div>
        <div :id="item.menuId" class="panel-collapse collapse">
          <div class="panel-body">
            <p v-if="item.recipe && item.recipe.sumary !=''">{{item.recipe.sumary}}</p>
            <p v-else>简介：暂无简介</p>
          </div>
        </div>
        <span class="del" @click="cleared(item.menuId)">删除</span>
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from "../navigation/Navigation.vue";
// import { mapGetters,mapMutations} from "vuex";
export default {
  name: "people",
  data() {
    return {
      type: false,
      clearBtn: true,
      pdata: []
    };
  },
  mounted() {
    this.getData();
    this.hide();
    this.collapseStated();
  },
  filters: {
    addPrefix: function(val) {
      return "#" + val;
    }
  },
directives:{
		"swipe-left":{
			bind:function(el,binds,vNode){
				Zepto(el).on("swipeLeft",()=>{
                    // $(el).css("translateX","-90px")
                    el.style.transform="translateX(-90px)"
				})
			}
		},
		"swipe-right":{
			bind:function(el,binds,vNode){
					Zepto(el).on("swipeRight",()=>{
				el.style.transform="translateX(0px)"
				})
			}
		}
	},
  methods: {
    getData() {
      var localStorage = window.localStorage;
      var arr = [];
      var reg = /caipu/ig
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i); //获取本地存储的Key
       console.log(key);
        if (key.match(reg)) {
              console.log(key);
          arr.push(JSON.parse(localStorage.getItem(key))); //所有value
        }
      }
      console.log(arr);
      this.pdata = arr;
    },
    collapseStated() {
      $("#meun .collapse").on("hide.bs.collapse", function(){
        console.log(1);
        $(this)
          .parent()
          .find(".glyphicon-menu-right")
          .css("transform", "rotateZ(0deg)");
      });
      $("#meun .collapse").on("show.bs.collapse", function(){
        $(this)
          .parent()
          .find(".glyphicon-menu-right")
          .css("transform", "rotateZ(90deg)");
      });
    },
    cleared(id){
        $(".panel").css("transform","translateX(0px)")
        localStorage.removeItem("caipu"+id);
         this.getData()
    },
    showDetail(id) {
      this.$router.push({
        name: "FoodDetial",
        params: { id: id }
      });
    }
  },
  computed: {},
  components: {
    Navigation
  }
};
</script>

<style scoped>
.panel-group {
  margin-top: 44px;
  width:100%;
      overflow: hidden;
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
.panel{
    position: relative;
    width:100%;
    transition: all .5s ease;
}
.panel .del{
    position: absolute;
  width:100px;
  line-height: 90px;
  right:-105px;
  top:0;
}
</style>
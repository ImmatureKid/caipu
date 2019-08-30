import Vue from "vue";
import qs from "qs";

export default class {
// 获取菜谱品牌类型(侧栏数据列表)
static types(callBack){
Vue.axios.get("http://www.bestqingshan.top/demo/Juhe.php",{
	params:{
		url: "http://apicloud.mob.com/v1/cook/category/query",
		param: {
			key:"2856c8585bdd4"
		}
	}
}).then(function(data){
	let result = JSON.parse(data.data.data);
	callBack(result);
}).catch(function(error){
  console.error(error);
});
}
// 根据菜谱id查询菜谱
static getListById(cpid,page,callBack){
Vue.axios.get("http://www.bestqingshan.top/demo/Juhe.php",{
	params:{
		url:"http://apicloud.mob.com/v1/cook/menu/search",
		param:{
			key:"2856c8585bdd4",
			cid:cpid,
			page:page
		}
	}
}).then(function(data){
   let result = JSON.parse(data.data.data);
	callBack(result);
}).catch(function(error){
console.log(error);
});
}
// 根据菜谱name查询菜谱
static getListByName(name,page,callBack){
Vue.axios.get("http://www.bestqingshan.top/demo/Juhe.php",{
	params:{
		url:"http://apicloud.mob.com/v1/cook/menu/search",
		param:{
			key:"2856c8585bdd4",
			name:name,
			page:page
		}
	}
}).then(function(data){
   let result = JSON.parse(data.data.data);
	callBack(result);
}).catch(function(error){
console.log(error);
});
}

// 获取菜谱
static getCaipu(type,param,page,callBack){
    if (type==="cid") {
    	this.getListById(param,page,callBack);
    }else{
    	this.getListByName(param,page,callBack);
    }
}
// 菜谱详情接口:根据菜单id获取内容
static getInfoByMenuId(menuId,callBack){
Vue.axios.get("http://www.bestqingshan.top/demo/Juhe.php",{
	params:{
		url:"http://apicloud.mob.com/v1/cook/menu/query",
		param:{
			key:"2856c8585bdd4",
			id:menuId
		}
	}
}).then(function(data){
	let result = JSON.parse(data.data.data);
	callBack(result);
}).catch(function(error){
console.log(error);
});

}
static getByMenuId(id,callBack){
	Vue.axios.get("http://www.bestqingshan.top/demo/Juhe.php",{
	params:{
		url:"http://apicloud.mob.com/v1/cook/menu/query",
		param:{
			key:"2856c8585bdd4",
			id:id
		}
	}
}).then(function(data){
   let result = JSON.parse(data.data.data);
	callBack(result);
}).catch(function(error){
console.log(error);
})

}
static userLogin(user,pwd,callBack){
	let param = {
		user,
		pwd
	};
	param = qs.stringify(param)
	Vue.axios.post("http://www.bestqingshan.top/demo/ajaxlog.php",param).then(function(response){
		callBack(response)
	}).catch(function(error){
		console.log(error);
	})
}
static userRegist(user,pwd,callBack){
	let param = {
		user,
		pwd
	};
	param = qs.stringify(param)
	Vue.axios.post("http://www.bestqingshan.top/demo/ajaxRegister.php",param).then(function(response){
		callBack(response)
	}).catch(function(error){
		console.log(error);
	})
}





}
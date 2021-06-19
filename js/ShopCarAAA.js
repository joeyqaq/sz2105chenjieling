$(function(){
	// localStorage.setItem("123goods", JSON.stringify([
  //   {
  //     "bid":'001',//bid
  //     "num":1//数量
  //   },
  //   {
  //     "bid":'002',//bid
  //     "num":3//数量
  //   },
  //   {
  //     "bid":'003',//bid
  //     "num":5//数量
  //   }
  // ]));
	new ShowCartsData().init();

})

function ShowCartsData(){
	if(!ShowCartsData.property){
		ShowCartsData.property = {
			userName : location.search.split("=")[1],
      // userName : '123',
			oCarts : $(".carts"),
			goods : [],
			init : function(){
				//显示信息
				this.showGoodsInfo();
				//向后台发送请求，拿到所有的商品数据
				this.getGoods();
			},
			getGoods : function(){
				$.getJSON("goods.json",function(res){
					//保存所有商品数据
					this.goods = res;
					//在页面显示所有对应商品数据
					this.showGoodsInfo();

					//对页面数据进行增删改查
					new SelectEvent().init();

				}.bind(this));
			},
			getStorGoods : function(){//从购物车中获取所有要购买的商品信息
				if(localStorage.getItem(this.userName + "goods")){
					var storGoodsStr = localStorage.getItem(this.userName + "goods");
					return JSON.parse(storGoodsStr);
				}else{
					return null;
				}
			},
			showGoodsInfo : function(){//在页面显示所有对应商品数据

				if(this.getStorGoods()){
					var cartGoodsInfoJson = this.getStorGoods();
					//console.log(cartGoodsInfoJson);
					var str = "";
					//遍历商品数据和localStorage中的信息
					for (var i = 0; i < this.goods.length; i++) {
						for(var j = 0; j < cartGoodsInfoJson.length; j++){
							//根据匹配的bid找到对应的那个商品的数据
							if(this.goods[i].bid == cartGoodsInfoJson[j].bid){
								str += `
									<ul class="title content">
										<li><input  style="margin-right:45px;" class="checkOneBox" type="checkbox"/></li>
										<li style="width: 450px; margin-left:10px;text-align: left; margin-right:20px;">
											<p><img src="img/${this.goods[i].src}"/></p>
											<input class="bid" type="hidden" value="${cartGoodsInfoJson[j].bid}"/>
										</li>
										<li><span class="goodNum">${cartGoodsInfoJson[j].num}</span></li>
										<li><span class="goodPrice">${this.goods[i].price}</span></li>
										<li><input class="jian" type="button" value="-"/>&nbsp;|&nbsp;<input class="add" type="button" value="+"/></li>
										<li><span class="goodTotalPrice">${cartGoodsInfoJson[j].num * this.goods[i].price}</span></li>
									</ul>
								`;
							}
						}
					}
					this.oCarts.html(str);
				}
			},
		}
	}
	return ShowCartsData.property;
}
class SelectEvent{
	constructor(){
		this.checkAll = $("#checkAll");//选中所有按钮
		this.deslection = $("#deslection");//取消选择
		this.totalCount = $("#totalCount");//商品总条数
		this.totalPrice = $("#totalPrice");//商品的总价
		this.checkOneBox = $(".checkOneBox");//
		this.computeGoods = new ComputeGoods();//
		this.jian = $(".jian");
		this.add = $(".add");
		this.bid = $(".bid");
		this.delCartGoods = $("#delCartGoods");
	}
	init(){
		this.selectAll();
		this.selectOne();
		this.deslectionAll();
		this.addEvent();//+操作
		this.jianEvent();//-操作
		this.delGoodsInSelected();//删除所有被选中的商品
	}
	selectAll(){
		var _this = this;
		this.checkAll.click(function(){
			//点击当前选择所有按钮，所有的商品都要被选中
			//_this.checkOneBox.prop("checked",$(this).prop("checked"));
			if($(this).prop("checked")){
				//所有的商品都要被选中
				_this.checkOneBox.prop("checked",true);
				//禁止当前选择所有按钮
				$(this).prop("disabled",true);
				//取消选择按钮解禁
				_this.deslection.prop("disabled",false);
				//取消选择按钮变成未选中状态
				_this.deslection.prop("checked",false);
			}
			//alert(1);

			//开始计算数量
			//console.log(_this.computeGoods.computeTotalNum());
			var num = _this.computeGoods.computeTotalNum();
			_this.totalCount.html(num);
			//计算总价
			var price = _this.computeGoods.computeTotalPrice();
			_this.totalPrice.html(price);

		})
	}
	selectOne(){
		var _this = this;
		this.checkOneBox.click(function(){
			var checked = false;//表示没有被选中的。
			var unCheck = false;//表示所有的都被选中了。
			_this.checkOneBox.each(function(index,ele){
				if($(ele).prop("checked")){//只要到这里执行，意味最少有一个被选中
					checked = true;//表示有一个被选中；
//						checkCount++;
//						unCheckCont = 0;
				}else{//只要到这里执行，表示最少有一个未被选中
					unCheck = true;//表示有一个未被选中
//						checkCount = 0;
//						unCheckCont++;
				}
			});
			if(unCheck){//1只要有一个商品未被选中
				//全选按钮要解禁，并且为可选状态
				_this.checkAll.prop("disabled",false);
				_this.checkAll.prop("checked",false);
			}else{//表示所有的都被选中了
				//3只要全部选中，全选按钮变成选中状态，禁止点击
				_this.checkAll.prop("disabled",true);
				_this.checkAll.prop("checked",true);
			}
			if(checked){//2只要有一个被选中
				//取消选择按钮要解禁，并且为可选状态
				_this.deslection.prop("disabled",false);
				_this.deslection.prop("checked",false);
			}else{//表示没有被选中的
				//4没有一个被选中，取消选择按钮是选中状态，并且为禁止点击
				_this.deslection.prop("disabled",true);
				_this.deslection.prop("checked",true);
			}
			var computeNum = _this.computeGoods.computeSelectOneNum();
			var computePrice = _this.computeGoods.computeSelectOnePrice();
			_this.totalCount.html(computeNum);
			_this.totalPrice.html(computePrice);
		});
	}
	deslectionAll(){
		var _this = this;
		this.deslection.click(function(){
			_this.checkOneBox.prop("checked",false);
			//当前的取消选择按钮禁止点击
			$(this).prop("disabled",true);
			//选择所有按钮解除禁止
			_this.checkAll.prop("disabled",false);
			//选择所有按钮取消选中状态
			_this.checkAll.prop("checked",false);

			//商品总数量和总价清零
			_this.totalCount.html(0);
			_this.totalPrice.html(0);
		});
	}
	addEvent(){
		var _this = this;
		this.add.click(function(){
			//根据bid作添加操作（加1）
			var bid = $(this).parent().parent().find(".bid").val();
			_this.computeGoods.setNumAndPrice(bid,1);

			var computeNum = _this.computeGoods.computeSelectOneNum();
			var computePrice = _this.computeGoods.computeSelectOnePrice();
			_this.totalCount.html(computeNum);
			_this.totalPrice.html(computePrice);
		});
	}
	jianEvent(){
		var _this = this;
		this.jian.click(function(){
			var bid = $(this).parent().parent().find(".bid").val();

			if($(this).parent().parent().find(".goodNum").html() > 0){
				_this.computeGoods.setNumAndPrice(bid,-1);
			}else{//当减到0时，作删除操作
				//删除当前节点
				$(this).parent().parent().remove();
				//删除购物车中的一条信息
				_this.computeGoods.delGoodByBid(bid);
			}


			var computeNum = _this.computeGoods.computeSelectOneNum();
			var computePrice = _this.computeGoods.computeSelectOnePrice();
			_this.totalCount.html(computeNum);
			_this.totalPrice.html(computePrice);
		});
	}
	delGoodsInSelected(){
		var _this = this;
		this.delCartGoods.click(function(){
			//alert(1)
			//遍历所有的商品，查看哪些被选中，找到所有被选中商品的Bid，
			//根据bid来删除信息
			_this.checkOneBox.each(function(index,ele){
				if($(ele).prop("checked")){
					var bid = _this.bid.eq(index).val();
					//console.log(bid);
					_this.computeGoods.delGoodByBid(bid);
					$(ele).parent().parent().remove();
					_this.totalCount.html(0);
					_this.totalPrice.html(0);
				}
			});
		});
	}
}
//计算商品价格和数量
class ComputeGoods{
	constructor(){
		this.checkOneBox = $(".checkOneBox");
		this.goodNum = $(".goodNum");
		this.goodPrice = $(".goodPrice");
		this.goodTotalPrice = $(".goodTotalPrice");
		this.goodBid = $(".bid");
		this.goodUl = $(".carts").find(".title");
		this.storGoodsJson = new ShowCartsData().getStorGoods();
		this.userName = new ShowCartsData().userName;
	}
	computeTotalNum(){
		var num = 0;
		this.goodNum.each(function(index,ele){
			num += Number($(ele).html());
		})
		return num;
	}
	computeTotalPrice(){
		var price = 0;
		var _this = this;
		this.goodTotalPrice.each(function(index,ele){
			price += Number($(ele).html());
		})
		return price;
	}
	computeSelectOneNum(){//根据选择时产生的bid对应的计算条数
		var tNum = 0;
		this.checkOneBox.each(function(index,ele){
			console.log($(ele).prop("checked"))
			if($(ele).prop("checked")){
				tNum += Number($(ele).parent().parent().find(".goodNum").html());
			}
		});
		return tNum;
	}
	computeSelectOnePrice(){//根据选择时产生的bid对应的计算条数
		var tPrice = 0;
		this.checkOneBox.each(function(index,ele){
			if($(ele).prop("checked")){
				tPrice += Number($(ele).parent().parent().find(".goodTotalPrice").html());
			}
		});
		return tPrice;
	}
	setNumAndPrice(bid,num){//
		var _this = this;
		this.goodUl.each(function(index,ele){
			console.log(index)
			if($(ele).find(".bid").val() == bid){
				//var gNum = Number($(ele).parent().parent().find(".goodNum").html());
				var gNum = Number(_this.goodNum.eq(index).html());
				_this.goodNum.eq(index).html(gNum+num);
				var gPrice = _this.goodNum.eq(index).html() * _this.goodPrice.eq(index).html();
				_this.goodTotalPrice.eq(index).html(gPrice);

				//在原购物车中的对应bid的数量加num
				_this.storGoodsJson[index].num += num;
				//更新购物车
				_this.updateCart();
			};
		})
	}
	updateCart(){
		var storGoodsStr = JSON.stringify(this.storGoodsJson);
		localStorage.setItem(this.userName+"goods",storGoodsStr);
	}
	delGoodByBid(bid){
		//删除this.storGoodsJson中对应bid的这一条信息
		for (var i = 0; i < this.storGoodsJson.length; i++) {
			if(this.storGoodsJson[i].bid == bid){
				this.storGoodsJson.splice(i,1);
				this.updateCart();
				break;
			}
		}
		//更新购物车updateCart();
	}

}

$(function(){
	
	var obj = {
		oGoods : $("#goods"),
		cartGoodsNum : $("#cartGoodsNum")
	}
	new ShowGoods(obj).init();
})

class ShowGoods{
	constructor(obj){
		this.oGoods = obj.oGoods;
		this.cartGoodsNum = obj.cartGoodsNum;
	}
	init(){
		this.loading()
	}
	loading(){
		$.getJSON("goods.json",function(res){
			var str = "";
//			for (var i = 0; i < res.length; i++) {
				var i = 0;
				str += `
					<ul>
						<li>
							<img src="images/${res[i].src}" style="display:none;"/>
							<p style="display:none;"><span>编号：</span><span class="goodBid" >${res[i].bid}</span></p>
							<p style="display:none;"><span>书名：</span><span>${res[i].bookName}</span></p>
							<p style="display:none;"><span>作者：</span><span>${res[i].auter}</span></p>
							<p style="display:none;"><span>出版日期：</span><span>${res[i].date}</span></p>
							<p style="display:none;"><span>出版社：</span><span>${res[i].press}</span></p>
							<p style="display:none;"><span>单价：</span><span>${res[i].price}</span></p>
							<p>加入购物车</p>
						</li>
					</ul>
				`;
//			}
			this.oGoods.html(str);
			
			//加载商品操作
			this.addCart();
		
			//计算购物车数量
			this.computeNum();
			
			//点击购物车图标跳转到购物车页面
//			this.goToCartPage();
			
		}.bind(this))
	}
	addCart(){
		var _this = this;
		this.oGoods.find("p:last-child").click(function(){
			var bid = $(this).parent().find(".goodBid").html();
			alert("加入成功");
			var obj = [
					{
						"bid":bid,//bid
						"num":1//数量
					}
				];
			var objStr = JSON.stringify(obj);
			if(localStorage.getItem(location.search.split("=")[1]+"goods")){
				var storGoods = localStorage.getItem(location.search.split("=")[1]+"goods");
				var storGoodsJson = JSON.parse(storGoods);
				
				var flag = false;//表示原商品信息中不存在当前点击的这个商品
				for (var i = 0; i < storGoodsJson.length; i++) {
					if(storGoodsJson[i].bid == bid){//表示在原商品信息中存在当前点击的这个商品
						//对该商品添加一个数量
						storGoodsJson[i].num++;
						flag = true;
						break;
					}
				}
				if(!flag){//表示原商品信息中不存在当前点击的这个商品
					//添加一条数据
					var goodObj = {"bid":bid,"num":1}
					storGoodsJson.push(goodObj);
					
				}
				var storGoodsStr = JSON.stringify(storGoodsJson);
				//把添加好的这些商品信息保存到购物车中
				localStorage.setItem(location.search.split("=")[1]+"goods",storGoodsStr);
				
			}else{
				localStorage.setItem(location.search.split("=")[1]+"goods",objStr);
			}
			_this.computeNum();
		})
	}
	computeNum(){
		if(localStorage.getItem(location.search.split("=")[1]+"goods")){
			var storGoodsStr = localStorage.getItem(location.search.split("=")[1]+"goods");
			var storGoddsJson = JSON.parse(storGoodsStr);
			var num = 0;
			for (var i = 0; i < storGoddsJson.length; i++) {
				num += Number(storGoddsJson[i].num);
			}
			this.cartGoodsNum.html(num);
		}
	}
//	goToCartPage(){
//		var _this = this;
//		this.oCart.click(function(){
//			location.href = "../shopCar.html?userName=" + location.search.split("=")[1];
//		});
//	}
		
}

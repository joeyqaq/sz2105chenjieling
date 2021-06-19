$(function(){
	//轮播图----------------------------------
	var timer = setInterval(autoPlay,1500);
	var index = 0;
	function autoPlay(){
		index++;
		$(".banner_img > li").eq(index).fadeIn(1000).siblings().fadeOut(1000);
		$(".banner_middle_nav > span").eq(index).addClass("current").siblings().removeClass("current");
		if(index == $(".banner_img > li").length -1){
			index = -1;
		}
	}
	$(".banner_img > li").mouseover(function(){
		clearInterval(timer);
	})
	$(".banner_img > li").mouseout(function(){
		timer = setInterval(autoPlay,1500);
	})
	$(".banner_middle_nav > span").mouseenter(function(){
		clearInterval(timer);
		index = $(this).index()-1;
		autoPlay();
	}).mouseleave(function(){
		timer = setInterval(autoPlay,1500);
	});
	//华为精品第一排ul样式
	$(".goods_list_t > li").hover(function(){
		$(this).addClass("current").siblings().removeClass("current");
	},function(){
		$(this).removeClass("current");
	});
	
	$(".goods_list_b > li").hover(function(){
		$(this).addClass("current").siblings().removeClass("current");
	},function(){
		$(this).removeClass("current");
	});
	//华为手机第二排导航ui样式
	$(".phone_f_rolling > ul > li").hover(function(){
		$(this).addClass("current").siblings().removeClass("current");
	},function(){
		$(this).removeClass("current");
	});
	//华为手机第二排导航ui点击样式
	$(".phone_list > .phone_next").click(function(){
		$(this).addClass("disabled").siblings().removeClass("disabled");
		$(".phone_list > ul").css("transform","translate3d(-302.179px, 0px, 0px)");
	});
	$(".phone_list > .phone_prev").click(function(){
		$(this).addClass("disabled").siblings().removeClass("disabled");
		$(".phone_list > ul").css("transform","translate3d(0px, 0px, 0px)");
	});
	//智能家居样式
	$(".smart > .smart_next").click(function(){
		$(this).addClass("disabled").siblings().removeClass("disabled");
		$(".smart > ul").css("transform","translate3d(-945.113px, 0px, 0px)");
	});
	$(".smart > .smart_prev").click(function(){
		$(this).addClass("disabled").siblings().removeClass("disabled");
		$(".smart > ul").css("transform","translate3d(0px, 0px, 0px)");
	});
	//热销配件样式
	$(".accessories > .accessories_next").click(function(){
		$(this).addClass("disabled").siblings().removeClass("disabled");
		$(".accessories > ul").css("transform","translate3d(-516.49px, 0px, 0px)");
	});
	$(".accessories > .accessories_prev").click(function(){
		$(this).addClass("disabled").siblings().removeClass("disabled");
		$(".accessories > ul").css("transform","translate3d(0px, 0px, 0px)");
	});
	//笔记本电脑左边样式
	$(".notebook_f_l > ul > li").hover(function(){
		$(this).addClass("current").siblings().removeClass("current");
	},function(){
		$(this).removeClass("current");
	});
	//笔记本电脑右边样式
	$(".notebook_f_r > ul > li").hover(function(){
		$(this).addClass("current").siblings().removeClass("current");
	},function(){
		$(this).removeClass("current");
	});
	//笔记本电脑下边样式
	$(".notebook_f_r_b > .notebook_f_r_b_l").hover(function(){
		$(this).addClass("current").siblings().removeClass("current");
	},function(){
		$(this).removeClass("current");
	});
	//返回头部小火箭
	var gotop = document.getElementById("gotop");
	var img = document.getElementById("img");
	var goTimer = null;
	window.onscroll = function(){
		var sTop = document.documentElement.scrollTop || document.body.scrollTop;
		if(sTop >= 100){
			gotop.style.display = "block";
		}else{
			gotop.style.display = "none";
		}
	}
	img.onclick = function(){
		 goTimer = setInterval(function(){
			var osTop = document.body.scrollTop || document.documentElement.scrollTop;
			var speed = Math.floor(-osTop / 20);
			document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
			if(osTop <= 0){
				clearInterval(goTimer);
			}
		},20)
	}
	
	var uname = document.getElementById("userName");
//	console.log(location.search.split("=")[1]);
	uname.innerHTML = (location.search.split("=")[1]);
	var username = location.search.split("=")[1];
//	console.log(uname.innerHTML)
//	 console.log(getQueryVariable("userName"));
//	uname.innerHTML = location.href.split()
})
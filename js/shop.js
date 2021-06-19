$(function(){
	//放大镜
	var box = document.getElementsByClassName("box")[0];
	var small = document.getElementsByClassName("small")[0];
	var mask = document.getElementsByClassName("mask")[0];
	var big = document.getElementsByClassName("big")[0];
	var bigImg = document.getElementsByClassName("bigImg")[0];
	// var img_list = document.getElementById("img_list").children;
	box.onmouseenter = function(){
		mask.style.display = "block";
		big.style.display = "block";
	}
	box.onmouseleave = function(){
		mask.style.display = "none";
		big.style.display = "none";
	}
	box.onmousemove = function(e){
		var e = e || event;
		var stop = document.documentElement.scrollTop;
		var l = e.clientX - box.offsetLeft - mask.offsetWidth/2;
		var t = e.clientY - box.offsetTop - mask.offsetHeight/2 + stop;
		var maxL = box.clientWidth - mask.offsetWidth;
		var maxT = box.clientHeight - mask.offsetHeight;
		l = l < 0 ? 0 : ( l > maxL ? maxL : l);
		t = t < 0 ? 0 : ( t > maxT ? maxT : t);
		mask.style.left = l + "px";
		mask.style.top = t + "px";
		bigImg.style.left = - l * (bigImg.offsetWidth/small.offsetWidth) + "px";
		bigImg.style.top = - t * (bigImg.offsetHeight/small.offsetHeight) + "px";
	}


	// for (var i = 0; i < img_list.length; i++) {
	// 	(function(i){
	// 		var img = img_list[i];
	// 		img.onmouseenter = function(){
	// 			if(i+1 == 1){
	// 				var png = "png";
	// 			}else{
	// 				png = "jpg";
	// 			}
	// 			small.children[0].src = "images/" + (i + 1) + "z." + png;
	// 			bigImg.src = "images/" + (i + 1) + "d." + png;
	// 		}
	// 	})(i);
	// }

	// $("#img_list > img").mouseover(function(){
	// 	$(this).addClass("current").siblings().removeClass("current");
	// });


})


//通过id名称获取元素
function $id(id){
	return document.getElementById(id);
}

//获取minNum-maxNum的随机数；
function getRandom(minNum,maxNum){
	return parseInt(Math.random()*(maxNum - minNum +1))+minNum;
}

//随机获取十六进制颜色
function getColor(){
	var str = "0123456789abcdef";
	var color = "#";
	var rand = 0;
	for (var i = 0; i < 6; i++) {
		rand = getRandom(0,15);
		color += str[rand];
	}
	return color;
}

//随机获取验证码
function getYZM(num){
	var yzm = "";
	for (var i = 0; i < num; i++) {
		var rand = getRandom(48,122);
		if((rand >= 48 && rand <= 57) || (rand >= 65 && rand <= 90) || (rand >= 97 && rand <= 122)){
			var ch = String.fromCharCode(rand);
			yzm += ch;
		}else{
			i--;
		}
	}
	return yzm;
}

//获取本地时间的中国人能看懂的格式
function dateToString(date){
	var week = ["星期日" , "星期一" , "星期二" , "星期三" , "星期四" , "星期五" , "星期六" ];
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	var h = date.getHours();
	var f = date.getMinutes();
	var s = date.getSeconds();
	var w = date.getDay();
	return y + "年" +dbNum(m)+"月" +dbNum(d)+ "日" +dbNum(h)+ ":" +dbNum(f)+ ":" +dbNum(s)+ " " + week[w];
}
function dbNum(num){
	return num/10 < 1 ? 0 + "" + num : num;  
}

//获取两个时间的时间差的秒数。
function diffTime(startTime,endTime){
	return (endTime.getTime() - startTime.getTime())/1000;
}

//跨浏览器兼容ie8及以下浏览器获取class命名的元素集合。
function getEleByClass(className){
	var tag = document.getElementsByTagName("*");
	var eleArr = [];
	for (var i = 0; i < tag.length; i++) {
		if(tag[i].className == className){
			eleArr.push(tag[i]);
		}
	}
	return eleArr;
}


//判断浏览器是否是ie
function isIE(name,ver){
	var appName = navigator.appName;
	var version = navigator.appVersion;
	var str = version.split(";")[1];
	var reg = /\s/g;
	if(appName == name && str.replace(reg,"") == ver){
		return true;
	}
	return false;
}

//添加一个新的dom节点到指点节点的后面
function insertAfter(targetEle,newEle){
	var parentEle = targetEle.parentNode;
	if(parentEle.lastElementChild === targetEle){
		parentEle.appendChild(newEle);
	}else{
		parentEle.insertBefore(newEle,targetEle.nextElementSibling);
	}
}

//跨浏览器兼容ie8以下获取事件对象的button属性。
function getButton(eve){
	if(eve){
		return eve.button;
	}else{
		var button = event.button;
		switch(button){
			case 1:
				return 0;
			case 4:
				return 1;
			case 2:
				return 2;	
		}
	}
}

//阻止事件冒泡和兼容
function stopBubbling(eve){
	var e = eve || event;
	if(typeof e.stopPropagation == "undefined"){
		e.cancelBubble = true;
	}else{
		e.stopPropagation();
	}
}

//阻止事件默认和兼容
function preventdefault(eve){
	var e = eve || event;
	if(typeof e.preventDefault == "undefined"){
		e.returnValue = false;
	}else{
		e.preventDefault();
	}
}

//
function setCookie(key,val,date){
	if(date){//如果传递了一个时间表示要设置有效期
		document.cookie = key+"="+val+";expires="+date;
	}else{//如果没有传递时间对象表示不需要设置有效期
		document.cookie = key+"="+val;
	}
}

//
function getCookie(key){
	if(document.cookie){
		//userName=tom; age=23; pwd=123
		var cookieInfo = document.cookie;
		//console.log(cookieInfo);
		var cookieInfoArr = cookieInfo.split("; ");
		
		//console.log(cookieInfoArr);
		for (var i = 0; i < cookieInfoArr.length; i++) {
			if(cookieInfoArr[i].split("=")[0] == key){
				return cookieInfoArr[i].split("=")[1];
			}
		}
	}else{
		return "";
	}
}

//
function delCookie(key){
	document.cookie = key + "=;expires=" + new Date(0); 
}

//18位身份证的正则检测
function isIDCard(idCard){
	//检测平年还是润年43256719930632345x
	var y = idCard.substr(6,4);
	var m = idCard.substr(10,2);
	var dStr = "";
	switch(m){
		case "01":
		case "03":
		case "05":
		case "07":
		case "08":
		case "10":
		case "12":
			dStr = "(0[1-9]|(1|2)\\d|30|31)";
			break;
		case "04":
		case "06":
		case "09":
		case "11":
			dStr = "(0[1-9]|(1|2)\\d|30)";	
			break;
		case "02":
			if(y % 4 == 0 && y % 100 != 0 || y % 400 == 0){
				dStr = "(0[1-9]|(1|2)\\d)";
			}else{
				dStr = "(0[1-9]|1\\d|2[0-8])";	
			}
			break;
			
	}
	var idCardStr = "^[1-9]\\d{5}(1(8|9)|2[0-2])\\d{2}(0[1-9]|1[0-2])"+dStr+"\\d{3}[0-9Xx]$";
	var reg = new RegExp(idCardStr);
	return reg.test(idCard);
}

//JS获取CSS属性
function getStyle(ele,attr){//返回的是一个字符串
	return window.getComputedStyle ? window.getComputedStyle(ele)[attr] : ele.currentStyle[attr];
}

//碰撞
function isCollision(ele1,ele2){
	var ele1Rect = getRect(ele1);
	var ele2Rect = getRect(ele2);
	var ele1L = ele1Rect.left;
	var ele1T = ele1Rect.top;
	var ele1R = ele1Rect.right;
	var ele1B = ele1Rect.bottom;
	
	var ele2L = ele2Rect.left;
	var ele2T = ele2Rect.top;
	var ele2R = ele2Rect.right;
	var ele2B = ele2Rect.bottom;
	
	if(ele1L > ele2R || ele1T > ele2B || ele1R < ele2L || ele1B < ele2T){
		return false;
	}else{
		return true;
	}
}


function getRect(ele){
	var eleRect = ele.getBoundingClientRect();
	
	var num = document.documentElement.clientLeft
	//alert(num);
	return{
		left:eleRect.left - num,
		right:eleRect.right - num,
		top:eleRect.top - num,
		bottom:eleRect.bottom - num
	}
}
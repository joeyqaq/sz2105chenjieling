// var loadIndex = layer.load(1,{shade:[0.5,'#fff'],time:3000})
// 加载层
var loadIndex = layer.load(1,{shade:[0.5,'#fff']})
// 定义一个async异步函数
async function getScenics(){
  var bj = document.querySelector('.beijing');
  var bjres = await pAjax({
    url:'./php/scenics.php',
    data:{pid:2}
  })
  // console.log(bjres);
  var {message,data} = bjres;
  // console.log(data)
  var str= '';
  for (var i = 0; i < data.length; i++) {
    str += `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div class="thumbnail">
        <img src="${data[i].imgpath}" alt="...">
        <div class="caption">
            <h3>${data[i].name}</h3>
            <p class='introduce'>${data[i].introduce}</p>
            <p>
                <a href="#" class="btn btn-default" role="button">查看详情</a>
            </p>
        </div>
    </div>
  </div>` 
  }
  bj.innerHTML = str;

  var bj = document.querySelector('.anhui');
  var bjres = await pAjax({
    url:'./php/scenics.php',
    data:{pid:13}
  })
  var {message,data} = bjres;
  // console.log(data)
  var str= '';
  for (var i = 0; i < data.length; i++) {
    str += `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
    <div class="thumbnail">
        <img src="${data[i].imgpath}" alt="...">
        <div class="caption">
            <h3>${data[i].name}</h3>
            <p class='introduce'>${data[i].introduce}</p>
            <p>
                <a href="#" class="btn btn-default" role="button">查看详情</a>
            </p>
        </div>
    </div>
  </div>` 
  }
  bj.innerHTML = str;
  layer.close(loadIndex)
}
getScenics()




// var obj = {name:'leon',age:10};
// 解构赋值
// var {name,age} = {name:'leon',age:10};
// console.log(name) // leon
// console.log(age) // 10
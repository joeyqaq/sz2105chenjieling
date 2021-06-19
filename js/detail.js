    // 根据url获取数据id的值  
    var urlParams = location.search.match(/id=(\d+)/);
    // console.log(urlParams)
    if(!urlParams){
        var paramindex = layer.msg('非法访问！',{
            icon:2,
        })
        setTimeout(()=>{
            layer.close(paramindex)
            location.href = './list.html';
            return false;
        },800)
    }
    // 拿到商品id
    var id = urlParams[1];
    var loadindex = layer.load(1,{
        shade: [0.5,'#333']
    })
    async function temp(){
        // 查询详情数据
        var res = await $.ajax({
            url:'./php/detail.php',
            data:{id},
            dataType:'json'
        })
        var { data } = res;
        console.log(data);
        $('.tab ol li').eq(0).text(data.introduce)
        $('.description h4').text(data.name)
        $('.description .price .souceprice span').text(data.price)
        // 将商品的库存数量,通过属性添加到 标签中
        $('.addCart .number').attr('data-stock',data.stock)
        var imgs = data.imgpath.split('==========')
        for(var i=0;i<imgs.length;i++){
            $('.enlarge .small ul').append($(`<li><img src="${imgs[i]}"></li>`))
        }
        $('.enlarge .middle>img').attr('src',imgs[0])
        $('.enlarge .middle .big>img').attr('src',imgs[0])
        enlarge()
        layer.close(loadindex)
    }
    temp()

    // 数量 加和减
    $('.add').click(function(){
        var num = $(this).prev().val()-0;
        $(this).next().prop('disabled',false)
        num++;
        // console.log(111)
        // console.log($(this).parent().attr('data-stock'))
        if(num>=$(this).parent().attr('data-stock')){
            // console.log($(this).parent().attr('data-stock'))
            num=$(this).parent().attr('data-stock')
            $(this).prop('disabled',true)
        }
        $(this).prev().val(num)
    })
    $('.reduce').click(function(){
        var num = $(this).prev().prev().val()-0;
        $(this).prev().prop('disabled',false)
        num--;
        if(num<=1){
            num=1
            $(this).prop('disabled',true)
        }
        $(this).prev().prev().val(num)
    })

    // 加入购物车
    $('.addCart .addBtn').click(function(){
        // 判断是否登录
        var username = getCookie('username')
        if(!username){
            var tipindex = layer.msg('请先登录！')
            setTimeout(function(){
                layer.close(tipindex)
                localStorage.setItem('url',location.href)
                location.href = 'login.html';
            },2000)
            return false;
        }
        // 判断本地存储中是否有数据
        var data = localStorage.getItem('data');
        if(data){
            data = JSON.parse(data);
            // 判断数据中是否有当前这条数据
            var obj = data.filter(v=>v.username===username && v.goodsid===id)
            if(obj.length){
                // 如果本地存储中有当前这个商品的数据，就让数量增加
                obj[0].number = obj[0].number + ($('.add').prev().val()-0)
            }else{
                // 如果没有当前这个商品的数据，就把当前这个商品的数据添加进去
                data.push({
                    username,
                    goodsid:id,
                    number:$('.add').prev().val()-0
                })
            }
            localStorage.setItem('data',JSON.stringify(data))
        }else{
            // 没有数据，就将当前这一条数据存储起来
            localStorage.setItem('data',JSON.stringify([
                {
                    username,
                    goodsid:id,
                    number:$('.add').prev().val()-0
                }
            ]));
        }
        layer.msg('加入购物车成功',{
            icon:1,
            time:1000
        })
    })


$(function() {
  var loadindex = layer.load(1, {
      shade: [0.5, '#333']
  })
  $.ajax({
      url: './php/list.php',
      dataType: 'json',
      success(res) {
          var {
              data
          } = res;
          console.log(data);
        //   data.reverse()
          var pageSize = 4;
          new Page("page", {
              language: {
                  first: '首页',
                  prev: '上一页',
                  next: '下一页',
                  last: '尾页'
              },
              pageData: {
                  pageSize,
                  total: data.length
              },
              show: function(currentPage) {
                  var tmp = data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                  var html = '';
                  tmp.forEach(v => {
                      html += `
                          <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                              <div class="thumbnail">
                                  <img src="${v.imgpath}" alt="...">
                                  <div class="caption">
                                      <h3>${v.name}</h3>
                                      <p class="introduce">${v.introduce}/</p>
                                      <p>
                                          <a href="detail.html?id=${v.id}" class="btn btn-default" role="button">查看详情</a>
                                      </p>
                                  </div>
                              </div>
                          </div>
                      `
                  })
                  $('.scenics').html(html)
              }
          })
          layer.close(loadindex)
      }
  })
})
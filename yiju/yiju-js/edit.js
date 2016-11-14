//---------------------------**修改个人资料**---------------------------------------
$('.whole-edit li').eq(0).mouseover(function(){
    $('.whole-edit li').removeClass('current-1').eq(0).addClass('current-1');
    $('.shangchuan').show();
    $('.nicheng').hide();
    $('.mima').hide();
});

$('.whole-edit li').eq(1).mouseover(function() {
    $('.whole-edit li').removeClass('current-1').eq(1).addClass('current-1');
    $('.nicheng').show();
    $('.shangchuan').hide();
    $('.mima').hide();
});

$('.whole-edit li').eq(2).mouseover(function(){
    $('.whole-edit li').removeClass('current-1').eq(2).addClass('current-1');
    $('.mima').show();
    $('.shangchuan').hide();
    $('.nicheng').hide();
});

//                                   修改昵称:
$('.nicheng .put').on({
    focus:function(){
        $(this).css({
            'border-color':'rgb(112, 173, 70)'
        })
    },
    blur:function(){
        var val=$(this).val();
        if(/[\w]{6,20}$/.test(val)){
            $('.nicheng  .choose').click(function(){
                $.ajax({
                    type:'post',
                    url:'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
                    dataType:'jsonp',
                    data:{
                        lname:val
                    },
                    success:function(data){
                        console.log(data);
                        if(data.resultCode=='0000'){
                             login();
                        }

                    }

                })
            })

        } else{
            $(this).css({
                'border-color':'#981616'
            })
        }

    }
});

//                                 修改密码:
var pass;
$('.mima  input').focus(function(){
        $(this).css({
            'border-color':'rgb(112, 173, 70)'
        })
    }

);
$('.mima  input').eq(0).blur(function () {
    var val=$(this).val();
    console.log((val == pass));
    if (!(val == pass)) {
        $(this).css({
            'border-color': '#981616'
        });

    }

});
$('.mima  input').eq(1).blur(function(){
    var val = $(this).val();
    if(!(/^[a-zA-Z0-9][\w]{5,19}/.test(val))){
        $(this).css({
            'border-color': '#981616'
        });

    }
});
//再次输入时，如果此时输入框内容为空或与新密码不同时，输入框颜色变红
$('.mima  input').eq(2).blur(function(){
    var val = $(this).val();
    if(!(val=''? false : val === $('.mima input').eq(1).val())){
        $(this).css({
            'border-color': '#981616'
        });

    }

});

$('.mima .choose').click(function(){

    if( $('.mima input').eq(0).val() == pass &&
         /^[a-zA-Z0-9][\w]{5,19}/.test($('.mima input').eq(1).val()) &&
         $('.mima input').eq(2).val() === $('.mima input').eq(1).val()
      ) {
          $.ajax({
              type: 'post',
              url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
              dataType: 'jsonp',
              data:{
                  lpassword:$('.mima  input').eq(1).val()
              },
               success:function(data){
                   alert(data.resultCode);
                   if(data.resultCode=='0000'){
                       $('.xiugai').show();
                       $('.no').click(function(){
                           $('.xiugai').hide();
                       });
                       $('.xiugai  input').eq(0).click(function(){
                           $('.xiugai').hide();
                       });
                       login();

                   }
               }
          })
    }
});

//                                  ajax
//获取登陆者信息，看看是否登陆，如果没有，要去登录；登陆过的话，将我的昵称，还有注册改为登录过的用户名，上传图片
login();
function login(){
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/loginSession.action',
        dataType: 'jsonp',
        success: function (data) {
           console.log(data);
            if (data.success) {
                 pass=data.data[0].lpassword;
                var a = '<a href="###">' + data.data[0].lname + '</a> | <a href="###" onclick="quitLogin()">退出</a>';
                $('.header-r').html(a);
                $('.body-l p').html(data.data[0].lname);
                if (data.data[0].lphoto){
                    $('.body-l img').attr('src', 'http://www.zhijunxing.com/yiju/upload/' + data.data[0].lphoto);
                } else {
                    alert('没有图片');
                }

            } else {
                location.href = 'http://192.168.0.190/登录.html';
            }
        }
    });

}
//上传图片按钮,（当上传一次保存完之后，在不刷新页面的情况下，此时file-ch就没有了绑定事件，除非刷新就可以重新拥有绑定事件）
//除此之外，还可以用到委托事件,
$('.shangchuan').on('change','.file-ch' ,function () {
    if (typeof FileReader == 'undefined') {
        alert("检测到您的浏览器不支持FileReader对象！");
    }
    var reader= new FileReader(),
        val=this.files[0];
    reader.readAsDataURL(val);
    reader.onload=function(){
        $('.shangchuan  a  img').attr('src',reader.result);
    }
});
//点击保存，开始上传图片
$('.shangchuan .choose').click(function () {

    $.ajaxFileUpload({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/uqdateLandlord.action',
        secureuri: false,
        fileElementId:'uploadPhoto',
        async: true,
        cache: true,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        complete: function(data){
            console.log(data);
        }
    });
    setTimeout(function(){
        login();//一秒后重新获取登录信息，将选择的图片替换到左边的img里面
    },1000);
});

//退出登录页面，回到首页
function quitLogin(){
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/quitLogin.action',
        dataType: 'jsonp',
        success: function (data) {
            //console.log(data);
            if(data.resultCode=='0000'){
                location.href = 'http://192.168.0.190/index.html';
            }

        }
    });

}
// -----------------------------------------**我的收藏**--------------------------------
$('.body-l li').eq(0).click(function(){
    var pageNo=1;//点击我的收藏，显示第一页的信息,当前页码为1
    collect(pageNo);
    $(this).addClass('current').siblings().removeClass('current');
    $('.collect').show();
    $('.announce').hide();
    $('.look-history').hide();
    $('.no-change-edit').hide();
    $('tr').on('click','.th2',function(){
        if(($(this).html())=='上一页'){
            if(!(pageNo==1)){
                pageNo-=1;
                collect(pageNo);
            }

        }else if(($(this).html())=='下一页'){
            if(!(pageNo== $('.biaoge .th2').last().prev().html())){
                pageNo+=1;
                collect(pageNo);
            }

        }else{
            pageNo=parseInt($(this).html());
            collect(pageNo);
        }
    });




});
function collect(pageNo) {
    $.ajax({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/queryCollectHouses.action',
        dataType: 'jsonp',
        data: {
            pageNo: pageNo
        },
        success: function (data) {
            console.log(data.rowCount);
            if (data.success) {
                var th;
                if (Math.ceil(data.rowCount / 2) <= 5) {
                    th = '<th class="th2">上一页</th>';
                    for (var i = 1; i < Math.ceil(data.rowCount / 2); i++) {
                        if (i == pageNo) {
                            th += '<th class="th2 page-checked">' + i + '</th>';
                        } else {
                            th += '<th class="th2">' + i + '</th>';
                        }
                    }
                    th += '<th class="th2">下一页</th>';
                } else if (pageNo <= 3) {
                    th = '<th class="th2">上一页</th>';
                    for (var i = 1; i <= 4; i++) {
                        if (i == pageNo) {
                            th += '<th class="th2 page-checked">' + i + '</th>';
                        } else {
                            th += '<th class="th2">' + i + '</th>';
                        }
                    }
                    th += '<th> ··· </th><th class="th2">' + Math.ceil(data.rowCount / 2) + '</th><th class="th2">下一页</th>';
                } else if (pageNo + 2 >= Math.ceil(data.rowCount / 2)) {
                    th = '<th class="th2">上一页</th>' +
                        '<th class="th2">1</th>' +
                        '<th> ···</th>';
                    for (var i = 3; i >= 0; i--) {
                        if (Math.ceil(data.rowCount / 2) - i == pageNo) {
                            th += '<th class="th2  page-checked">' + (Math.ceil(data.rowCount / 2) - i) + '</th>';
                        } else {
                            th += '<th class="th2">' + (Math.ceil(data.rowCount / 2) - i) + '</th>';
                        }
                    }
                    th += '<th class="th2">下一页</th>';
                } else if (pageNo + 2 < Math.ceil(data.rowCount / 2)) {
                    th ='<th class="th2">上一页</th>' +
                        '<th class="th2">1</th>' +
                        '<th> ··· </th>' +
                        '<th class="th2">' + (parseInt(pageNo) - 1) + '</th>' +
                        '<th class="th2   page-checked">' + pageNo + '</th>' +
                        '<th  class="th2">' + (parseInt(pageNo) + 1) + '</th>' +
                        '<th> ··· </th>' +
                        '<th  class="th2">' + Math.ceil(data.rowCount / 2) + '</th>' +
                        '<th  class="th2">下一页</th>';
                }
                $('tr').html(th);
                 var item = '';
                 for(var i=0;i<data.data.length;i++){
                   item+='<div class="section" id="'+data.data[i].id+'"><img class="light" src="http://www.zhijunxing.com/yiju/upload/'+
                       data.data[i].photo.split(',')[0]+'"><ul><li class="li1">'+ data.data[i].tittle+'  '+ data.data[i].room
                           +'  '+ data.data[i].type+'<img src="img/gr.png"><img  src="img/inte.png"  class="inte"></li>'+
                           '<li class="li2">'+data.data[i].room+' | '+data.data[i].rentway+' | ' + data.data[i].hlevel +
                           ' | ' + data.data[i].floor + '/' +
                           data.data[i].countfloor+'层</li>'+'<li class="li2"><img src="img/地图.png">'+data.data[i].address
                           +'</li><li class="li2"><span class="decoration">'+ data.data[i].hlevel+
                           '</span><span class="sub">'+data.data[i].paymethod+'</span></li></ul>'
                           +' <p class="price"><span>删除 ×</span><i>'+  data.data[i].price+'<s>/月'+'</s></i><em>'+
                           data.data[i].addtime+'</em></p><p class="xian"></p><p class="xian"></p>'+
                           '</div>'
                }
                $('.dv').html(item);

                $('.price').on('click','span',function() {
                    $('.shanchu').show();
                });
                $('.btn input').eq(0).click(function(){
                    $('.shanchu').hide();
                     $.ajax({
                           type: 'GET',
                           url: 'http://www.zhijunxing.com/yiju/delCollect.action',
                           data: {
                               hid: $('.section').attr('id')
                           },
                           success: function (data) {
                               if (data.resultCode == '0000') {
                                   alert('aa');
                               }
                           }
                     })

                });
            }
            else {
                alert('您没有收藏房源');
            }
        }
    })
}







$('.body-l li').eq(1).click(function(){
    $(this).addClass('current').siblings().removeClass('current');
    $('.collect').hide();
    $('.announce').show();
    $('.look-history').hide();
    $('.no-change-edit').hide();
});

$('.body-l li').eq(2).click(function(){
    $(this).addClass('current').siblings().removeClass('current');
    $('.collect').hide();
    $('.announce').hide();
    $('.look-history').show();
    $('.no-change-edit').hide();
});

$('.body-l li').eq(3).click(function(){
    $(this).addClass('current').siblings().removeClass('current');
    $('.collect').hide();
    $('.announce').hide();
    $('.look-history').hide();
    $('.no-change-edit').show();
});





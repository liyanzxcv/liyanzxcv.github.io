$('#home .aa').click(function(){
   $('div.div_1').show();
    $('.host').hide();

});
$('#home .bb').click(function(){
    $('.host').show();
    $('.house').click(function(){
        location.href='http://192.168.0.190/fabufangyuan.html';
    });
    $('div.div_1').hide();
});

$('#shown').hover(function(){
    $('#down').show();
},function(){
    $('#down').hide();
});


$('#down').hover(function(){
    $(this).show();
},function(){
    $(this).hide();
});

$('#down p').click(function(){
    $('#shown').html($(this).html());
    $('#down').hide();
});
//ajax获取登陆者信息
$.ajax({
    type:'post',
    url:'http://www.zhijunxing.com/yiju/loginSession.action',
    dataType:'jsonp',
    success:function(data){
        console.log(data);
        if(data.success){
          $('.header-r a').eq(0).html('欢迎    '+data.data[0].lname).attr('href','http://192.168.0.190/edit.html');
          $('.header-r a').eq(1).html('退出').attr({
              'href':'###',
              'onclick':'quitLogin()'
          })
        }


    }
});
function quitLogin(){
    $.ajax({
        type:'post',
        url:'http://www.zhijunxing.com/yiju/quitLogin.action',
        dataType:'jsonp',
        success:function(data){
            console.log(data.resultCode);
            if(data.resultCode=='0000'){
                $('.header-r a').eq(0).html('登录').attr('href','http://192.168.0.190/登录.html');
                $('.header-r a').eq(1).html('注册').attr('href','http://192.168.0.190/注册.html').removeAttr('onclick')
            }
        }
    })
}



//ajax获取:查询推荐房源信息
$.ajax({
    type:'post',
    url:'http://www.zhijunxing.com/yiju/queryHousesTop.action',
    dataType:'jsonp',
    success:function(data){
        //console.log(data.success);结果为true
        if(data.success){
            console.log(data);
            var item='';
            for(var i in data.data){
                item+='<li>'+'<a href="http://192.168.0.190/xiangqingye.html?id='+data.data[i].id+
                      '"><img src="http://www.zhijunxing.com/yiju/upload/'
                      +data.data[i].photo.split(',')[0]+'"/></a><p>'
                      +data.data[i].villageName+'</p><span>'+data.data[i].room
                      +'</span><i><s>'+data.data[i].price+'</s>元/月</i></li>'
            }
            $('.banner-list').append(item);
            $('#banner').carousel({
                element: $('#banner'),
                time: 2000,
                left: $('.prev'),
                right: $('.next'),
                oli: 1
            }, false, false);



        }
    }


});
















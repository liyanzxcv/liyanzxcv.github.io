//获取登录者信息
$.ajax({
    type:'post',
    url:'http://www.zhijunxing.com/yiju/loginSession.action',
    dataType:'jsonp',
    success:function(data){

        if(data.success){
            $('.header-r a').eq(0).html('欢迎    '+data.data[0].lname).attr('href','http://192.168.0.190/edit.html');
            $('.header-r a').eq(1).html('退出').attr({
                'href':'###',
                'onclick':'quitLogin()'
            })
        }else{
            location.href='http://192.168.0.190/登录.html';
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





/*var obj={furniture:''};
$('.chuzu div').click(function(){
    $(this).children('p').children('a').addClass('rentway');
    $(this).siblings().children('p').children('a').removeClass('rentway');
    a= $(this).children('p').children('a').get(0).className;
    b= $(this).children('p').children('a').get(0).getAttribute('aa');
    obj[a]=b;
    console.log(obj);


});*/





$('.chuzu  div').click(function(){
    $(this).children().children().addClass('grentway');
    $(this).siblings().children().children().removeClass('grentway');


});

$('.shenfen div').click(function(){
      $(this).children().children().addClass('atype');
      $(this).siblings().children().children().removeClass('atype');
});
/*$('.shenfen div').click(function(){
    $(this).children('p').children('a').addClass('type');
    $(this).siblings().children('p').children('a').removeClass('type');
    c= $(this).children('p').children('a').get(0).className;
    d=$(this).text();
    obj[c]=d;
    console.log(obj);

});*/
//方向：
$('.chaoxiang #aa').hover(function(){
    $('.dire').show();
},function(){
    $('.dire').hide();
});
$('.dire').hover(function(){
    $(this).show();
},function(){
    $(this).hide();
});

$('.dire p').click(function(){
    $('.chaoxiang #aa').html($(this).html());
    $('.dire').hide();
});


//装修水平：
$('.chaoxiang #bb').hover(function(){
    $('.deco').show();
},function(){
    $('.deco').hide();
});
$('.deco').hover(function(){
    $(this).show();
},function(){
    $(this).hide();
});

$('.deco p').click(function(){
    $('.chaoxiang #bb').html($(this).html());
    $('.deco').hide();
});


//支付方式：
$('.zujin a').hover(function(){
    $('.pay').show();
},function(){
    $('.pay').hide();
});
$('.pay').hover(function(){
    $(this).show();
},function(){
    $(this).hide();
});

$('.pay p').click(function(){
    $('.zujin a').html($(this).html());
    $('.pay').hide();
});

$('.peizhi a').click(function(){
    $(this).addClass('tu');

    /*if(!(this.className=='tu')){
       furniture+=$(this).html();
        $(this).addClass('tu');
        console.log(furniture);
    }else{
        var length=$(this).html().length;
        var str= $(this).html();
        var num= furniture.indexOf($(this).html());
        var tt = furniture.substring(num,parseInt(num+length));
            furniture = furniture.replace(tt, '');
            $(this).removeClass('tu');
    }*/
});


var fileIds = [], num = 1;
$('.pp').on('change', 'input[type=file]', function () {
    var reader = new FileReader(), val = $(this).get(0).files[0];
    reader.readAsDataURL(val);
   // console.log(typeof reader);
    reader.onload = function () {

        fileIds.push('file' + num);
        $('#' + fileIds[num - 1]).hide();
        num += 1;
        $('.pp  a').append('<img src="' + reader.result + '"/>');
        $('.pp').append('<input type="file" name="file" id="file' + num + '">');
    }
});
var furniture = '';
var rentway=$('.chuzu  div').eq(1).text();
var type=$('.shenfen div').eq(1).text();
var direction=$('.chaoxiang #aa').html();
var hlevel=$('.chaoxiang #bb').html();
var paymethod=$('.zujin a').html();
var villageName=$('input[name=villageName]').val();
var shi=$('input[name=shi]').val();
var ting=$('input[name=ting]').val();
var wei=$('input[name=wei]').val();
var room=shi+'室'+ting+'厅'+wei+'卫';
var area=$('input[name=area]').val();
var floor=$('input[name=floor]').val();
var countfloor=$('input[name=countfloor]').val();
var price=$('input[name=price]').val();
var tittle=$('input[name=tittle]').val();
var features=$('input[name= features]').val();
var address=$('input[name=address]').val();
var linkman=$('input[name=linkman]').val();
var linkphone=$('input[name=linkphone]').val();
var condition=villageName+room;

$('.fabu').click(function () {

    for(var i=0;i<$('.peizhi a').length;i++) {
        if ($('.peizhi a').eq(i).get(0).className == 'tu'){
            furniture += $('.peizhi a').eq(i).html();
            //console.log(furniture);
        }

    }
    $.ajaxFileUpload({
        type: 'post',
        url: 'http://www.zhijunxing.com/yiju/addHouses.action',
        secureuri: false,
        //fileElementId: fileIds,
        data:{
            rentway:rentway,
            type:type,
            direction:direction,
            hlevel:hlevel,
            paymethod:paymethod,
            villageName:villageName,
            shi:shi,
            ting:ting,
            wei:wei,
            room:room,
            area:area,
            floor:floor,
            countfloor:countfloor,
            price:price,
            tittle:tittle,
            features: features,
            address:address,
            linkman:linkman,
            linkphone:linkphone,
            condition:condition,
            furniture:furniture
        },
        async: true,
        cache: true,
        dataType:'json',
        contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
        success: function (data) {
            if(data.resultCode='0000'){
                 alert('发布成功');
            }
        }
    })
});
//查找发布的房源
$.ajax({
    type:'post',
    url:'http://www.zhijunxing.com/yiju/queryHousesBylid.action',
    dataType:'jsonp',
    data:{
        pageNo:'1'
    },
    success:function(data){
        if(data.success){
          alert('发布成功');
        }
    }
});





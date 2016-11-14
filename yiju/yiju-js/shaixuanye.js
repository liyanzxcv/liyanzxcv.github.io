for(var i=0;i<$('.body1-bottom li').length;i++){

    $('.body1-bottom li').eq(i).click(function(){
        $(this).addClass('all').siblings().removeClass('all');

    });
}

var obj={};
    obj.pageNo=1;
    collect(obj);
$('tr').on('click','.th2',function(){
    if(($(this).html())=='上一页'){
        if(!(obj.pageNo==1)){
            obj.pageNo--;
            collect(obj);

        }
    }else if(($(this).html())=='下一页'){
        if(!(obj.pageNo==$('.th2').last().prev().html())){
            obj.pageNo++;
            collect(obj);

        }
    }else {
         obj.pageNo= parseInt($(this).html());
         collect(obj);
    }
});
function collect(obj){
    $.ajax({
        type:'post',
        url:'http://www.zhijunxing.com/yiju/queryHousesBySql.action',
        data:obj,
        dataType:'jsonp',
        success:function(data){
            //console.log(data.rowCount);
            if(data.success){
                var th;
                if(Math.ceil(data.rowCount/5)<=5){
                   th='<th class="th2">上一页</th>';
                   for(var i=1;i<Math.ceil(data.rowCount/5);i++){
                        if(i==obj.pageNo){
                            th+='<th class="th2 page-checked">'+i+'</th>';
                        }else{
                            th+='<th class="th2">'+i+'</th>';
                        }
                   }
                    th+='<th class="th2">下一页</th>';
                }else if(obj.pageNo<=3){
                    th='<th class="th2">上一页</th>';
                    for(var i=1;i<=4;i++){
                        if(i==obj.pageNo){
                            th+='<th class="th2 page-checked">'+i+'</th>';
                        }else{
                            th+='<th class="th2">'+i+'</th>';
                        }
                    }
                    th+='<th>•••</th>'+'<th class="th2">'+Math.ceil(data.rowCount/5)+'</th>'+
                        '<th class="th2">下一页</th>';

                }else if((obj.pageNo+2)<Math.ceil(data.rowCount/5)){
                    th='<th class="th2">上一页</th>'+
                       '<th class="th2">1</th>'+
                       '<th>•••</th>'+
                       '<th class="th2">'+(parseInt(obj.pageNo)-1)+'</th>'+
                       '<th class="th2  page-checked">'+obj.pageNo+'</th>'+
                       '<th class="th2">'+(parseInt(obj.pageNo)+1)+'</th>'+ '<th>•••</th>'+
                       '<th class="th2">'+Math.ceil(data.rowCount/5)+'</th>'+
                       '<th class="th2">下一页</th>';

                }else if((obj.pageNo+2)>=Math.ceil(data.rowCount/5)){
                    th= '<th class="th2">上一页</th>'+
                        '<th class="th2">1</th>'+
                        '<th>•••</th>';
                    for(var i=3;i>=0;i--){
                        if(Math.ceil(data.rowCount/5)- i == obj.pageNo){
                            th+='<th class="th2 page-checked">'+(Math.ceil(data.rowCount/5)- i)+'</th>';
                        }else{
                            th+='<th class="th2">'+(Math.ceil(data.rowCount/5)- i)+'</th>';
                        }
                    }
                    th+='<th class="th2">下一页</th>';

                }
                $('tr').html(th);
                var item='';
                for(var i=0;i<data.data.length;i++){
                    item+='<div class="section">'+
                          '<a href="xiangqingye.html?id='+data.data[i].id+ '"><img class="light" src="http://www.zhijunxing.com/yiju/upload/'+data.data[i].photo.split(',')[0]+
                          '"/></a><ul><li class="li1">'+data.data[i].tittle+ ' '+ data.data[i].room+
                          '  '+data.data[i].type+'<img src="img/gr.png"/><img src="img/inte.png" class="inte"/></li><li class="li2">'+
                          data.data[i].room+' | '+data.data[i].renyway+' | '+data.data[i].hlevel+' | '+data.data[i].floor+
                          '/'+data.data[i].countfloor+'层</li><li class="li2"><img src="img/地图.png">'+data.data[i].address+
                          '</li><li class="li2"><span class="decoration">'+data.data[i].hlevel+'</span><span class="sub">'+
                          data.data[i].paymethod+ '</span></li></ul><p class="price"><i>'+data.data[i].price+
                          '/月</s></i><em>'+data.data[i].addtime+'</em></p></div>';

                }
                $('.body2').html(item);
               /* $('.section').click(function(){
                    window.open='http:192.168.0.190/xiangqingye.html?id='+$(this).attr('id');
                })*/
            }
        }
    })
}

$('.zujin a').click(function(){
        if($(this).html()=='500以下'||$(this).html()=='5000以上'){
            $(this).css({
                'color':'#70ad46'
            });
            $(this).siblings('a').css({
                'color':'#666'
            });
            var pri=$(this).html().slice(0, $(this).html().length-2);
            $(this).addClass('price');
            obj[this.className]=pri;
            collect(obj);


        }else{
            $(this).css({
                'color':'#70ad46'
            }).siblings('a').css({
                'color':'#666'
            });
            var pri=$(this).html().slice(0, $(this).html().length-1);
            $(this).addClass('price');
            obj[this.className]=pri;
            collect(obj);
        }


});

$('.fang a').click(function(){
    $(this).css({
        'color':'#70ad46'
    }).siblings('a').css({
        'color':'#666'
    });

    $(this).addClass('shi');
    obj[this.className]=$(this).attr('id');
    collect(obj);

});
//-)房屋类型：

$('.choose a').eq(0).hover(function(){
      $('#dz1').show();
},function(){
      $('#dz1').hide();
});

$('#dz1').hover(function(){
    $(this).show();
},function(){
    $(this).hide();
});


$('#dz1 p').click(function(){
     $('.choose a').eq(0).html($(this).html());


     $('.choose a').eq(0).addClass('room');
     $('.choose a').eq(0).attr('id','');


     obj[$('.choose a').eq(0).get(0).className]= $('.choose a').eq(0).html();
    // console.log(obj[$('.choose a').eq(0).className]);
     console.log(obj);
     collect(obj);

     $('#dz1').hide();


});
//-)装修水平
$('.choose a').eq(1).hover(function(){
    $('#dz2').show();
},function(){
    $('#dz2').hide();
});

$('#dz2').hover(function(){
    $(this).show();
},function(){
    $(this).hide();
});

$('#dz2 p').click(function(){
    $('.choose a').eq(1).html($(this).html());
    $('.choose a').eq(1).addClass('level');

    obj[$('.choose a').eq(1).get(0).className]= $('.choose a').eq(1).html();
    // console.log(obj[$('.choose a').eq(0).className]);
    console.log(obj);
    collect(obj);

    $('#dz2').hide();




}); 
























var off={};
//创建一个空对象，用来存储每个需要提交时验证是否通过，
//当每个input失去焦点的时候获取这个input的类，
// 当然这个类可以是其他的标识，他只起到的作用是用来甄别这个输入框正确的完成了输入，
// 然后把这个名字当对象的属性存储到off里面，值为true或false
$('form  input[name=lname]').on({
    focus:function(){
        $(this).css({
            'border-color':'rgb(112, 173, 70)'
        })
    },
    blur:function(){
      var val=$(this).val();
      yy(/[\w]{6,20}/.test(val),this);

    }
}).focus();
$('form input[name=lpassword]').on({
    focus:function(){
        $(this).css({
            'border-color':'rgb(112, 173, 70)'
        })
    },
    blur:function(){
        var val=$(this).val();
        yy(/^[a-zA-Z0-9][\w]{5,19}/.test(val),this);
    }
});
$('form  .input-3').on({
    focus:function(){
        $(this).css({
            'border-color':'rgb(112, 173, 70)'
        })
    },
    blur:function(){
        var val=$(this).val();
        yy(val=''? false :val===$('form  input[name=lpassword]').val(),this);
    }
});
$('form input[name=lemail]').on({
    focus:function(){
        $(this).css({
            'border-color':'rgb(112, 173, 70)'
        })
    },
    blur:function(){
        var val=$(this).val();
        yy(/^[a-zA-Z0-9][\w]{5,17}@[a-z0-9]{2,6}(\.[a-z]{2,3}){1,2}$/.test(val),this);
    }
});
$('form input[name=lphone]').on({
    focus:function(){
        $(this).css({
            'border-color':'rgb(112, 173, 70)'
        })
    },
    blur:function(){
        var val=$(this).val();
        yy(/^1[0-9]{10}/.test(val),this);
    }
});


function yy(put,_this){
    if(put){
        $(_this).css({
            'border-color':'rgb(112, 173, 70)'
        });
        off[_this.className]=true;
    }else{
        $(_this).css({
            'border-color':'#981616'
        });
        off[_this.className]=false;

    }
}
//-------------------------第一种多项选择-------------------------------------------
/*$('form  .put').click(function(){
     var onoff=true;
     if (onoff) {

        $('form input').blur();


        /!* if (!(/[\w]{6,20}/.test($('form input[name=lname]').val()))) {
         $('form input[name=lname]').blur();
         }
         if (!(/^[a-zA-Z0-9][\w]{5,19}/.test($('form input[name=lpassword]').val()))) {
         $('form input[name=lpassword]').blur();
         }
         if (!($('form .input-3').val() === $('form input[name=lpassword]').val()) || $('form .input-3').val()=='' ) {
         $('form .input-3').blur();
         }
         if (!(/^[a-zA-Z0-9][\w]{5,17}@[a-z0-9]{2,6}(\.[a-z]{2,3}){1,2}$/.test($('form input[name=lemail]').val()))) {
         $('form input[name=lemail]').blur();
         }
         if (!(/^1[0-9]{10}$/.test($('form input[name=lphone]').val()))) {
         $('form input[name=lphone]').blur();
         }
         *!/
        if ($('#check').attr('checked')=='checked') {
            onoff = true;
        }else{
            onoff = false;
            alert('请选择');

        }
    }
    for (var i in off) {
        if (!off[i]) {
            onoff = false;
        }
    }
    if (onoff) {
        $.ajax({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/saveLandlord.action',
            dataType: 'jsonp',
            data: $('form').serialize(),
            success: function (data) {
                alert(data.resultCode);
                if (data.resultCode == 0000) {
                   $('.zhezhao').show();
                   $('.no').click(function(){
                   $('.zhezhao').hide();
                     });
                   $('.away').click(function(){
                        $.ajax({
                            type: 'post',
                            url: 'http://www.zhijunxing.com/yiju/landlordLogin.action',
                            dataType: 'jsonp',
                            data: {
                                lname:$('form input[name=lname]').val(),
                                lpassword:$('form input[name=lpassword]').val()
                         },
                            success: function (data) {
                                if (data.resultCode == 0000) {
                                   location.href = 'http://192.168.0.190/首页.html'
                                } else {
                                      alert('失败');
                                }
                            }
                        })
                   });


                    //location.href = 'http://192.168.0.190/登录.html'
                }
            }
        })
    }
});*/
//-------------------------第二种单项选择，一次选择一个-------------------------------------------
$('form  .put').click(function() {
    var onoff = true;
    //第二种写法---单项选择每次来选择多个代码块之一来执行
    if (!(/[\w]{6,20}/.test($('form input[name=lname]').val()))) {
        $('form input[name=lname]').blur();
    } else if (!(/^[a-zA-Z0-9][\w]{5,19}/.test($('form input[name=lpassword]').val()))) {
        $('form input[name=lpassword]').blur();
    } else if (!($('form .input-3').val() === $('form input[name=lpassword]').val())) {
        $('form .input-3').blur();
    } else if (!(/^[a-zA-Z0-9][\w]{5,17}@[a-z0-9]{2,6}(\.[a-z]{2,3}){1,2}$/.test($('form input[name=lemail]').val()))) {
        $('form input[name=lemail]').blur();
    } else if (!(/^1[0-9]{10}$/.test($('form input[name=lphone]').val()))) {
        $('form input[name=lphone]').blur();
    } else if (!($('#check').attr('checked')=='checked')){
        onoff=false;
        alert('请选择');
    } else {
        $.ajax({
            type: 'post',
            url: 'http://www.zhijunxing.com/yiju/saveLandlord.action',
            dataType: 'jsonp',
            data: $('form').serialize(),
            success: function (data) {
                alert(data.resultCode);
                if (data.resultCode == 0000) {
                    $('.zhezhao').show();
                    $('.no').click(function(){
                        $('.zhezhao').hide();
                    });

                   // location.href = 'http://192.168.0.190/登录.html'
                }

            }
        })
    }

});


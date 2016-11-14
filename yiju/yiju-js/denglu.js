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


$('form  .put1').click(function(){
    var onoff=true;
    if (!(/[\w]{6,20}/.test($('form input[name=lname]').val()))) {
        $('form input[name=lname]').blur();
    }else if (!(/^[a-zA-Z0-9][\w]{5,19}/.test($('form input[name=lpassword]').val()))) {
        $('form input[name=lpassword]').blur();
    }else if(!($('#agree').attr('checked')=='checked')) {
            onoff = false;
            alert('请选择');
    }else{
       $.ajax({
                type:'post',
                url:'http://www.zhijunxing.com/yiju/landlordLogin.action',
                dataType:'jsonp',
                data:$('form').serialize(),
                success: function(data){
                    if(data.resultCode=='0000'){
                        location.href='http://192.168.0.190/index.html';
                    }
                }
            })
       }
});


$(function () {
    $('#link_reg').on('click', function () {
        $('.login-form').hide().siblings('.reg-form').show()
    })
    $('#link_login').on('click', function () {
        $('.reg-form').hide().siblings('.login-form').show()
    })
})

layui.form.verify({
    pass: [
        /^[\S]{6,12}$/
        , '密码必须6到12位，且不能出现空格'
    ],
    repass: function (value) {
        var repass = $('.reg-form [name=password]').val();
        if (repass != value) {
            return '两次密码不一致！'
        }
    }
})

// 注册
$('.reg-form').on('submit', function (e) {
    e.preventDefault();
    $.post('/api/reguser', $(this).serialize(), function (res) {
        if (res.status != 0) {
            return layer.msg(res.message);
        }
        layer.msg('注册成功');
        $('#link_login').click();

    })
})

// 登录
$('.login-form').on('submit', function (e) {
    e.preventDefault();
    var data = {
        username: $('.reg-form [name=username]').val(),
        password: $('.reg-form [name=password]').val()
    }
    $.post('/api/login', $(this).serialize(), function (res) {
        if (res.status != 0) {
            return layer.msg(res.message);
        }
        layer.msg('登录成功');
        localStorage.setItem('token', res.token)
        console.log();
        location.href = './index.html'
    })
})
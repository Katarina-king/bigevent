$(function () {
    getUserInfo()
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            renderAvatar(res.data);
        }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('.welcome').html('欢迎&nbsp&nbsp' + name).show();
    if (user.user_pic != null) {
        $('.layui-nav-img').attr('src', user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show
    }
}
$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    // 1. 初始化图片裁剪器
    var $image = $('#image');

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options);



    initCate();
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                var htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                layui.form.render();
            }
        })
    }

    initEditor();


    $('#btnChooseImage').on('click', function () {
        $('#coverFile1').click();
    })

    $('#coverFile1').on('change', function (e) {
        var files = e.target.files;
        var newImgURL = URL.createObjectURL(files[0]);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })



    var state = '已发布';
    $('#btnSave').on('click', function () {
        state = '草稿'
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();

        var fd = new FormData($(this)[0]);
        fd.append('state', state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                fd.append('cover_img', blob)
                publishArticle(fd)
            })

    })

    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                location.href = '/article/art_list.html'
            }
        })
    }
})


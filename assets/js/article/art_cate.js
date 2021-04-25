$(function () {
    // var form = layui.form;
    function initArticleCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr);
            }
        })
    }
    initArticleCateList()
    var indexAdd = null;
    $('#add').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: ['添加文章分类'],
            content: $('#dialog-add').html()
        });
    })

    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        console.log(1);
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArticleCateList()
                layer.msg(res.message)
                layer.close(indexAdd)
            }
        })
    })
    var indexEdit = null;
    $('tbody').on('click', '#edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: ['修改文章分类'],
            content: $('#dialog-edit').html()
        });
        var id = $(this).attr("data-id");
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layui.form.val('form-edit', res.data)
            }
        })
    })

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        // var data1 = layui.form.val("form-edit");
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                layer.close(indexEdit);
                initArticleCateList();
            }
        })
    })

    $('tbody').on('click', '#del', function () {
        var indexDel = null;
        var id = $(this).siblings().attr("data-id");

        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg(res.message);
                    initArticleCateList();
                }
            })
            layer.close(index);
        });

    })
})
$(function () {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    };
    initTable();

    template.defaults.imports.dateFormat = function (date) {
        const dt = new Date(date);
        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1);
        var d = padZero(dt.getDate());
        var hh = padZero(dt.getHours());
        var mm = padZero(dt.getMinutes());
        var ss = padZero(dt.getSeconds());
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    }

    function padZero(n) {
        return n < 10 ? '0' + n : n
    }

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr);
                renderPage(res.total)
            }
        })
    }
    initCate()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                var cateStr = template('tpl-cate', res);
                $('[name=cate_id]').html(cateStr);
                layui.form.render();
            }
        })
    }

    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        q.cate_id = $('[name=cate_id]').val();
        q.state = $('[name=state]').val();
        initTable();
    })



    function renderPage(total) {
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            laypage.render({
                elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
                count: total,
                limit: q.pagesize,
                limits: [2, 3, 5, 10],
                curr: q.pagenum,
                layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
                jump: function (obj, first) {
                    // 把最新的页码值，赋值到 q 这个查询参数对象中
                    q.pagenum = obj.curr
                    if (!first) {
                        initTable()
                    }
                }
            });
        });
    }
    $('tbody').on('click', '#del', function () {
        var id = $(this).attr('data-id');
        var len = $('#del').length();
        layer.confirm('确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status != 0) {
                        return layer.msg(res.message);
                    }
                    layer.msg(res.message);
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            });
            layer.close(index);
        })
    })
    $('body').on('click', '#edit', function () {
        console.log($(this).attr('data-id'));
        location.href = '/article/art_edit.html?id=' + $(this).attr('data-id')
    })
})
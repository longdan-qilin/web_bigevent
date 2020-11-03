$(function () {
    let layer = layui.layer;
    let form = layui.form
    let laypage = layui.laypage
    // 定义一个处理时间的过滤器
    template.defaults.imports.dateFormat = function (date) {
        const data = new Date(date)
        let y = data.getFullYear()
        let m = (data.getMonth() + 1).toString().padStart(2, 0)
        let d = data.getDate().toString().padStart(2, 0)
        let h = data.getHours().toString().padStart(2, 0)
        let f = data.getMinutes().toString().padStart(2, 0)
        let z = data.getSeconds().toString().padStart(2, 0)
        // console.log(`${y}-${m}-${d} ${h}:${f}:${z}`);
        return `${y}-${m}-${d} ${h}:${f}:${z}`
    }

    // 查询参数对象
    let q = {
        pagenum: 1, // 页码
        pagesize: 2, // 每页显示条数
        cate_id: '', // 文章分类 Id,
        state: '' // 文章的发布状态
    };

    initTable()
    initCate()

    // 通过ajax请求 渲染页面 获取文章列表数据的方法 
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                // 获取成功 模板引擎 渲染页面的数据
                let htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)

                // 表格数据渲染好后，再渲染分页
                pagerender(res.total)
            }
        })
    }

    // 获取分类列表的方法
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取列表失败！')
                }
                // 获取成功 模板引擎 渲染页面的数据
                let htmlStr = template('tpl-cate', res)
                // console.log(htmlStr);
                $('[name=cate_id]').html(htmlStr)
                // 通过laui的render的方法重新渲染表单的UI结构
                form.render()
            }
        })
    }

    // 筛选分类 通过  表单的提交监听事件
    $('#formSearch').on('submit', function (e) {
        // 阻止表单默认提交行为
        e.preventDefault()

        // 获取表单选择项的值
        let cate_id = $('[name=cate_id]').val()
        let status = $('[name=status]').val()

        // 为查询参数对象 q中对应的赋值
        q.cate_id = cate_id
        q.status = status

        // 根据最新的筛选的条件  重新渲染表格数据
        initTable()
    })

    // 渲染分页的方法
    function pagerender(total) {
        laypage.render({
            elem: 'pageBox', //  分页容器的id
            count: total,   // 总数据条数
            limit: q.pagenum,  // 每页显示几条数据
            curr: q.pagesize,//获取起始页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 5, 7, 10],
            // 分页发生切换的时候 发生jump回调
            // 触发jump回调的方式有2种
            //1.点击页码的时候 会触发jump回调
            //2.调用了 laypage.render() 会触发jump回调
            jump: function (obj, first) {
                // 可以通过first  来判断 jump回调是那种方法触发
                // 如果true 是第二种触发 false 第一种触发
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // 把最新的页码值 赋值到q这个查询参数对象中
                q.pagenum = obj.curr
                // 把最新的条目数 赋值到q这个查询参数对象的 pagesize 属性中
                q, pagesize = obj.limit
                // initTable()
                if (!first) {
                    // 根据最新的q获取对应的数据列表 并渲染表格
                    initTable()
                }
            }
        });
    }

    // 删除文章列表 通过事件代理的形式  为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {
        // 获得对应的id
        let id = $(this).attr('data-id')
        // 确定是否删除 删除的话 请求后台删除数据 且渲染页面
        layer.confirm('确认删除！', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: `/my/article/delete/${id}`,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    // 渲染页面
                    initTable()
                    layer.close(index);
                }
            })
        });
    })
})
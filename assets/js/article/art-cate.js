$(function () {
    // 获取文字分类的列表
    initArtCateList()

    // 添加类别弹框
    $('#btnAddCate').on('click', function () {
        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    })
})

// 添加类别弹框
var indexAdd = null;
function initArtCateList() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            let hmtlStr = template('tpl-table', res)
            $('tbody').html(hmtlStr)
        }
    })
}

// 添加文章分类，通过委托的形式为表单绑定提交事件
$('body').on('submit', '#form-add', function (e) {
    // 阻止表单默认提交
    e.preventDefault()
    // console.log(ok);
    $.ajax({
        method: 'POST',
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                layui.layer.msg('新增文章分类失败！')
            }
            // 重新获取分类数据
            initArtCateList();
            layui.layer.msg('新增文章分类成功！')
            // 关闭弹出层
            layui.layer.close(indexAdd)
        }
    })
})

// 通过代理的方式，为 btn-edit 按钮绑定点击事件
var indexEdit = null;
$('tbody').on('click', '.btn-edit', function (e) {
    // 编辑弹出层
     indexEdit = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: $('#dialog-edit').html()
    })
})




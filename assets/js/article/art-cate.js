$(function () {
    // 获取文字分类的列表
    initArtCateList()

    // 添加类别弹框
    $('#btnAddCate').on('click', function () {
        layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content:""
        })
    })
})

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


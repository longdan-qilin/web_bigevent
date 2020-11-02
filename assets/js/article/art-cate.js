$(function () {
    // 获取文字分类的列表
    initArtCateList()
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
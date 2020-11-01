$(function () {
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须在 1 ~ 6 个字符之间';
            }
        }
    });
    initUserInfo()
    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo/',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！');
                }
                console.log(res);
                // 调用form.val（） 快速为表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }

    //重置表单数据
    $('#btnReset').on('click', function () {
        // 阻止表单默认提交
        e.preventDefault()
        initUserInfo()
    })
});


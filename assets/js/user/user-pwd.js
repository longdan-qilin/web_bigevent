$(function () {
    // 获取layui的layer属性
    let layer = layui.layer
    // 获取表单元素
    let form = layui.form
    form.verify({
        // 验证 带有pwd的属性
        pwd: [/[\S^]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 验证 带有samepwd的属性 密码框
        samepwd: function (value) {
            if (value === $('[name=oldPwd]').val()) return ('两次密码输入不能相同！')
        },
        // 验证 带有repwd的属性的密码框
        repwd: function (value) {
            if (value !== $('[name=newPwd]').val()) return ('两次密码输入不一致！')
        }
    })

    // 监听表单 提交 通过ajax 发送修稿数据的给服务器
    $('.layui-form').on('submit', function (e) {
        console.log($(this).serialize());
        // 阻止表单提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改失败！')
                }
                layer.msg('修改成功！')
                // 提交成功 则重置页面
                $('.layui-form')[0].reset()
                // $('.layui-form').get(0).reset()
                // $('#btnReset').click()
            }
        })
    })
})
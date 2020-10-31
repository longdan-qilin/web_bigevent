$(function () {
    // 去注册
    $('#link_reg').on('click', function () {
        // 登录框隐藏
        $('.login-box').hide()
        // 注册框显示
        $('.reg-box').show()
    })
    // 去登录
    $('#link_login').on('click', function () {
        // 登录框显示
        $('.login-box').show()
        // 注册框隐藏
        $('.reg-box').hide()
    })

    // 自定义校验规则
    // 通过layui  获取form对象
    let form = layui.form
    // 通过form.vairfy()函数 自定义校验规则
    form.verify({
        pwd: [/[\s]{6,12}$/,'密码必须6到12位，且不能出现空格']
    })
}) 